import { RECEIVE_BOOSTER_PACK_LIST, RECEIVE_STARTER_DECK_LIST } from '../actions/dmProductActions'

const dmProductReducer = (state = [], action) => {
    switch (action.type)
    {
        case RECEIVE_BOOSTER_PACK_LIST:
            return action.boosterPacks;
        case RECEIVE_STARTER_DECK_LIST:
            return action.starterDecks;
        default:
            return state;
    }
};

export default dmProductReducer;