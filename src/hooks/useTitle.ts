import { useEffect } from 'react'

const useTitle = (title?: string) => {
    useEffect(() => {
        document.title = title || '404'
    }, [title])
}

export default useTitle
