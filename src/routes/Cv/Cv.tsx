import { useMemo, useState } from 'react'

import MDEditor from '@uiw/react-md-editor'

import { useParams } from 'react-router-dom'

import { useAppState } from '@gitcv/hooks'
import { Container } from '@gitcv/routes/Cv/styled'

const Cv = () => {
    const { uuid } = useParams<{ uuid: string }>()
    const { user } = useAppState()

    const [mode, setMode] = useState<'view' | 'edit'>('view')

    const cv = useMemo(() => {
        return user?.cvs.find((item) => item.uuid === uuid)
    }, [user?.cvs, uuid])

    if (!cv) {
        return <span>not found</span>
    }

    return (
        <Container>
            <img width={200} src={cv.photo} alt={cv.uuid} />

            <input type="text" value={cv.name} />
            <input type="text" value={cv.position} />
            <input type="text" value={cv.cvtag} />
            <input type="text" value={cv.location} />

            <div>
                <label htmlFor="view">
                    <input
                        onChange={() => setMode('view')}
                        type="radio"
                        name="view"
                        id="view"
                        checked={mode === 'view'}
                    />
                    <span>View</span>
                </label>

                <label htmlFor="edit">
                    <input
                        onChange={() => setMode('edit')}
                        type="radio"
                        name="edit"
                        id="edit"
                        checked={mode === 'edit'}
                    />
                    <span>Edit</span>
                </label>
            </div>

            <span>about</span>
            {mode === 'edit' && (
                <MDEditor value={cv.about} onChange={() => {}} />
            )}

            {mode === 'view' && (
                <MDEditor.Markdown
                    source={cv.about}
                    style={{ whiteSpace: 'pre-wrap' }}
                />
            )}

            <span>education</span>
            <span>employment history</span>
        </Container>
    )
}

export default Cv
