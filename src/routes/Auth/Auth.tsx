import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

const Auth = () => {
    const navigate = useNavigate()
    const { token } = useParams()

    useEffect(() => {
        if (token) {
            localStorage.setItem('session', token)
            window.location.replace('/')
        } else {
            navigate('/', { replace: true })
        }
    }, [token])

    return <div />
}

export default Auth
