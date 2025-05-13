import { Injectable } from "@nestjs/common";
import { createMessageDto } from "./dtos/createMessageDto.dto";

@Injectable()
export class ChatService{
    private messages :createMessageDto[] = [];

    createMessage(message:createMessageDto){
        this.messages.push(message);
    }

    getAllMessages():createMessageDto[]{
        return this.messages;
    }
}