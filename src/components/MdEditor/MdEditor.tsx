import { PropsWithChildren, useState } from 'react'

import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { EditorView } from '@codemirror/view'
import { githubLightInit } from '@uiw/codemirror-theme-github'
import CodeMirror from '@uiw/react-codemirror'
import MarkdownPreview from '@uiw/react-markdown-preview'

import { lighten } from 'polished'

import { useLocale, useTheme } from '@gitcv/hooks'

import { Container, Header, ModeActions, ModeControl, Preview } from './styled'
import { MdEditorProps } from './types'

const MdEditor = ({ value, onChange }: PropsWithChildren<MdEditorProps>) => {
    const theme = useTheme()
    const { getMessage } = useLocale()
    const [mode, setMode] = useState<'edit' | 'preview'>('edit')

    return (
        <Container>
            <Header>
                <ModeActions>
                    <ModeControl
                        type="button"
                        onClick={() => setMode('edit')}
                        active={mode === 'edit'}
                    >
                        {getMessage('label.edit')}
                    </ModeControl>
                    <ModeControl
                        type="button"
                        onClick={() => setMode('preview')}
                        active={mode === 'preview'}
                    >
                        {getMessage('label.preview')}
                    </ModeControl>
                </ModeActions>
            </Header>
            {mode === 'edit' && (
                <CodeMirror
                    minHeight="200px"
                    basicSetup={{
                        foldGutter: false,
                        autocompletion: false,
                        highlightActiveLine: false,
                    }}
                    theme={githubLightInit({
                        settings: {
                            background: '#ffffff',
                            caret: '#5d00ff',
                            selection: lighten(0.5, theme.colors.action),
                            selectionMatch: lighten(0.4, theme.colors.action),
                            lineHighlight: '#8a91991a',
                            gutterBackground: '#fff',
                            gutterBorder: 'transparent',
                        },
                    })}
                    value={value}
                    extensions={[
                        markdown({
                            base: markdownLanguage,
                            codeLanguages: languages,
                        }),
                        EditorView.lineWrapping,
                    ]}
                    onChange={onChange}
                />
            )}
            {mode === 'preview' && (
                <Preview>
                    <MarkdownPreview source={value} />
                </Preview>
            )}
        </Container>
    )
}

export default MdEditor
