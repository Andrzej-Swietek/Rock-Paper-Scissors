import {Socket} from "socket.io";

export interface GameRoom {
  id: string;
  players: Socket[];
  mode: "random" | "private";
  state: "waiting" | "playing" | "over";
}
