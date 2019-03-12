import { combineReducers } from 'redux';
import dmProductReducer from './dmProductReducer';
import uiEventReducer from './uiEventReducer';
import dmDialogReducer from './dmDialogReducer';
import dmCardReducer from './dmCardReducer';
import dmDeckReducer from './dmDeckReducer';

const appReducer = combineReducers({
    dmProductList: dmProductReducer,
    dmCardList: dmCardReducer,
    dmDeckList: dmDeckReducer,
    uiEvents: uiEventReducer,
    dmDialog: dmDialogReducer
});

export default appReducer; 