import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';

import intlMessagesEN from './en.json';
import intlMessagesZH from './zh.json';
import intlMessagesJA from './ja.json';

class DmIntlProvider extends Component
{
    constructor(props)
    {
        super(props);
        addLocaleData([...en,...zh,...ja]);
        this.state = {
            locale: 'en',
            messages: intlMessagesEN 
        };
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    changeLanguage(langCode)
    {
        document.getElementsByTagName("html")[0].setAttribute("lang", langCode);
        switch(langCode)
        {
            case "en":
                this.setState({
                    locale: langCode,
                    messages: intlMessagesEN
                });
                break;
            case "zh":
                this.setState({
                    locale: langCode,
                    messages: intlMessagesZH
                });
                break;
            case "ja":
                this.setState({
                    locale: langCode,
                    messages: intlMessagesJA
                });
                break;
            default:
                this.setState({
                    locale: langCode,
                    messages: intlMessagesEN
                });
        }
    }

    render()
    {
        return(
            <IntlProvider locale={ this.state.locale } messages={this.state.messages}>
                {React.cloneElement(this.props.children, { changeLanguage: this.changeLanguage })}
            </IntlProvider>
        );
    }
}

export default DmIntlProvider;