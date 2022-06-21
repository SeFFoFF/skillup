export const convertTimeBySeconds = (seconds) => {
    if (seconds) return new Date(seconds*1000).toUTCString().split(/ /)[4]
}