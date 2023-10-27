import {Socket} from "socket.io";

export class ConnectionEvent {
  constructor() {
  }

  public static connect = (socket: Socket) => {
    console.log("Connected a new user")
    socket.join("lobby")
    socket
      .to('lobby')
      .emit("connected", "user");
  }

  public static disconnect = (socket: Socket) => {

  }
}

