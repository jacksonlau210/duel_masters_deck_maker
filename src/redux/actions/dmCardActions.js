import { API } from 'aws-amplify';
import { startAPICall, finishAPICall } from './uiEventActions'

/*
 * action types
 */

export const GET_CARDS_BY_SET_ID = 'GET_CARDS_BY_SET_ID';
export const GET_CARDS_BY_DECK_ID = 'GET_CARDS_BY_DECK_ID';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const RESET_CARD_LIST = 'RESET_CARD_LIST';


/*
 * action creators
 */

function resetCardList()
{
    return {
        type: RESET_CARD_LIST
    }
}

export function getCardsBySetId(setId)
{
    return function (dispatch) {
        dispatch(startAPICall());
        dispatch(resetCardList());
        return API.get("Duel Masters API", "cards/" + setId)
            .then(response => {
                console.log(response);
                dispatch(finishAPICall());
                dispatch(receiveCards(response));
            })
            .catch(error => {
                console.log(error);
            })
        };
}

export function getCardsByDeckId(deckId)
{
    return function (dispatch) {
        dispatch(startAPICall());
        dispatch(resetCardList());
        return API.get("Duel Masters API", "playerDecks/" + deckId)
            .then(response => {
                dispatch(finishAPICall());
                dispatch(receiveCards(response[0].cards));
            })
            .catch(error => {
                console.log(error);
            })
        };
}

function receiveCards(json)
{
    return {
        type: RECEIVE_CARDS,
        cards: json
    }
}