import { RECEIVE_PLAYER_DECK_LIST, RECEIVE_SINGLE_PLAYER_DECK, RESET_DECK_LIST } from '../actions/dmDeckActions'

const dmDeckReducer = (state = [], action) => {
    switch (action.type)
    {
        case RECEIVE_PLAYER_DECK_LIST:
            return action.decks;
        case RECEIVE_SINGLE_PLAYER_DECK:
            return action.deck;
        case RESET_DECK_LIST:
            return [];
        default:
            return state;
    }
};

export default dmDeckReducer;