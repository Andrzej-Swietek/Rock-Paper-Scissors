import {UserStats} from "shared/types/UserStats";
import axios from "shared/libs/axios";

export class StatsService {

    public static async getUserStats(username: string): Promise<UserStats> {
        try {
            const response = await axios.get<{
                data: { profile: UserStats }
            }>(`/user/stats/${username}`)
            const data = response.data;

            return data.data.profile;
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