import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ServiceAccount } from 'firebase-admin';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_project_id'),
    privateKey: configService
      .get<string>('FIREBASE_private_key')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_client_email'),
  };

  admin.initializeApp({ credential: admin.credential.cert(adminConfig) });
  await app.listen(process.env.PORT);
}
bootstrap();
