import { IconButton } from "@chakra-ui/react"

import { FaCirclePlay } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { CiPause1 } from "react-icons/ci";

function PlayButton({ isStarted, currentTime, handleClick }) {
	return (
		<IconButton
			title="Play or Pause timer"
			colorScheme="blackAlpha"
			icon={
				!isStarted ? <FaCirclePlay />
                : currentTime === 0 ? <GrPowerReset /> : <CiPause1 />
			}
			onClick={handleClick}
		/>
	)
}

export default PlayButton