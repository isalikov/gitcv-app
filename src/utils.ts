export const debounceRun = (
    timestamp: number,
    delay: number,
    cb: () => void
): void => {
    const gap = Date.now() - timestamp

    if (gap < delay) {
        setTimeout(cb, delay - gap)
    } else {
        cb()
    }
}
