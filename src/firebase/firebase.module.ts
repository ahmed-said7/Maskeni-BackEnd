import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from './config.json';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: function (config: ConfigService) {
        return admin.initializeApp({
          credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount,
          ),
          databaseURL: config.get('Firebase_Url'),
        });
      },
      inject: [ConfigService],
    },
    FirebaseService,
  ],
  imports: [],
  exports: [FirebaseService],
})
export class FirebaseModule {}
