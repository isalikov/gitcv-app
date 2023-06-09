import { SavingIndicator } from '@gitcv/components'

import { Contacts, PrimaryData, Section } from './components'
import { Content, Container } from './styled'
import { useTitle } from '../../hooks'

const Settings = () => {
    useTitle('Settings')
    return (
        <Container>
            <Content>
                <SavingIndicator />

                <Section title="Settings">
                    <PrimaryData />
                </Section>

                <Section title="Contacts">
                    <Contacts />
                </Section>

                <Section title="Profile">...</Section>

                <Section title="Education">...</Section>

                <Section title="Employment History">...</Section>

                <Section title="Portfolio">...</Section>
            </Content>
        </Container>
    )
}

export default Settings
