import { OutputData } from '@editorjs/editorjs'

export type EditorProps = {
    value?: OutputData
    readOnly?: boolean
    onSave: (value: OutputData) => void
}
