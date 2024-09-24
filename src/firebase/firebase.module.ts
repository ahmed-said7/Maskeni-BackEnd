import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
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
            JSON.parse(config.get('FIREBASE_CONFIG_JSON')),
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
