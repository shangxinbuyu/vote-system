import {defineStore} from "pinia"

import {constantRouter} from "@/router/router.ts"

let useUserStore = defineStore('User', () => {
    let menuRoutes = constantRouter
    let avatar = ''
    let name = ''
    return {menuRoutes, avatar, name}
})

export default useUserStore