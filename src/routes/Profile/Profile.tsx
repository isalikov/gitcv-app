import React from 'react'

import { Editor } from '@gitcv/lib/components'
import { useAccount } from '@gitcv/store/hooks'

import css from './Profile.scss'
import { useProfile } from './hooks'
import { ProfileProps } from './types'

const Profile: React.FC<ProfileProps> = ({ fetchStatus }) => {
    const { name } = useAccount()
    const { handleSave } = useProfile()

    if (!fetchStatus.isSucceed) {
        return null
    }

    return (
        <div className={css.container}>
            <span>{name}</span>
            <Editor onSave={handleSave} />
        </div>
    )
}

export default Profile
