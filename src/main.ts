import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true , // validate extra unwanted feild
    forbidNonWhitelisted:true
  }));
  const port = process.env.PORT
  await app.listen(port,()=>{ console.log(`projec is running on port ${port} `);
  });
}
bootstrap();
