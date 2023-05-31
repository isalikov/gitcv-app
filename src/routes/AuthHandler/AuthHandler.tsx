import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { SESSION_TOKEN } from '@gitcv/constants'

import { AuthHandlerParams } from './types'

const AuthHandler = () => {
    const navigate = useNavigate()
    const { token } = useParams<AuthHandlerParams>()

    useEffect(() => {
        if (token) {
            localStorage.setItem(SESSION_TOKEN, token)
            window.location.replace('/settings')
        } else {
            navigate('/', { replace: true })
        }
    }, [token])

    return <div />
}

export default AuthHandler
