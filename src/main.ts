import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as requestIp from 'request-ip';
import * as packageInfo from '../package.json';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';

let app: NestExpressApplication;
// for graceful shutdown;
// declare const module: any;
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

  // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, HaProxy, etc)
  // see https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', process.env.NODE_ENV !== 'development');

  // app.setGlobalPrefix(BASE_PREFIX_PATH);
  // console.log('process - env ', process.env);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      // skipMissingProperties: true,
      // skipNullProperties: true,
      skipUndefinedProperties: false,
      validationError: { target: false, value: false }, // object 와 value 역전송 막기
      transform: true,
      transformOptions: {
        excludeExtraneousValues: true,
      } as ClassTransformOptions, // version문제로 실제 있지만 여기 없음.. down casting
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // swagger options
  if (process.env.NODE_ENV === 'development') {
    const options = new DocumentBuilder()
      .setTitle(packageInfo.name.toUpperCase())
      .setDescription('NestJs Mongoose Version')
      .setVersion(packageInfo.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }
}
bootstrap();
