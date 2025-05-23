import { Module } from "@nestjs/common";
import { ChatGateway } from './chat/chat.gateway';

@Module({
    imports:[],
    controllers: [],
    providers: [ChatGateway]
})
export class ChatModule{}