import Button from '@mui/material/Button';
import { CSSProperties, FC, PropsWithChildren } from "react"
import { colors } from '../../data/colors';
import { useMediaQuery, useTheme } from "@mui/material"

interface Props {
	shouldShow: boolean
	onRequestClose: (value: React.SetStateAction<boolean>) => void 
}

const Modal: FC<PropsWithChildren<Props>> = (props) => {

	// Theme mediaquery
	const theme = useTheme();
	const isSmMatch = useMediaQuery(theme.breakpoints.down("sm"));

	return props.shouldShow ? (
		<div style={ModalBackground}>
			<div style={{...ModalBody, width: isSmMatch ? "80%" : "50%"}} onClick={e => e.stopPropagation()}>
                <Button 
                    style={{ backgroundColor: "rgb(255,51,51,0.7)"}}
                    variant="contained"
                    onClick={() => {props.onRequestClose(false)}}
                >
                    Close
                </Button>
                {props.children}
			</div>
		</div>
	) 
	: 
		null;
}

const ModalBackground: CSSProperties = {
	position: "fixed",
	zIndex: 1,
	left: 0,
	top: "55px",
	width: "100%",
	height: "100%",
	overflow: "auto",
	backgroundColor: "rgba(0, 0, 0, 0.5)"
}

const ModalBody: CSSProperties = {

	

	backgroundColor: `${colors.fifth}`,
	margin: "10% auto",
	padding: "20px",
	maxWidth: "475px",
    borderRadius: "10px"
};

export default Modal