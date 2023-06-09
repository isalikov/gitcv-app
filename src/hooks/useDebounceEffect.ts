import { useEffect } from 'react'

let timeout

const useDebounceEffect = (
    fn: () => void,
    values: unknown,
    debounce: number,
    condition?: boolean
) => {
    useEffect(() => {
        clearTimeout(timeout)
        if (condition) {
            timeout = setTimeout(() => fn(), 1000)
        }
    }, [values, condition])
}

export default useDebounceEffect
