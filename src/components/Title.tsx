/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

interface TitleProps {
    title: string
    children?: React.ReactNode
    lobby?: boolean
}

const Title: React.FC<TitleProps> = (props) => {
    const navigate = useNavigate()

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            width: 100%;
            border-bottom: 1px solid gray;
            padding-bottom: 20px;
        `}>
            <div css={css`
                display: flex;
                gap: 5px;
                align-items: center;
            `}>
                { props.lobby || <FontAwesomeIcon icon={faAngleLeft} style={{color: "#808080"}} /> }
                <div css={css`color: gray;`} onClick={() => navigate("/")}>2024-1 문풀안</div>
            </div>
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
