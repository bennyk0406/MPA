/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
interface PaletteProps {
    selected: boolean
    bgcolor: string
    action: () => void
}

const Palette: React.FC<PaletteProps> = (props) => {
    return (
        <div onClick={props.action} css={css`
            flex-grow: 1;
            aspect-ratio: 1;
            background-color: ${props.bgcolor};
            transition: all 0.3s ease 0s;
            cursor: pointer;
            :hover {
                box-shadow: #dadfe366 0px 4px 8px;
                transform: translateY(-3px);
            }
            ${props.selected
            ? `border: 2px solid black;`
            : `border: 2px solid white;`}
            
        `} />
    )
}

export default Palette