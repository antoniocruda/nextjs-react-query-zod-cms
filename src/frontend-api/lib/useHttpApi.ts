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

    async function retryOnceIfForbidden(
        url: string,
        params: Record<string, any> = {},
        headers: Record<string, string> = {},
        withUser = false,
        buildAxios: (processedHeaders: Record<string, string>) => Promise<any>
    ) {
        const processedHeaders = processHeaders(url, headers, withUser);

        try {
            return await buildAxios(processedHeaders);
        }
        catch (ex) {
            if (!(ex instanceof HttpRequestException)) {
                const error = ex as AxiosError<any>;
                if (error.response && error.response.status === 403) {
                    if (userSession) {
                        // We assume that the 403 is caused by an expired session
                        // Do a refresh session
                        const processedHeaders = processHeaders(url, headers, false);
                        const resp: LoginResponseData = await processPromise(
                            axios.post(
                                `${apiUrl}/cms/auth/refresh-session`,
                                params,
                                { headers: processedHeaders }
                            )
                        ) as LoginResponseData;
            
                        userSession.updateSession(resp);
                        
                        // Do the retry
                        const processedHeaders2 = processHeaders(url, headers, withUser);
                        return buildAxios(processedHeaders2);
                    }
                }
            }

            throw ex;
        }
    }
    
    async function httpDelete(
        path: string,
        params: Record<string, any> = {},
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return retryOnceIfForbidden(
            url,
            params,
            headers,
            withUser,
            (processedHeaders) => {
                return processPromise(
                    axios.delete(url, { headers: processedHeaders, params })
                )
            }
        );
    }
    
    async function get(
        path: string,
        params: Record<string, any> = {},
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return retryOnceIfForbidden(
            url,
            params,
            headers,
            withUser,
            (processedHeaders) => {
                return processPromise(
                    axios.get(url, { headers: processedHeaders, params })
                )
            }
        );
    }

    async function post(
        path: string,
        data: Record<string, any> = {},
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return retryOnceIfForbidden(
            url,
            data,
            headers,
            withUser,
            (processedHeaders) => {
                return processPromise(
                    axios.post(url, data, { headers: processedHeaders })
                )
            }
        );
    }

    async function postWithFile(
        path: string,
        data: FormData,
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return retryOnceIfForbidden(
            url,
            data,
            headers,
            withUser,
            (processedHeaders) => {
                return processPromise(
                    axios.post(url, data, { headers: processedHeaders })
                )
            }
        );
    }

    async function put(
        path: string,
        data: Record<string, any> = {},
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return retryOnceIfForbidden(
            url,
            data,
            headers,
            withUser,
            (processedHeaders) => {
                return processPromise(
                    axios.put(url, data, { headers: processedHeaders })
                )
            }
        );
    }

    async function putWithFile(
        path: string,
        data: FormData,
        headers: Record<string, string> = {},
        withUser = false
    ): Promise<any> {
        const url = `${apiUrl}${path}`;

        return retryOnceIfForbidden(
            url,
            data,
            headers,
            withUser,
            (processedHeaders) => {
                return processPromise(
                    axios.put(url, data, { headers: processedHeaders })
                )
            }
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
