import { useRef, useState } from 'react'

import { HqCropper } from 'hq-cropper'

import { Button } from 'primereact/button'

import { useLocale } from '@gitcv/hooks'

import { Container, Image } from './styled'
import { PhotoProps } from './types'

// TODO: implement s3 uploading
const Photo = ({ value }: PhotoProps) => {
    const [photo, setPhoto] = useState(value)
    const { getMessage } = useLocale()
    const handleChange = (base64: string) => {
        setPhoto(base64)
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
                {getMessage('label.change')}
            </Button>
        </Container>
    )
}

export default Photo
