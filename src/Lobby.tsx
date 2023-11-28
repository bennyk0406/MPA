/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Button from "./components/Button"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import Title from "./components/Title"

const subject = [
    {
        name: "#1. 라면 밀기",
        href: "./ramen"
    },
    {
        name: "#2. 페인트 칠하기",
        href: "./paint"
    }
]

const Lobby = () => {
    const navigate = useNavigate()

    return (
        <>
            <Title title="역대 문풀안 문제 보기"/>
            <div css={css`
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `}>
                {subject.map((v, i) => (
                    <Button style={css`
                        max-width: 70vw;
                        padding: 15px 0;
                        width: 300px;
                    `} action={() => navigate(v.href)} key={i}>
                        <FontAwesomeIcon icon={faPlay} css={css`margin-right: 7px;`}/>
                        {v.name}
                    </Button>
                ))}
            </div>
        </>
    )
}

export default Lobby