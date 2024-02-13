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

  public async createRoom() { }

  public async addUserToRoom() { }

  public async editRoom() { }

  public async removeRoom(roomID: string) {
      return this.prisma.gameRoom.delete({
        where: {
          roomId: roomID
        }
      });
  }
}
