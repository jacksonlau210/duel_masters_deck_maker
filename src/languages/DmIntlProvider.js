import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';

import intlMessagesEN from './en.json';
import intlMessagesZH from './zh.json';
import intlMessagesJA from './ja.json';

const intlMessageMap = {
    en: intlMessagesEN,
    zh: intlMessagesZH,
    ja: intlMessagesJA
};

class DmIntlProvider extends Component
{
    constructor(props)
    {
        super(props);
        addLocaleData([...en,...zh,...ja]);
        let defaultLangCode = localStorage.getItem('langCode');
        this.state = {
            locale: (defaultLangCode===null)?'en':defaultLangCode
        };
    }

    changeLanguage = (langCode) => {
        document.getElementsByTagName("html")[0].setAttribute("lang", langCode);
        this.setState({ locale: langCode });
    }

    render()
    {
        const { locale } = this.state;
        return(
            <IntlProvider locale={ locale } messages={intlMessageMap[locale]}>
                {React.cloneElement(this.props.children, { changeLanguage: this.changeLanguage })}
            </IntlProvider>
        );
    }
}

export default DmIntlProvider;