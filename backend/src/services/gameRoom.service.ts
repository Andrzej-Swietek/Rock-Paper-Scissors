import GameRoomRepository from "@/repositories/gameRoom.repository";

class GameRoomService {
  private readonly gameRoomRepository: GameRoomRepository = new GameRoomRepository();

  public async getAllRooms() {
    return this.gameRoomRepository.getAllRooms();
  }

  public async getRoomByID(roomID: string){
    return this.gameRoomRepository.getRoomByID(roomID);
  }


  public async joinPrivateRoom(roomID: string, userID: string) {
  }

  public async joinPublicRoom(userID: string) {
  }

  public async editRoom(roomID: string, mode: string, state: string) {
  }

  public async removeRoom(roomID: string) {
    return this.gameRoomRepository.removeRoom(roomID);
  }
}
