import Icon from 'feather-react'
import { ProgressSpinner } from 'primereact/progressspinner'

import { useLocale } from '@gitcv/hooks'

import { Container, Done, Title } from './styled'
import useSavingIndicator from './useSavingIndicator'

const SavingIndicator = () => {
    const { active, succeed } = useSavingIndicator()
    const { getMessage } = useLocale()

    if (!active && !succeed) {
        return null
    }

    return (
        <Container>
            <Title>
                {succeed
                    ? getMessage('label.saved')
                    : getMessage('label.saving')}
            </Title>

            {active && (
                <ProgressSpinner
                    style={{ width: '22px', height: '22px' }}
                    strokeWidth="3"
                    fill="var(--surface-ground)"
                    animationDuration=".9s"
                />
            )}
            {succeed && (
                <Done>
                    <Icon size={20} name="check" />
                </Done>
            )}
        </Container>
    )
}

export default SavingIndicator

/*

 */
