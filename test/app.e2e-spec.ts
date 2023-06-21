import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 데코레이터 붙지 않은 속성은 거름(에러x: 데코레이터 없는거 뺴고 전달)
        forbidNonWhitelisted: true, // request 자체에 도달 못하게
        transform: true, // 타입 변환 기능
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()) //
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer()) //
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['test'] })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer()) //
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['test'], other: 'thing' })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()) //
        .delete('/movies')
        .expect(404); // Not Found error
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()) //
        .get('/movies/1')
        .expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()) //
        .get('/movies/999')
        .expect(404);
    });

    it.todo('PATCH');
    // it('PATCH 200', () => {
    //   return request(app.getHttpServer) //
    //     .patch('/movies/1')
    //     .send({ title: 'Update TEST' })
    //     .expect(200);
    // });

    it.todo('DELETE');
    // it('DELETE 200', () => {
    //   return request(app.getHttpServer()) //
    //     .delete('/movies')
    //     .expect(200);
    // });
  });
});
