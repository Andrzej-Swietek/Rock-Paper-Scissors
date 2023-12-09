import React from 'react';
import {LogBox} from "react-native";

// Routes
import {Routes} from "../../navigation";

// Providers
import {FontsLoader} from "./FontsLoader";
import {AuthProvider} from "./AuthProvider";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

interface ProvidersProps {
}

export const Providers: React.FC<ProvidersProps> = ({}) => {
    LogBox.ignoreLogs(['Require cycle:'])
    const queryClient: QueryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <FontsLoader>
                    <Routes />
                </FontsLoader>
            </AuthProvider>
        </QueryClientProvider>
    )
}
