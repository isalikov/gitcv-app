import { useEffect, useState } from 'react'

export type AsyncRequestOptions = {
    callOnMount: boolean
}

const useAsyncRequest = <T extends object>(
    requestFn: (...rest: any[]) => Promise<T>,
    options: AsyncRequestOptions = {
        callOnMount: true,
    }
) => {
    const [error, setError] = useState<Error | null>(null)
    const [pending, setPending] = useState(false)
    const [succeed, setSucceed] = useState(false)

    const [data, setData] = useState<T | undefined>(undefined)

    const request = async (...rest: any[]) => {
        setError(null)
        setSucceed(false)
        setPending(true)

        try {
            const result = await requestFn(...rest)

            setPending(false)
            setSucceed(true)
            setData(result)
        } catch (e) {
            setPending(false)
            setError(e)
        }
    }

    useEffect(() => {
        if (options.callOnMount) {
            request()
        }
    }, [])

    return [
        data,
        request,
        {
            error,
            pending,
            succeed,
        },
    ]
}

export default useAsyncRequest
