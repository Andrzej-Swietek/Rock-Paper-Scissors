import React from 'react';
import {LogBox} from "react-native";

// Routes
import {Routes} from "../../navigation";

// Providers
import {FontsLoader} from "./FontsLoader";
import {AuthProvider} from "./AuthProvider";

interface ProvidersProps {
}

export const Providers: React.FC<ProvidersProps> = ({}) => {
    LogBox.ignoreLogs(['Require cycle:'])
    return (
        <AuthProvider>
            <FontsLoader>
                <Routes />
            </FontsLoader>
        </AuthProvider>
    )
}
