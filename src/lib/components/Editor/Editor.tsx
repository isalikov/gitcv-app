import React, { FormEvent, useMemo } from 'react'

import EditorJS from '@editorjs/editorjs'

import css from './Editor.scss'
import { EditorProps } from './types'

const Editor: React.FC<EditorProps> = ({ value, readOnly, onSave }) => {
    const holderId = Math.random().toString()
    const editor = useMemo(
        () => new EditorJS({ data: value, readOnly, holderId, minHeight: 400 }),
        []
    )

    const handleSave = async (event: FormEvent) => {
        event.preventDefault()

        const payload = await editor.save()
        onSave(payload)
    }

    return (
        <form className={css.container} onSubmit={handleSave}>
            <div id={holderId} className={css.editor} />
            <button type="submit">Save</button>
        </form>
    )
}

export default Editor
