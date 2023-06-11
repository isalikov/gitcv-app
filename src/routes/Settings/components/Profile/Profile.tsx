import { MdEditor } from '@gitcv/components'

import { Container } from './styled'
import useProfile from './useProfile'

const Profile = () => {
    const { profile, handleChange } = useProfile()

    return (
        <Container>
            <MdEditor value={profile} onChange={handleChange} />
        </Container>
    )
}

export default Profile
