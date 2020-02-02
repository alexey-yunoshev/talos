export interface Error<Code extends string = string> {
    code: Code,
    message: string,
}

export class Ok<T> {

    constructor(public value: T) {
    }

    map(): T {
        return this.value;
    }

    isOk(): this is Ok<T> {
        return true;
    }

    isErr() {
        return false;
    }
}

export class Err<Code extends string = string> {

    constructor(public error: Error<Code>) {
    }

    mapErr(): Error {
        return this.error;
    }

    isOk() {
        return false;
    }

    isErr(): this is Err {
        return true;
    }
}

export type Result<T, Code extends string = string> = Ok<T> | Err<Code>;

export function match<callbackReturnValueType, OkValueType, ErrorCode extends string = string>(
    result: Result<OkValueType, ErrorCode>,
    handleOk: (ok: OkValueType) => callbackReturnValueType,
    handleErr: (error: Error<ErrorCode>) => callbackReturnValueType,
) {
    if (result.isOk()) {
        return handleOk(result.value)
    } else {
        return handleErr(result.error)
    }
}
