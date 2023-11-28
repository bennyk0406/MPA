/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useNavigate } from "react-router-dom"

interface TitleProps {
    title: string
    children?: React.ReactNode
}

const Title: React.FC<TitleProps> = (props) => {
    const navigate = useNavigate()

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
            text-align: center;
            width: 100%;
            border-bottom: 1px solid gray;
            padding-bottom: 20px;
        `}>
            <div css={css`color: gray;`} onClick={() => navigate("/")}>2023-2 문풀안</div>
            <div css={css`
                font-weight: 800;
                font-size: 32px;
            `}>
                {props.title}
            </div>
            {props.children}
        </div>
    )
}

export default Title