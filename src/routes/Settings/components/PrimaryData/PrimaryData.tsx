import { InputText } from 'primereact/inputtext'

import { Message, Photo } from '@gitcv/components'
import { useLocale } from '@gitcv/hooks'

import { Container, Fields } from './styled'
import usePrimaryData from './usePrimaryData'

const PrimaryData = () => {
    const { getMessage } = useLocale()
    const { register, photo, handleChangePhoto } = usePrimaryData()

    return (
        <Container>
            <Photo value={photo} onChange={handleChangePhoto} />
            <Fields>
                <InputText
                    {...register('name')}
                    placeholder={getMessage('label.placeholder.name')}
                />
                <InputText
                    {...register('position')}
                    placeholder={getMessage('label.placeholder.position')}
                />
                <Message>{getMessage('text.settings')}</Message>
            </Fields>
        </Container>
    )
}

export default PrimaryData
