export const formatTime = (time) => {
	const format = (value) => (value < 10 ? `0${value}` : value)
	const minutes = Math.floor(time / 60)
	const seconds = time % 60

	return `${format(minutes)}:${format(seconds)}`
}
