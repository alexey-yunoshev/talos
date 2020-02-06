import {err, match, ok, Result} from '../src';

enum ErrorCode {
    NotFound = 'not_found',
    SomeOther = 'some_other',
    Another = 'another',
}

type TestErrorCode = ErrorCode.NotFound | ErrorCode.SomeOther;

function test(): Result<number, TestErrorCode> {
    try {
        const result = 1 + 1;
        return ok(result);
    } catch (e) {

        if (2 !==2) {
            return err(ErrorCode.SomeOther, 'hello');
        }
        return err(ErrorCode.NotFound, 'hello');
    }
}


function main() {
    const result = test();

    if (result.isOk()) {
        result.value
    } else {
        switch (result.error.code) {
            case ErrorCode.SomeOther:
                break;
            case ErrorCode.NotFound:
                break;

        }

        if (result.error.code === ErrorCode.NotFound) {}
        else if (result.error.code === ErrorCode.SomeOther) {}
        console.log(result.error.message);
    }

    const answer = match(
        result,
        (value) => {
            return value + 4;
        },
        (error) => {
            switch (error.code) {
                case ErrorCode.NotFound:
                    break;
                case ErrorCode.SomeOther:
                    break;
            }
            return 5
        }
    );
}
