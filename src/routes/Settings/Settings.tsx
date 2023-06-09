import { SavingIndicator } from '@gitcv/components'

import { PrimaryData, Section } from './components'
import { Container } from './styled'

const Settings = () => {
    return (
        <Container>
            <SavingIndicator />

            <Section title="Settings">
                <PrimaryData />
            </Section>

            <Section title="Section 2">...</Section>
            <Section title="Section 3">...</Section>
            <Section title="Section 4">...</Section>
        </Container>
    )
}

export default Settings
