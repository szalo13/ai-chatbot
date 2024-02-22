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
import { Logger } from '@nestjs/common';
import { IDataSource } from './model/dataSource/dataSource.model';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4005',
    methods: ['GET', 'POST'],
  },
})
export class ModelGateway {
  logger = new Logger();

  @WebSocketServer()
  server: Server;

  private logNotification(
    modelPublicId: string,
    eventName: string,
    payload: any,
  ) {
    this.logger.log(
      `Notifying clients in room ${modelPublicId} about ${eventName}, ${JSON.stringify(
        payload,
      )}`,
    );
  }

  @SubscribeMessage(ModelWebSocketInputEvent.SubscribeToModel)
  subscribeToModelChanges(
    @MessageBody() data: { modelPublicId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const { modelPublicId } = data;
    client.join(modelPublicId);
  }

  // Function to notify clients in a specific model room
  notifyModelTrained(modelPublicId: string, data: any): void {
    this.logNotification(
      modelPublicId,
      ModelWebSocketOutputEvent.ModelTrained,
      data,
    );
    this.server
      .to(modelPublicId)
      .emit(ModelWebSocketOutputEvent.ModelTrained, data);
  }

  notifyDataSourceUpdated(
    modelPublicId: string,
    dataSource: IDataSource,
  ): void {
    const data = { dataSource };
    this.logNotification(
      modelPublicId,
      ModelWebSocketOutputEvent.ModelTrained,
      data,
    );
    this.server
      .to(modelPublicId)
      .emit(ModelWebSocketOutputEvent.ModelDataSourceUpdated, data);
  }
}
