export interface Error<Code extends string = string> {
    code: Code,
    message: string,
}

export class Ok<T> {

    constructor(public value: T) {
    }

    isOk(): this is Ok<T> {
        return true;
    }

    isErr(): boolean {
        return false;
    }
}

export class Err<Code extends string = string> {

    error: Error<Code>;

    constructor(code: Code, message: string) {
        this.error = {code, message};
    }

    isOk(): boolean {
        return false;
    }

    isErr(): this is Err {
        return true;
    }
}

export type Result<T, Code extends string = string> = Ok<T> | Err<Code>;

export function match<callbackReturnType, OkType, ErrorCode extends string = string>(
    result: Result<OkType, ErrorCode>,
    handleOk: (ok: OkType) => callbackReturnType,
    handleErr: (error: Error<ErrorCode>) => callbackReturnType,
) {
    if (result.isOk()) {
        return handleOk(result.value);
    } else {
        return handleErr(result.error);
    }
}

export function ok<T>(value: T): Ok<T> {
    return new Ok(value);
}

export function err<Code extends string = string>(code: Code, message: string): Err<Code> {
    return new Err(code, message);
}
