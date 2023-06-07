import {
    Cv,
    GenerateCvBody,
    UpdateCvBody,
    UpdateCvTagBody,
} from '@isalikov/gitcv-api'

import request from '@gitcv/services/request'

export const createCv = async (body: GenerateCvBody): Promise<Cv> => {
    const { data } = await request.post<Cv>('/cv', body)

    return data
}

export const updateCv = async (body: UpdateCvBody): Promise<Cv> => {
    const { data } = await request.patch<Cv>('/cv', body)

    return data
}

export const updateTag = async (body: UpdateCvTagBody): Promise<Cv> => {
    const { data } = await request.patch<Cv>('/tag/:tag', body)

    return data
}
