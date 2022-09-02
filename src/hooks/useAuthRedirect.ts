import { useSearchParams } from 'react-router-dom'

import { SESSION_TOKEN } from '@gitcv/constants'

const useAuthRedirect = () => {
    const [searchParams] = useSearchParams()

    localStorage.setItem(SESSION_TOKEN, searchParams.get('st') || '')

    window.location.href = '/profile'
}

export default useAuthRedirect
