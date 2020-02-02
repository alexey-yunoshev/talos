export interface Error {
    code: string,
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

export class Err {

    constructor(public error: Error) {
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

export type Result<T> = Ok<T> | Err;

export function match<A, T>(
    result: Result<T>,
    handleOk: (ok: T) => A,
    handleErr: (error: Error) => A,
) {
    if (result.isOk()) {
        return handleOk(result.value)
    } else {
        return handleErr(result.error)
    }
}
