import {Socket} from "socket.io";
import {logger} from "@utils/logger";

interface IMove {
  id: number;
  from: string;
  to: string;
  stage: string;
  room: string;
}

interface IGameOver extends IMove{
  winner: string;
}

export class GameEvent {
  constructor() {
  }

  /**
   * Server event that is called on sever when there are 2 players in lobby
   * @param socket
   * @param data
   */
  public static startGame = (socket: Socket, data: any) => {

  }

  public static joinPrivateRoom(socket: Socket, data: { roomCode: string }) {
    // TODO: Check if exists
    // TODO: JOIN + db update
    // TODO: broadcast to room that joined
  }

  public static createPrivateRoom(socket: Socket) {
    // TODO: Check if exists
    // TODO: CREATE + JOIN + db update
    // TODO: broadcast to room that joined
  }

  public static joinRandomRoom(socket: Socket) {
    // TODO: check if there is any pending that has mode non private
    // IF SO:  JOIN And broadcast joining and game start
    // ELSE:  CREATE + JOIN + db update + wait
  }

  public static handleMove = (socket: Socket, data: IMove) => {
      // const room = data.room;
    const rooms = Array.from(socket.rooms);
    const gameRooms = rooms.filter((room) => room !== socket.id && room !== "");
    const room = gameRooms[0];

    // socket.to(room).emit("player-move", data );
      socket.nsp.to(room).emit("player-move", data );
  }


  public static gameOver = (socket: Socket, data: IGameOver) => {
    const winner = data.winner;
    logger.info("================ [ 💣 GAVE OVER 💣 ] ================");
    logger.info(`================ [ winner: ${winner} ] ================`);
    logger.info("======================================================");
    const room = Array.from(socket.rooms).find((room) => room !== socket.id && room !== "");

    if (room) {
      // Emit a custom event to the other player to leave the room
      socket.broadcast.to(room).emit("leave-room");

      socket.leave(room);
    }
  }

  public static leaveRoom = (socket: Socket , data:any) => {
    const room = Array.from(socket.rooms).find((room) => room !== socket.id && room !== "");
    socket.leave(room);
    // TODO DB UPDATE + BROADCAST "buddy's left" / "forfeit"
  }

}
