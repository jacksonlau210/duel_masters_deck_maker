/*
 * action types
 */

export const SET_TARGET_CARD = 'SET_TARGET_CARD';
export const OPEN_CARD_DETAIL_DIALOG = 'OPEN_CARD_DETAIL_DIALOG';
export const CLOSE_CARD_DETAIL_DIALOG = 'CLOSE_CARD_DETAIL_DIALOG';
export const OPEN_INSERT_CARD_DIALOG = 'OPEN_INSERT_CARD_DIALOG';
export const CLOSE_INSERT_CARD_DIALOG = 'CLOSE_INSERT_CARD_DIALOG';
export const OPEN_DECK_NAME_DIALOG = 'OPEN_DECK_NAME_DIALOG';
export const CLOSE_DECK_NAME_DIALOG = 'CLOSE_DECK_NAME_DIALOG';
export const OPEN_FILTER_DIALOG = 'OPEN_FILTER_DIALOG';
export const CLOSE_FILTER_DIALOG = 'CLOSE_FILTER_DIALOG';

/*
 * action creators
 */

export function setTargetCard(card)
{
    return {
        type: SET_TARGET_CARD,
        card: card
    }
}

export function openCardDetailDialog()
{
    return {
        type: OPEN_CARD_DETAIL_DIALOG
    }
}

export function closeCardDetailDialog()
{
    return {
        type: CLOSE_CARD_DETAIL_DIALOG
    }
}

export function openinsertCardDialog()
{
    return {
        type: OPEN_INSERT_CARD_DIALOG
    }
}

export function closeinsertCardDialog()
{
    return {
        type: CLOSE_INSERT_CARD_DIALOG
    }
}

export function openDeckNameDialog()
{
    return {
        type: OPEN_DECK_NAME_DIALOG
    }
}

export function closeDeckNameDialog()
{
    return {
        type: CLOSE_DECK_NAME_DIALOG
    }
}

export function openFilterDialog()
{
    return {
        type: OPEN_FILTER_DIALOG
    }
}

export function closeFilterDialog()
{
    return {
        type: CLOSE_FILTER_DIALOG
    }
}
