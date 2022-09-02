import { useFetchStatus } from '@gitcv/hooks'

const useProfile = () => {
    const [savingStatus, savingActions] = useFetchStatus()

    const handleSave = () => {
        savingActions.start()
    }

    return { handleSave, savingStatus }
}

export default useProfile
