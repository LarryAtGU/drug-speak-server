// test/study-record.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Study Record E2E Test', () => {
  let app: INestApplication;
  let createdUserId: string = '';
  let authToken: string;
  const email = `test${Math.round(Math.random() * 1000000)}@abc.test.au`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const userData = {
      username: 'testuser',
      email,
      password: 'Test123!',
      gender: 'male',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userData);

    const user = response.body.user;
    authToken = response.body.token;
    createdUserId = user.id; // Save created user id for later tests
  });

  afterAll(async () => {
    await request(app.getHttpServer()).delete(`/users/${createdUserId}`);
    await app.close();
  });

  it("should update user's study record via POST /study-record with correct token", async () => {
    const studyRecord = {
      currentLearning: 3,
      finishedLearning: 2,
      totalScore: 278,
    };

    const response = await request(app.getHttpServer())
      .post('/study-record')
      .set('Authorization', `Bearer ${authToken}`)
      .send(studyRecord)
      .expect(201);

    expect(response.body).toHaveProperty('totalScore', 278);
    expect(response.body).toHaveProperty('currentLearning', 3);
    expect(response.body).toHaveProperty('finishedLearning', 2);
  });
  it("should not update user's study record via POST /study-record without correct token", async () => {
    const studyRecord = {
      currentLearning: 3,
      finishedLearning: 2,
      totalScore: 278,
    };

    const response = await request(app.getHttpServer())
      .post('/study-record')
      .send(studyRecord)
      .expect(401);
    console.log(8888, response.body);
    expect(response.body).toHaveProperty('message', 'Unauthorized');
  });
  it("should be able to get a particular user's study record via GET /study-record/userId", async () => {
    const response = await request(app.getHttpServer())
      .get(`/study-record/${createdUserId}`)
      .expect(200);

    expect(response.body).toHaveProperty('totalScore', 278);
    expect(response.body).toHaveProperty('currentLearning', 3);
    expect(response.body).toHaveProperty('finishedLearning', 2);
    expect(response.body).toHaveProperty('userId', createdUserId);
  });
  it('should get 404 through GET /study-record/userId if wrong userId provided', async () => {
    await request(app.getHttpServer())
      .get(`/study-record/wronguserid`)
      .expect(404);
  });
  it('should get all user study record through GET /study-record/', async () => {
    const response = await request(app.getHttpServer())
      .get(`/study-record`)
      .expect(200);
    const result = response.body;
    expect(Array.isArray(result)).toBe(true);
    const user = result.find((rec) => rec.userId === createdUserId);
    expect(user).toHaveProperty('totalScore', 278);
    expect(user).toHaveProperty('currentLearning', 3);
    expect(user).toHaveProperty('finishedLearning', 2);
    expect(user).toHaveProperty('userId', createdUserId);
  });
});
