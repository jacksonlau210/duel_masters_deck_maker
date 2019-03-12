import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DmRouter from './router/DmRouter';
import DmIntlProvider from './languages/DmIntlProvider';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './redux/reducers/appReducer';
import * as serviceWorker from './serviceWorker';
import DMTheme from './theme.json';

const theme = createMuiTheme(DMTheme);
const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <DmIntlProvider>
                <DmRouter />
            </DmIntlProvider>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
