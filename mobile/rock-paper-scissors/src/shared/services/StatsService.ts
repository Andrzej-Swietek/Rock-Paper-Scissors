import {UserStats} from "shared/types/UserStats";
import axios from "shared/libs/axios";

export class StatsService {

    public static async getUserStats(user_uuid: string): Promise<UserStats> {
        try {
            const response = await axios.get<UserStats>(`/user-stats${user_uuid}`)
            const data = response.data;

            return data;
        } catch (e: any) {
            // TODO: REMOVE MOCK
            return {
                rocks: 0,
                papers: 0,
                scissors: 0,
                wins: 0,
                games: 0,
            }
        }
    }


}