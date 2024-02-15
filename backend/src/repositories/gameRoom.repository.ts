import Prisma from "@/databases/prisma";

class GameRoomRepository {
  private readonly prisma = Prisma.getInstance();

  public async getAllRooms() {
    return this.prisma.gameRoom.findMany();
  }

  public async getRoomByID(roomID: string){
      return this.prisma.gameRoom.findFirst({
          where: {
              roomId: roomID
          }
      })
  }

  public async createRoom(roomId: string, mode: string, state: string) {
    return this.prisma.gameRoom.create({
      data: {
        roomId: roomId,
        mode,
        state
      }
    });
  }

  public async addUserToRoom(roomID: string, userID: string) {
    return this.prisma.gameRoom.update({
      where: { roomId: roomID },
      data: {
        players: {
          connect: { uuid: userID }
        }
      }
    });
  }

  public async editRoom(roomID: string, mode: string, state: string) {
    return this.prisma.gameRoom.update({
      where: { roomId: roomID },
      data: {
        mode,
        state
      }
    });
  }

  public async removeRoom(roomID: string) {
      return this.prisma.gameRoom.delete({
        where: {
          roomId: roomID
        }
      });
  }
}

export default GameRoomRepository;
