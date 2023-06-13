import axios, { AxiosProgressEvent } from 'axios'

const getSession = (): string => {
    return localStorage.getItem('session') || ''
}

const request = axios.create({
    baseURL: process.env.CDN_HOST,
    headers: {
        'Content-Type': 'multipart/form-data',
        session: getSession(),
    },
})

const upload = async (
    blob: Blob | null,
    onUploadProgress?: (event: AxiosProgressEvent) => void
) => {
    if (!blob) {
        throw new Error('Empty blob data')
    }

    const formData = new FormData()

    formData.append('data', blob)

    const { data } = await request.post<{ url: string }>('/upload', formData, {
        onUploadProgress,
    })

    return data
}

export default upload
