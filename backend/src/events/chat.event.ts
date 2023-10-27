import {Socket} from "socket.io";
import {logger} from "@utils/logger";

interface IMessage {
  sender: string;
  message: string;
}

export class ChatEvent {
  constructor() {
  }

  public static onMessage = (socket: Socket, { sender, message }: IMessage) => {
      logger.info(`From ${sender}: ${message}` )
      socket.emit('chat-message', { sender: sender, message: message })
      socket.broadcast.emit('chat-message', { sender: sender, message: message })
  }
}
