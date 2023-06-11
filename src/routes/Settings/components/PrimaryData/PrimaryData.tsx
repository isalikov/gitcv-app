import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

import { Message, Photo } from '@gitcv/components'
import { useLocale } from '@gitcv/hooks'

import { Container, Fields, Footer } from './styled'
import usePrimaryData from './usePrimaryData'

const PrimaryData = () => {
    const { getMessage } = useLocale()
    const { register, photo, handleChangePhoto, handleSync, syncing } =
        usePrimaryData()

    return (
        <Container>
            <Photo value={photo} onChange={handleChangePhoto} />
            <Fields>
                <InputText
                    {...register('name')}
                    className="p-inputtext-sm"
                    placeholder={getMessage('label.placeholder.name')}
                />
                <InputText
                    {...register('position')}
                    className="p-inputtext-sm"
                    placeholder={getMessage('label.placeholder.position')}
                />
                <Message>{getMessage('text.settings')}</Message>
                <Footer>
                    <Button
                        size="small"
                        icon="pi pi-github"
                        type="button"
                        loading={syncing}
                        onClick={handleSync}
                        label={getMessage('label.sync')}
                    />
                </Footer>
            </Fields>
        </Container>
    )
}

export default PrimaryData
