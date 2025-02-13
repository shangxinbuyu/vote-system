export const getTime = () => {
    let title = ''
    let hours = new Date().getHours()
    if (hours <= 9) {
        title = '早上'
    } else if (hours <= 12) {
        title = '上午'
    } else if (hours <= 15) {
        title = '中午'
    } else if (hours <= 18) {
        title = '下午'
    } else {
        title = '晚上'
    }
    return title
}