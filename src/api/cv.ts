import { Cv, GenerateEntityBody } from '@isalikov/gitcv-api'

import request from '@gitcv/services/request'

export const createCv = async (body: GenerateEntityBody): Promise<Cv> => {
    const { data } = await request.post<Cv>('/cv', body)

    return data
}
