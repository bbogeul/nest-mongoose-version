import Debug from 'debug';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as requestIp from 'request-ip';

let app: NestExpressApplication;
declare const module: any;
async function bootstrap() {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Running NestJS-Mongoose in ${process.env.NODE_ENV} mode.`);
  }

  app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === 'development' ? false : true,
  });
  app.use(urlencoded({ extended: true }));
  app.use(json({ limit: '50mb' }));
  app.disable('x-powered-by');
  app.setViewEngine('hbs');
  app.use(compression());
  app.use(helmet()); // https://helmetjs.github.io/
  app.use(requestIp.mw());
}
bootstrap();
