import {defineStore} from "pinia"

let useSettingStore = defineStore("setting", () => {
    let fold = false
    return {fold}
})

export default useSettingStore