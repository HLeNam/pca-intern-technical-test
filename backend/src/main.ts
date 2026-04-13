import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { apiReference } from '@scalar/nestjs-api-reference';
import { CustomValidationPipe } from './common/pipes/validation.pipe';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger();
  app.useLogger(logger);

  const config = app.get(ConfigService);

  // Enable CORS for frontend integration
  const frontendUrl = config.get<string>('app.frontendUrl');
  app.enableCors({
    origin: frontendUrl || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Global pipes
  app.useGlobalPipes(new CustomValidationPipe());

  // Global interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Global filters (order matters!)
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  // Setup Swagger API docs
  await processSwagger(app);

  // // Global prefix (optional)
  // app.setGlobalPrefix('api');

  const port = config.get<number>('app.port') || 3000;
  const env = config.get<string>('app.env');

  await app.listen(port);
  logger.log(`🚀 App running on http://localhost:${port} [${env}]`);
  logger.log(`📚 API docs available at http://localhost:${port}/api/docs`);
}

bootstrap();

async function processSwagger(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('NestJS API Reference')
    .setDescription('API documentation for the NestJS application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV !== 'production') {
    const { apiReference } = await import('@scalar/nestjs-api-reference');

    app.use(
      '/api/docs',
      apiReference({
        content: document,
      }),
    );
  } else {
    SwaggerModule.setup('/api/docs', app, document, {
      customCssUrl: 'https://unpkg.com/swagger-ui-dist/swagger-ui.css',
      customJs: [
        'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js',
        'https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js',
      ],
    });
  }
}
