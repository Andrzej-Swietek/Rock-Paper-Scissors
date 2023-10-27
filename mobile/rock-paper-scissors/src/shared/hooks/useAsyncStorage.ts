import React, {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = <T>( key: string, defaultValue: T ): [T, (data: T)=> void ] => {
  const [state, setState] = useState<T>( defaultValue );

  useEffect( ()=> {
      ;( async()=> {
          try {
              const value = await AsyncStorage.getItem(key);
              await setData( JSON.parse(value) ?? defaultValue )
          } catch (error) {
              console.error('useAsyncStorage getItem error:', error)
          }
      } )()
  },[])

    const setData = async (value: T) => {
        console.log(value)
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value))
            setState(value)
        } catch (error) {
            console.error('useAsyncStorage setItem error:', error)
        }
    }

  return [ state, setData ]
}
