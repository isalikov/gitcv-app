import { useEffect, useRef, useState } from 'react'

import { HqCropper } from 'hq-cropper'

import { useLocale } from '@gitcv/hooks'

import { Container, Image, ChangeOverlay, Label } from './styled'
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
        <Container onClick={hqCropper.open}>
            <Image src={photo} />
            <ChangeOverlay>
                <Label>{getMessage('label.change')}</Label>
            </ChangeOverlay>
        </Container>
    )
}

export default Photo
