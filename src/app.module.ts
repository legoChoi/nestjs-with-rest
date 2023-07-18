import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { UserModule } from './apis/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from './apis/store/store.module';

@Module({
  imports: [
    MoviesModule, //
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '0100',
      database: 'db_test',
      entities: [__dirname + '/apis/**/*.entity.*'], // entity.ts로 끝나는 모든 파일
      synchronize: true, // entity와 테이블 동기화
      logging: true, // 쿼리문 로그 띄워 줌
    }),
    StoreModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
