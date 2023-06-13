import { useRef, useState } from 'react'

import { HqCropper } from 'hq-cropper'

import { Button } from 'primereact/button'

import { useLocale, useUser } from '@gitcv/hooks'

import upload from '@gitcv/services/upload'

import { Container, Image } from './styled'
import { PhotoProps } from './types'

const Photo = ({ value }: PhotoProps) => {
    const [photo, setPhoto] = useState(value)
    const { getMessage } = useLocale()
    const { saveUser } = useUser()

    const [loading, setLoading] = useState(false)
    const handleChange = async (base64: string, blob: Blob | null) => {
        setPhoto(base64)

        setLoading(true)
        const { url } = await upload(blob, (e) => console.log(e))

        setLoading(false)
        await saveUser({ photo: url })
    }

    const { current: hqCropper } = useRef(HqCropper(handleChange))

    return (
        <Container>
            <Image src={photo} />
            <Button
                text
                type="button"
                severity="secondary"
                onClick={hqCropper.open}
                size="small"
            >
                {loading ? 'loading' : getMessage('label.change')}
            </Button>
        </Container>
    )
}

export default Photo
