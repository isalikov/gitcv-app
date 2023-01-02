import axios from 'axios'

import { SESSION_TOKEN } from '@gitcv/constants'

export default axios.create({
    baseURL: process.env.API_URL,
    headers: {
        [SESSION_TOKEN]: localStorage.getItem(SESSION_TOKEN),
    },
})
