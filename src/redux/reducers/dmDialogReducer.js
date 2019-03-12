import { SET_TARGET_CARD, 
    OPEN_CARD_DETAIL_DIALOG, CLOSE_CARD_DETAIL_DIALOG, 
    OPEN_INSERT_CARD_DIALOG, CLOSE_INSERT_CARD_DIALOG,
    OPEN_DECK_NAME_DIALOG, CLOSE_DECK_NAME_DIALOG,
    OPEN_FILTER_DIALOG, CLOSE_FILTER_DIALOG } from '../actions/dmDialogActions'

const dmDialogReducer = (state = { targetCard: null, cardDetailDialog: false,
    insertCardDialog: false, deckNameDialog: false, filterDialog: false }, action) => {
    switch (action.type)
    {
        case SET_TARGET_CARD:
            return {...state, targetCard: action.card};
        case OPEN_CARD_DETAIL_DIALOG:
            return {...state, cardDetailDialog: true};
        case CLOSE_CARD_DETAIL_DIALOG:
            return {...state, cardDetailDialog: false};
        case OPEN_INSERT_CARD_DIALOG:
            return {...state, insertCardDialog: true};
        case CLOSE_INSERT_CARD_DIALOG:
            return {...state, insertCardDialog: false};
        case OPEN_DECK_NAME_DIALOG:
            return {...state, deckNameDialog: true};
        case CLOSE_DECK_NAME_DIALOG:
            return {...state, deckNameDialog: false};
        case OPEN_FILTER_DIALOG:
            return {...state, filterDialog: true};
        case CLOSE_FILTER_DIALOG:
            return {...state, filterDialog: false};
        default:
            return state;
    }
};

export default dmDialogReducer;