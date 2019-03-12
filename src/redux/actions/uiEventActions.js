/*
 * action types
 */

export const START_API_CALL = 'START_API_CALL';
export const FINISH_API_CALL = 'FINISH_API_CALL';
export const FINISH_API_ERR = 'FINISH_API_ERR';

/*
 * action creators
 */

export function startAPICall()
{
    return {
        type: START_API_CALL
    }
}

export function finishAPICall()
{
    return {
        type: FINISH_API_CALL
    }
}

export function finishAPIError(errMsg)
{
    return {
        type: FINISH_API_ERR,
        message: errMsg
    }
}