/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

interface ModalProps {
    children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = (props) => {
    return (
        <div css={css`
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #00000088;
            display: flex;
            justify-content: center;
            align-items: center;
        `}>
            {props.children}
        </div>
    )
}

export default Modal