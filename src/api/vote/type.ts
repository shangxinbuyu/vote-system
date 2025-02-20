export interface voteListInterface {
    id: number
    title: string
    agree: number
    contra: number
    type: number
    status: number
}

export interface addVoteInterface {
    title: string,
    expiredTime: string
}