import React from 'react'

import { useAuthRedirect } from '@gitcv/hooks'

type Props = {}

const Auth: React.FC<Props> = () => {
    useAuthRedirect()

    return <div />
}

export default Auth
