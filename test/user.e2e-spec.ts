// test/user.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('User E2E Test', () => {
  let app: INestApplication;
  let createdUserId: string = '';
  let authToken: string;
  const email = `test${Math.round(Math.random() * 1000000)}@abc.test.au`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Manually add the redirect for the root path.
    const server = app.getHttpAdapter().getInstance();
    server.get('/', (req, res) => {
      res.redirect('/api-doc');
    });

    await app.init();
  });

  afterAll(async () => {
    await request(app.getHttpServer()).delete(`/users/${createdUserId}`);
    await app.close();
  });

  it('should redirect root (/) to swagger', async () => {
    const response = await request(app.getHttpServer()).get('/').expect(302);

    expect(response.headers.location).toBe('/api-doc');
  });

  it('should create a new user via POST /users', async () => {
    const userData = {
      username: 'testuser',
      email,
      password: 'Test123!',
      gender: 'male',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userData)
      .expect(201);

    const user = response.body.user;
    authToken = response.body.token;
    expect(user.username).toBe('testuser');
    expect(user.email).toBe(email);
    createdUserId = user.id; // Save created user id for later tests
  });

  it('should login the user via POST /auth/login', async () => {
    const loginData = {
      email,
      password: 'Test123!',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(201);

    const user = response.body.user;
    authToken = response.body.token;
    expect(user.username).toBe('testuser');
    expect(user.email).toBe(email);

    authToken = response.body.token; // Save token for use in subsequent authenticated requests
  });

  it('should update user details via PATCH /users/update', async () => {
    const updateData = {
      username: 'updatedTestUser',
    };

    const response = await request(app.getHttpServer())
      .patch('/users/update')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData)
      .expect(200);

    expect(response.body).toHaveProperty('username', 'updatedTestUser');
  });
});
