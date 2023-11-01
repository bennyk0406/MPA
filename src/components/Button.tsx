/** @jsxImportSource @emotion/react */
import { SerializedStyles } from "@emotion/react/macro"
import { css } from "@emotion/react"

interface ButtonProps {
    width?: number
    height?: number
    children?: React.ReactNode
    style?: SerializedStyles
    action?: () => void
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <div css={css`
            background-color: #dddfe0;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: ${props.width}px;
            height: ${props.height}px;
            border-radius: 5px;
            
            ${props.disabled
            ? `background: #ececec;
            color: #ffffff;` 
            : `transition: all 0.3s ease 0s;
            cursor: pointer;
            :hover {
                background-color: #dadfe3;
                box-shadow: #dadfe366 0px 4px 8px;
                transform: translateY(-3px);
            }`};
            ${props.style}
        `} onClick={props.action}>
            {props.children}
        </div>
    )
}

export default Button