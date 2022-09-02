export type CV = {
    time: string
    blocks: object[]
}

export type User = {
    email: string | null
    login: string
    name: string
    photo: string
    cv: Array<CV>
}
