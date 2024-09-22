import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { MessagingGateway } from './socket-gateway.service';
import { GatewayMap } from './session-gateway.service';

@Module({
  imports: [FirebaseModule],
  providers: [MessagingGateway, GatewayMap],
  exports: [],
  controllers: [],
})
export class GatewayModule {}
