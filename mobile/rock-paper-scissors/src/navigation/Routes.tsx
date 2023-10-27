import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppTabs } from "./AppTabs";
import { AuthStack } from "./stacks/AuthStack/AuthStack";

import {AuthContext} from "shared/providers/AuthProvider";

interface RoutesProps { }

export const Routes: React.FC<RoutesProps> = ({}) => {
    const [loading, setLoading] = useState(true);
    const { user, login } = useContext(AuthContext)
    useEffect(()=>{
        // Check if user is login
        AsyncStorage.getItem("user")
            .then( (userString)=> {
               if ( userString ){
                   // decode it
                   const user = JSON.parse( userString )
                   login(user.username)
                   // console.log('userstring: ' + userString)
               }
               setLoading(false)
            })
            .catch( err => console.log(err))
    },[])

   // if ( loading ) return (
    //     <Center>
    //         <ActivityIndicator size={"large"} />
    //     </Center>
    // )

  return(
       <NavigationContainer>
           { user ? <AppTabs /> : <AuthStack /> }
       </NavigationContainer>
  );
}
