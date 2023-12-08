import AsyncStorage from "@react-native-async-storage/async-storage";

type GameMode = 'pvp';

export class ArchiveMove {
    public readonly time: number;
    public readonly player: string;
    public readonly move: string;


    constructor(time: number, player: string, move: string) {
        this.time = time;
        this.player = player;
        this.move = move;
    }
}

/**
 * Class meant to save both to DB and async storage the given moves in the game for given mode
 * Only one instance per game required
 *
 */
export class GameArchiver {
    private readonly mode : GameMode;
    private date: number;
    private gameHistory : ArchiveMove[] = [];

    /**
     * Constructor - Gets both the game mode and game start timestamp
     * @constructor
     * @param mode : 'pvp'|'pva'|'online' - Game Mode
     * @param date : Date -  Time when game started
     */
    constructor(mode: GameMode, date: number) {
        this.mode = mode;
        this.date = date;
    }

    /**
     * Method that save each and every move in game in order and stores it in the list
     * @param move : ArchiveMove
     * @example
     * ```ts
     *      archiver.saveNextMove( new ArchiveMove( Date.now(), 'light', [-1, 2] ))
     *  ```
     */
    public saveNextMove(move: ArchiveMove) {
        this.gameHistory.push(move);
    }

    public async saveGame(): Promise<{message: string}> {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(this.gameHistory);

                const alreadyStoredHistory = await AsyncStorage.getItem(`@game_${this.mode}`);
                const existingGameHistory: ArchiveMove[][] = alreadyStoredHistory
                    ? JSON.parse(alreadyStoredHistory)
                    : [];
                existingGameHistory.push(this.gameHistory);

                const gameSaveString = JSON.stringify(existingGameHistory);
                const asyncStoragePromise =  await AsyncStorage.setItem(`@game_${this.mode}`, gameSaveString);

                // TODO: const dbPushPromise = axios.post('/...', { game: updatedGameHistory })

                Promise.all([asyncStoragePromise])
                    .then(() => {
                        resolve({ message: 'saved' });
                    })
                    .catch(() => {
                        reject({ message: 'Could not save the game' });
                    });
            } catch (e) {
                console.log(e);
                reject({ message: e });
            }
        });
    }

    /**
     * Static Method that enables to retrieve game history for given game mode from AsyncStorage
     * @param mode - 'pvp'|'pva'|'online'
     */
    public static async getGameHistoryForMode(mode: GameMode): Promise<ArchiveMove[][]> {
        const alreadyStoredHistory = await AsyncStorage.getItem(`@game_${mode}`);

        const history: ArchiveMove[][] = alreadyStoredHistory ? JSON.parse(alreadyStoredHistory) : [];

        return history;
    }

    /**
     * Static method that clears game history for give mode in AsyncStorage
     * @param mode - 'pvp'|'pva'|'online'
     */
    public static async clearGameHistoryForMode(mode: GameMode) {
        const hist = await AsyncStorage.getItem(`@game_${mode}`);
        if( hist ) await AsyncStorage.removeItem(`@game_${mode}`);
    }

}