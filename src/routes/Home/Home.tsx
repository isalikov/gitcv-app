import React from 'react'

import { useIntl } from 'react-intl'

import { Page } from '@gitcv/lib/components'

import css from './Home.scss'

const Home: React.FC = () => {
    const intl = useIntl()

    const title = intl.formatMessage({ id: 'home.title' })
    document.title = title

    return (
        <Page className={css.container} title={title}>
            <span>{title}</span>

            <div className={css.actions}>
                <a href="http://localhost:3000/github/oauth">
                    <button type="button">
                        {intl.formatMessage({ id: 'home.login' })}
                    </button>
                </a>
            </div>
        </Page>
    )
}

export default Home
