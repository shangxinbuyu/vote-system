import {defineStore} from "pinia"
import {reactive} from "vue";
import type {voteListInterface} from "@/api/vote/type.ts";
import {reqVoteList} from "@/api/vote";
import {ElNotification} from "element-plus";

let useVoteStore = defineStore("VoteStore", () => {
    let voteList = reactive<voteListInterface[]>([])


    const list = async () => {
        try {
            await reqVoteList()
        } catch (e) {
            ElNotification({
                type: 'error',
                title: '接口内部错误',
                message: e as string,
            })
        }
    }
    return {voteList, list}
})
export default useVoteStore