import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';
import { ChatService } from '../chat.service';
import { createMessageDto } from '../dtos/createMessageDto.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect{

  @WebSocketServer() server: Server;

  constructor(private readonly chatService:ChatService){}

  afterInit(server: Server) {
      console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket){
    console.log(`Cliente conecado`);
  }

  handleDisconnect(client:Socket){
    console.log(`Cliente disconectado!`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: createMessageDto): void {
    this.chatService.createMessage(payload);
    this.server.emit('message',payload);
  }

}
