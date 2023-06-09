import { PropsWithChildren } from 'react'

import { useLocale } from '@gitcv/hooks'
import { Prompt } from '@gitcv/lib'

import { Container, MultiSelect, InputText, Content } from './styled'
import { GenerateCvDialogProps } from './types'
import useGenerateCvDialog from './useGenerateCvDialog'

const GenerateCvDialog = ({
    onComplete,
}: PropsWithChildren<GenerateCvDialogProps>) => {
    const { getMessage } = useLocale()
    const {
        isLoading,
        options,
        repos,
        handleGenerateCv,
        setRepos,
        title,
        setTitle,
    } = useGenerateCvDialog()

    return (
        <Container>
            <Prompt
                disabled={!title || !repos.length}
                loading={isLoading}
                title={getMessage('title.generate.cv')}
                onDismiss={onComplete}
                onSubmit={handleGenerateCv}
            >
                <Content>
                    <InputText
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={getMessage('label.placeholder.cv.title')}
                    />
                    <MultiSelect
                        display="chip"
                        value={repos}
                        onChange={(e) => setRepos(e.value)}
                        options={options}
                        placeholder={getMessage(
                            'label.placeholder.select.repos'
                        )}
                    />
                </Content>
            </Prompt>
        </Container>
    )
}

export default GenerateCvDialog
