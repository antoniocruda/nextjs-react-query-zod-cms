import axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpRequestException } from './HttpRequestException';
import useAuth from '@/components/auth/useAuth';
import { LoginResponseData } from '../AuthApiTypes';

function processPromise(promise: Promise<AxiosResponse<any>>): Promise<unknown> {
    return new Promise((resolve, reject) => {
        promise
            .then((response) => resolve(response.data))
            .catch((error: AxiosError<any>) => {
                if (error.response) {
                    const data = error.response.data;
                    if (
                        typeof data === 'object'
                        && Object.prototype.hasOwnProperty.call(data, 'code')
                        && Object.prototype.hasOwnProperty.call(data, 'data')
                    ) {
                        reject(new HttpRequestException(data.data, data.code, error.message));
                        return;
                    }
                }
                
                reject(error);
            });
    });
}

export default function useHttpApi(apiUrl: string) {
    const { userSession } = useAuth();

    function getUserToken(path: string) {
        if (!userSession) {
            // Should handle correctly?
            throw new Error(`The user should be logged in when calling [${path}]`);
        }
    
        return userSession.getJwtToken();
    }
    
    function processHeaders(
        path: string,
        headers: Record<string, string>,
        withUser: boolean
    ) {
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }
        
        if (withUser) {
            const token = getUserToken(path);
            headers['Authorization'] = `Bearer ${token}`;
        }
    
        return headers;
    }

    async function checkSessionExpiration(
        url: string,
        headers: Record<string, string> = {},
        withUser = false,
        buildAxios: (processedHeaders: Record<string, string>) => Promise<any>
    ) {
        if (!withUser) {
            return buildAxios(
                processHeaders(url, headers, withUser)
            );
        }

        if (userSession) {
            if (userSession.isJwtJsonTokenExpired()) {
                const processedHeaders = processHeaders(url, headers, false);

                try {
                    const resp = await processPromise(
                        axios.post(
                            `${apiUrl}/cms/auth/refresh-session`,
                            { refreshToken: userSession.getRefreshToken() },
                            { headers: processedHeaders }
                        )
                    ) as LoginResponseData;
        
                    userSession.updateSession(resp);
                    
                    return buildAxios(
                        processHeaders(url, headers, withUser)
                    );
                }
                catch (ex) {
                    console.log(ex);

                    throw ex;
                }
            }

            return buildAxios(
                processHeaders(url, headers, withUser)
            );
        }
    }
    
    async function httpDelete(
        path: string,
        params: Record<string, any> = {},
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return checkSessionExpiration(
            url,
            headers,
            withUser,
            (processedHeaders) => processPromise(
                axios.delete(url, { headers: processedHeaders, params })
            )
        );
    }
    
    async function get(
        path: string,
        params: Record<string, any> = {},
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return checkSessionExpiration(
            url,
            headers,
            withUser,
            (processedHeaders) => processPromise(
                axios.get(url, { headers: processedHeaders, params })
            )
        );
    }

    async function post(
        path: string,
        data: Record<string, any> = {},
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return checkSessionExpiration(
            url,
            headers,
            withUser,
            (processedHeaders) => processPromise(
                axios.post(url, data, { headers: processedHeaders })
            )
        );
    }

    async function postWithFile(
        path: string,
        data: FormData,
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return checkSessionExpiration(
            url,
            headers,
            withUser,
            (processedHeaders) => processPromise(
                axios.post(url, data, { headers: processedHeaders })
            )
        );
    }

    async function put(
        path: string,
        data: Record<string, any> = {},
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return checkSessionExpiration(
            url,
            headers,
            withUser,
            (processedHeaders) => processPromise(
                axios.put(url, data, { headers: processedHeaders })
            )
        );
    }

    async function putWithFile(
        path: string,
        data: FormData,
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return checkSessionExpiration(
            url,
            headers,
            withUser,
            (processedHeaders) => processPromise(
                axios.put(url, data, { headers: processedHeaders })
            )
        );
    }

    return {
        httpDelete,
        get,
        post,
        postWithFile,
        put,
        putWithFile
    };
}
