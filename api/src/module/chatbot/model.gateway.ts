// src/events/events.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ModelWebSocketInputEvent,
  ModelWebSocketOutputEvent,
} from './model/model.model';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4005',
    methods: ['GET', 'POST'],
  },
})
export class ModelGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(ModelWebSocketInputEvent.SubscribeToModel)
  subscribeToModelChanges(
    @MessageBody() data: { modelPublicId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('subscribed to channel', data.modelPublicId);
    const { modelPublicId } = data;
    client.join(modelPublicId);
  }

  // Function to notify clients in a specific model room
  notifyModelTrained(modelPublicId: string, data: any): void {
    this.server
      .to(modelPublicId)
      .emit(ModelWebSocketOutputEvent.ModelTrained, data);
  }
}
