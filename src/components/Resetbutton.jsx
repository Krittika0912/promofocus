import { IconButton } from "@chakra-ui/react"
import { GrPowerReset } from "react-icons/gr";


export default function ResetButton({ handleOnClick }) {
	return (
		<IconButton
			title="Reset timer"
			icon={<GrPowerReset />}
			colorScheme="blackAlpha"
			onClick={handleOnClick}
		/>
	)
}