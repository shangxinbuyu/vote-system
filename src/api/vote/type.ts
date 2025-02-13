export interface voteListInterface {
    id: number
    title: string
    agree: number
    contra: number
    status: number
    sponsor: boolean
}

export interface addVoteInterface {
    title: string,
    expiredTime: string
}