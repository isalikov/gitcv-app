import React from 'react'
import { FormattedMessage as Message } from 'react-intl'

import { useTitle } from '@src/hooks'

import css from './Home.sass'

type Props = {}

const Home: React.FC<Props> = () => {
    useTitle('Demo')

    return (
        <div className={css.container}>
            <a href="http://localhost:3000/github/oauth">
                <button type="button">
                    <Message id="login" />
                </button>
            </a>
        </div>
    )
}

export default Home
