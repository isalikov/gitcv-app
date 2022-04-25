import { SESSION_TOKEN } from '../constants'

class Request {
    baseURL = 'http://localhost:3001'

    get = <T extends object>(url: string): Promise<T> => {
        return fetch(this.baseURL + url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                [SESSION_TOKEN]: localStorage.getItem(SESSION_TOKEN) || '',
            },
        }).then((response) => response.json() as T)
    }
}

export default new Request()
