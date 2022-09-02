import { useSelector } from 'react-redux'

import { RootState } from '@gitcv/store'
import { AccountState } from '@gitcv/store/account/types'

const useAccount = () =>
    useSelector<RootState, AccountState>((state) => state.account)

export default useAccount
