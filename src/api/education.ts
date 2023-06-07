import {
    CreateEducationBody,
    Education,
    UpdateEducationBody,
} from '@isalikov/gitcv-api'

import request from '@gitcv/services/request'

export const fetchEducationByID = async (id: number): Promise<Education> => {
    const { data } = await request.get<Education>(`/edu/${id}`)

    return data
}

export const createEducation = async (
    id: number,
    body: CreateEducationBody
): Promise<Education> => {
    const { data } = await request.post<Education>('/edu', body)

    return data
}

export const updateEducationByID = async (
    id: number,
    body: UpdateEducationBody
): Promise<Education> => {
    const { data } = await request.patch<Education>(`/edu/${id}`, body)

    return data
}

export const deleteEducationByID = async (id: number): Promise<void> => {
    await request.delete<Education>(`/edu/${id}`)
}
