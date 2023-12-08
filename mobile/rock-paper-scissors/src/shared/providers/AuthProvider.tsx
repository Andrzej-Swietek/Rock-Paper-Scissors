import React, {useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAsyncStorage} from "shared/hooks";

interface AuthProviderProps {
    children
}

export type User = { username: string, points: number,  gamesPlayed: number, level: number, exp: number }

export const AuthContext = React.createContext<{
  user: User,
  login: (username: string)=> void,
  logout: ()=> void,
  updateScore: Function
}>({ user: null, login: ()=> {}, logout: ()=> {}, updateScore: ()=>{} })

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useAsyncStorage<null | User>('user', null);

  const updateScore = ( score: number ) => {
      setUser( {...user, gamesPlayed: user.gamesPlayed+1, points: user.points + score })
  }

  return (
      <AuthContext.Provider value={{
        user,
        login: async(username: string): Promise<void> => {
         const u = JSON.parse( await AsyncStorage.getItem('user') )
          const userFromAPI: User = {
              username: username,
              points: 0,
              gamesPlayed: 0,
              level: 1,
              exp: 0
          };
          setUser(u? u : userFromAPI)
          await AsyncStorage.setItem('user', JSON.stringify(userFromAPI))
        },
        logout: async (): Promise<void> => {
          setUser(null)
          await AsyncStorage.removeItem('user')
        },
        updateScore: (score: number) => {
            updateScore(score);
        }
      }}>
        { children }
      </AuthContext.Provider>
  );
}
