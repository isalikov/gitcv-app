import { ProgressSpinner } from 'primereact/progressspinner'

import { Container, Title } from './styled'
import useSavingIndicator from './useSavingIndicator'

const SavingIndicator = () => {
    const { active } = useSavingIndicator()

    if (!active) {
        return null
    }

    return (
        <Container>
            <Title>Saving Data</Title>

            <ProgressSpinner
                style={{ width: '22px', height: '22px' }}
                strokeWidth="3"
                fill="var(--surface-ground)"
                animationDuration=".9s"
            />
        </Container>
    )
}

export default SavingIndicator
