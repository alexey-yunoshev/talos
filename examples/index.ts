import {Err, match, Ok, Result} from '../src';

enum ErrorCode {
    NotFound = 'not_found',
}

function test(): Result<number> {
    try {
        const result = 1 + 1;
        return new Ok(result);
    } catch (e) {
        return new Err({
            code: ErrorCode.NotFound,
            message: 'hello',
        });
    }
}


function main() {
    const result = test();

    if (result.isOk()) {
        result.value
    } else {
        console.log(result.error.message);
    }

    const answer = match(
        result,
        (value) => {
            return value + 4;
        },
        (error) => {
            return 5
        }
    );
}
