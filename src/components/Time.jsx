import { Text } from "@chakra-ui/react"
import { formatTime } from "../utils"

export default function Time({ currentTime }) {
	return (
		<Text
			fontWeight={"bold"}
			fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
			color={"white"}
			letterSpacing={"wider"}
			fontFamily={"Montserrat"}
		>
			{formatTime(currentTime)}
		</Text>
	)
}