import { START_API_CALL, FINISH_API_CALL, FINISH_API_ERR } from '../actions/uiEventActions'

const uiEventReducer = (state = {}, action) => {
    switch (action.type)
    {
        case START_API_CALL:
            return {...state, apiCallStatus: "started"};
        case FINISH_API_CALL:
            return {...state, apiCallStatus: "finished"};
        case FINISH_API_ERR:
            return {...state, apiCallStatus: "error", deckAPIErrMsg: action.message};
        default:
            return state;
    }
};

export default uiEventReducer;