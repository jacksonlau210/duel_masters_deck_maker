import { API, Auth } from 'aws-amplify';
import { startAPICall, finishAPICall, finishAPIError } from './uiEventActions'

/*
 * action types
 */
export const GET_PLAYER_DECK_LIST = 'GET_PLAYER_DECK_LIST';
export const GET_SINGLE_PLAYER_DECK = 'GET_SINGLE_PLAYER_DECK';
export const RECEIVE_PLAYER_DECK_LIST = 'RECEIVE_PLAYER_DECK_LIST';
export const RECEIVE_SINGLE_PLAYER_DECK = 'RECEIVE_SINGLE_PLAYER_DECK';
export const INSERT_PLAYER_DECK = 'INSERT_PLAYER_DECK';
export const UPDATE_PLAYER_DECK = 'UPDATE_PLAYER_DECK';
export const INSERT_CARDS_TO_DECK = 'INSERT_CARDS_TO_DECK';
export const DELETE_PLAYER_DECK = 'DELETE_PLAYER_DECK';
export const RESET_DECK_LIST = 'RESET_DECK_LIST';

 /*
 * action creators
 */

function resetDeckList()
{
    return {
        type: RESET_DECK_LIST
    }
}

export function getPlayerDecks()
{
    return function (dispatch) {
        dispatch(startAPICall());
        dispatch(resetDeckList());
        return Auth.currentAuthenticatedUser()
            .then(user => {
                console.log(user);
                return API.get("Duel Masters API", "playerDecks/user/"+user.username)
                .then(response => {
                    console.log(response);
                    dispatch(finishAPICall());
                    dispatch(receivePlayerDecks(response));
                })
                .catch(error => {
                    throw error;
                })
            })
            .catch(err => console.log(err));
    };
}

export function getPlayerDeck(deckId)
{
    return function (dispatch) {
        dispatch(startAPICall());
        dispatch(resetDeckList());
        return API.get("Duel Masters API", "playerDecks/" + deckId)
            .then(response => {
                console.log(response);
                dispatch(finishAPICall());
                dispatch(receivePlayerDeck(response));
            })
            .catch(error => {
                console.log(error);
            })
        };
}

function receivePlayerDecks(json)
{
    return {
        type: RECEIVE_PLAYER_DECK_LIST,
        decks: json
    }
}

function receivePlayerDeck(json)
{
    return {
        type: RECEIVE_SINGLE_PLAYER_DECK,
        deck: json
    }
}

export function createPlayerDeck(deckName)
{
    return function (dispatch) {
        dispatch(startAPICall());
        return Auth.currentAuthenticatedUser()
            .then(user => {
                console.log(user);
                let myInit = {
                    body: {name: deckName, userId: user.username}
                };
                
                return API.post("Duel Masters API", "playerDecks/", myInit)
                .then(response => {
                    console.log(response);
                    dispatch(finishAPICall());
                })
                .catch(error => {
                    throw error;
                })
            })
            .catch(err => {
                console.log(err);
                finishAPIError("Error while inserting deck");
            });
    };
}

export function updatePlayerDecks(deckId, requestBody)
{
    let myInit = {
        body: requestBody
    }
    return function (dispatch) {
        dispatch(startAPICall());
        return API.put("Duel Masters API", "playerDecks/" + deckId, myInit)
            .then(response => {
                console.log(response);
                dispatch(finishAPICall());
            })
            .catch(error => {
                console.log(error);
                finishAPIError("Error while udpating deck");
            })
        };
}

export function insertCardsToDeck(deckId, requestBody)
{
    let myInit = {
        body: requestBody
    }
    return function (dispatch) {
        dispatch(startAPICall());
        return API.put("Duel Masters API", "insertCards/" + deckId, myInit)
            .then(response => {
                console.log(response);
                dispatch(finishAPICall());
            })
            .catch(error => {
                console.log(error);
                finishAPIError("Error while udpating deck");
            })
        };
}

export function deletePlayerDeck(deckId)
{
    return function (dispatch) {
        dispatch(startAPICall());
        return API.del("Duel Masters API", "playerDecks/" + deckId)
            .then(response => {
                console.log(response);
                dispatch(finishAPICall());
            })
            .catch(error => {
                console.log(error);
                finishAPIError("Error while deleting deck");
            })
        };
}