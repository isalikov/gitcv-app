import axios, { CreateAxiosDefaults } from 'axios'

const getSession = (): string => {
    return localStorage.getItem('session') || ''
}

const config = {
    baseURL: process.env.API_HOST,
    headers: { session: getSession() },
}

export default axios.create(config as CreateAxiosDefaults)
