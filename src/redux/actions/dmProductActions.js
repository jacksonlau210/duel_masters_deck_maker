import { API } from 'aws-amplify';
import { startAPICall, finishAPICall } from './uiEventActions'

/*
 * action types
 */

export const FILTER_BOOSTER_PACK_LIST = 'FILTER_BOOSTER_PACK_LIST';
export const FILTER_STARTER_DECK_LIST = 'FILTER_STARTER_DECK_LIST';
export const FILTER_PROMO_CARD_LIST = 'FILTER_PROMO_CARD_LIST';
export const GET_BOOSTER_PACK_LIST = 'GET_BOOSTER_PACK_LIST';
export const GET_STARTER_DECK_LIST = 'GET_STARTER_DECK_LIST';
export const GET_PROMO_CARD_LIST = 'GET_PROMO_CARD_LIST';
export const RECEIVE_BOOSTER_PACK_LIST = 'RECEIVE_BOOSTER_PACK_LIST';
export const RECEIVE_STARTER_DECK_LIST = 'RECEIVE_STARTER_DECK_LIST';
export const RECEIVE_PROMO_CARD_LIST = 'RECEIVE_PROMO_CARD_LIST';

/*
 * action creators
 */

export function getBoosterPack()
{
    return function (dispatch) {
        dispatch(startAPICall());
        return API.get("Duel Masters API", "boosterPacks/")
            .then(response => {
                console.log(response);
                dispatch(finishAPICall());
                dispatch(receiveBoosterPack(response));
            })
            .catch(error => {
                console.log(error);
            })
        };
}

function receiveBoosterPack(json)
{
    return {
        type: RECEIVE_BOOSTER_PACK_LIST,
        boosterPacks: json
    }
}

export function filterBoosterPack(filter_text)
{
    return {type: FILTER_BOOSTER_PACK_LIST, filterText: filter_text};
}

export function getStarterDeck()
{
    return function (dispatch) {
        dispatch(startAPICall());
        return API.get("Duel Masters API", "starterDecks/")
            .then(response => {
                console.log(response);
                dispatch(finishAPICall());
                dispatch(receiveStarterDeck(response));
            })
        };
}

function receiveStarterDeck(json)
{
    return {
        type: RECEIVE_STARTER_DECK_LIST,
        starterDecks: json
    }
}

export function filterStarterDeck(filter_text)
{
    return {type: FILTER_STARTER_DECK_LIST, filterText: filter_text};
}