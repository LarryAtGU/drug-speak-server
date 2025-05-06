import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { StudyRecordsModule } from './study-records/study-records.module';
import { StudyRecordModule } from './study-records/study-records.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      // optional tuning…
      statementCacheSize: 200,
      prepareDatabase: (db) => {
        db.pragma('foreign_keys = ON');
        return db;
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    StudyRecordModule,
  ],
})
export class AppModule {}
