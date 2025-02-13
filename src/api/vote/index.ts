import $http from '@/utils/axios.ts'
import type {Response} from "@/api/Response.ts";
import pinia from "@/store";
import useVoteStore from "@/store/modules/Vote.ts";
import type {addVoteInterface} from "@/api/vote/type.ts";


let {voteList} = useVoteStore(pinia)

enum API {
    VOTE_LIST_URL = '/vote/list',
    VOTE_CHOOSE_URL = '/vote/choose',
    VOTE_LIKE_LIST_URL = '/vote/like-list',
    ADD_VOTE_URL = '/vote/add',
    FILTER_VOTE_URL = '/vote/filter',
    DELETE_VOTE_URL = '/vote/delete',
}

// 获取投票列表
export const reqVoteList = async () => {
    let result: Response = await $http({
        method: 'GET',
        url: API.VOTE_LIST_URL,
    })

    if (result.code === 200) {
        voteList.length = 0
        Object.assign(voteList, result.data)
        return 'ok'
    }
    return Promise.reject(result.msg)
}
// 模糊查询
export const reqLikeList = async (like: string) => {
    let result: Response = await $http({
        method: 'GET',
        url: API.VOTE_LIKE_LIST_URL,
        params: {
            like,
        }
    })

    if (result.code === 200) {
        voteList.length = 0
        Object.assign(voteList, result.data)
        return 'ok'
    }
}
// 投票
export const reqVoteChoose = async (id: number, choose: boolean) => {
    let result: Response = await $http({
        method: 'POST',
        url: API.VOTE_CHOOSE_URL,
        data: {
            id,
            choose,
        }
    })
    if (result.code === 200) {
        return 'ok'
    }
    return Promise.reject(result.msg)
}
// 发起投票
export const reqAddVote = async (data: addVoteInterface) => {
    let result: Response = await $http({
        method: 'POST',
        url: API.ADD_VOTE_URL,
        data
    })

    if (result.code === 200) {
        return 'ok'
    }
    return Promise.reject(result.msg)
}
// 筛选
export const reqFilter = async (value: string) => {
    let result: Response = await $http({
        method: 'GET',
        url: API.FILTER_VOTE_URL + `/${value}`,
    })
    if (result.code === 200) {
        voteList.length = 0
        Object.assign(voteList, result.data)
        return 'ok'
    }
    return Promise.reject(result.msg)
}

// 删除投票
export const reqDeleteVote = async (id: number) => {
    let result: Response = await $http({
        method: 'POST',
        url: API.DELETE_VOTE_URL + `/${id}`,
    })
    if (result.code === 200) {
        return 'ok'
    }
    return Promise.reject(result.msg)
}