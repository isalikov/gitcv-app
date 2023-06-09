import { useEffect } from 'react'

const useTitle = (title: string) => {
    useEffect(() => {
        document.title = `${title} / Gitcv`

        return () => {
            document.title = 'Gitcv'
        }
    }, [title])
}

export default useTitle
