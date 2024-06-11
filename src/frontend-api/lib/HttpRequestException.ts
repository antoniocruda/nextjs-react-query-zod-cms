import { ErrorCode } from '../types';

export class HttpRequestException extends Error {
    private readonly code: ErrorCode;
    private readonly data: unknown;

    public constructor(
        data: unknown,
        code: ErrorCode,
        msg = ''
    ) {
        super(msg);

        this.data = data;
        this.code = code;
    }

    public getCode() {
        return this.code;
    }

    public getData() {
        return this.data;
    }
}