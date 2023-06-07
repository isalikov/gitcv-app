import {
    CreateEmployerBody,
    Employer,
    UpdateEmployerBody,
} from '@isalikov/gitcv-api'

import request from '@gitcv/services/request'

export const fetchEmployerByID = async (id: number): Promise<Employer> => {
    const { data } = await request.get<Employer>(`/employer/${id}`)

    return data
}

export const createEmployer = async (
    id: number,
    body: CreateEmployerBody
): Promise<Employer> => {
    const { data } = await request.post<Employer>('/employer', body)

    return data
}

export const updateEmployerByID = async (
    id: number,
    body: UpdateEmployerBody
): Promise<Employer> => {
    const { data } = await request.patch<Employer>(`/employer/${id}`, body)

    return data
}

export const deleteEmployerByID = async (id: number): Promise<void> => {
    await request.delete<Employer>(`/employer/${id}`)
}
