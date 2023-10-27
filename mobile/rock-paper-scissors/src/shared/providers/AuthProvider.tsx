import React, {useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAsyncStorage} from "shared/hooks";

interface AuthProviderProps {
    children
}
type PointsPVP = {
    gamesPlayed: number
}
type PointsOnline = {
    wins: number,
    loses: number
}

type PointsPVA = {
    gamesPlayed: number,
    wins: number
}

export type User = { username: string, pointsPvP: PointsPVP, pointsOnline: PointsOnline, pointsPvA: PointsPVA }

export const AuthContext = React.createContext<{
  user: User,
  login: (username: string)=> void,
  logout: ()=> void,
  updateScore: Function
}>({ user: null, login: ()=> {}, logout: ()=> {}, updateScore: ()=>{} })

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useAsyncStorage<null | User>('user', null);

  const updateScore = (gameType: 'pvp'|'pva'|'online', score: { gamesPlayed?: number, wins?: number, loses?: number  }) => {
        switch ( gameType ){
            case "online": {
                setUser({...user, pointsOnline: { wins: score.wins, loses: score.loses } })
                break;
            }
            case "pvp": {
                setUser({...user, pointsPvP: { gamesPlayed: score.gamesPlayed || 0 } })
                break;
            }
            case "pva": {
                setUser({...user, pointsPvA: { gamesPlayed: score.gamesPlayed, wins: score.wins }})
                break;
            }
        }
  }

  return (
      <AuthContext.Provider value={{
        user,
        login: async(username: string) => {
         const u = JSON.parse( await AsyncStorage.getItem('user') )
          const userFromAPI: User = {
              username: username,
              pointsPvP: {
                  gamesPlayed: 0,
              },
              pointsOnline: {
                  wins: 0,
                  loses: 0
              },
              pointsPvA: {
                  gamesPlayed: 0,
                  wins: 0
              },
          };
          setUser(u? u : userFromAPI)
          await AsyncStorage.setItem('user', JSON.stringify(userFromAPI))
        },
        logout: async ()=> {
          setUser(null)
          await AsyncStorage.removeItem('user')
        },
        updateScore: (gameType: 'pvp'|'pva'|'online', score: { gamePlayed?: number, wins?: number, loses?: number  }) => {
            updateScore(gameType, score);
        }
      }}>
        { children }
      </AuthContext.Provider>
  );
}
