import { SavingIndicator } from '@gitcv/components'

import { Contacts, PrimaryData, Profile, Section, Skills } from './components'
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

                <Section title="Profile">
                    <Profile />
                </Section>

                <Section title="Contacts">
                    <Contacts />
                </Section>

                <Section title="Skills">
                    <Skills />
                </Section>

                <Section title="Languages">...</Section>

                <Section title="Education">...</Section>

                <Section title="Employment History">...</Section>

                <Section title="Projects">...</Section>
            </Content>
        </Container>
    )
}

export default Settings
