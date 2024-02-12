import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL
const instance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const onRequest = async (config: InternalAxiosRequestConfig<any>): Promise<InternalAxiosRequestConfig<any>> => {
    try {
        const access_token = await AsyncStorage.getItem('access_token');

        console.info(`[request] [${JSON.stringify(config)}]`);

        if (access_token && config.headers) config.headers.Authorization = `Bearer ${access_token.replaceAll("\"",'')}`;
        return config;
    } catch (e) {
        console.log(e);
        return config;
    }
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.log(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    // console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    console.log(`[response error] [${JSON.stringify(error, null, 4)}]`);
    console.log(baseURL)
    return Promise.reject(error);
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;