import {Socket} from "socket.io";

export interface WebsocketEvent {
  name: string;
  handler: (socket: Socket, ...args: any[]) => void;
}
