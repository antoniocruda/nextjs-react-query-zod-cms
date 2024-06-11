import httpApi from './useHttpApi';

export default function useBaseHttpApi() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    return httpApi(apiUrl);
}