import { useContext, useMemo } from 'react'

import { useLocation } from 'react-router-dom'

import { CvsList } from '@gitcv/components/Aside/types'
import { StateContext } from '@gitcv/state'

const useAside = () => {
    const location = useLocation()
    const {
        state: { user },
    } = useContext(StateContext)

    const isDashActive = location.pathname === '/'

    const isLinkActive = (tag: string) => `/${tag}` === location.pathname

    const links = useMemo(() => {
        if (!user) {
            return []
        }

        return user.cvs.map<CvsList>((cv) => ({
            id: cv.id,
            title: cv.title,
            to: cv.tag,
        }))
    }, [user?.cvs])

    return {
        isDashActive,
        isLinkActive,
        links,
    }
}

export default useAside
