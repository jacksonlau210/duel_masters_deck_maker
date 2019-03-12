import { RECEIVE_CARDS, RESET_CARD_LIST } from '../actions/dmCardActions'

const dmCardReducer = (state = [], action) => {
    switch (action.type)
    {
        case RECEIVE_CARDS:
            return action.cards;
        case RESET_CARD_LIST:
            return [];
        default:
            return state;
    }
};

export default dmCardReducer;