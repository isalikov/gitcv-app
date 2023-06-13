import axios from 'axios'

const getSession = (): string => {
    return localStorage.getItem('session') || ''
}

export default axios.create({
    baseURL: process.env.API_HOST,
    headers: { session: getSession() },
})
