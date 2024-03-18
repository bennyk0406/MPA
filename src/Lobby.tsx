/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Button from "./components/Button"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import Title from "./components/Title"

const now = {
    name: "#3. 실험실 불 끄기",
    href: "./fire"
}

const subject = [
    {
        name: "#1. 라면 밀기",
        href: "./ramen"
    },
    {
        name: "#2. 강의실 바닥 꾸미기",
        href: "./paint"
    }
]

const Lobby = () => {
    const navigate = useNavigate()

    return (
        <>
            <Title title="역대 문풀안 문제 보기" lobby />
            <div css={css`
                box-sizing: border-box;
                max-width: 100%;
                padding: 25px 40px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                align-items: center;
                border-bottom: 1px gray dashed;
            `}>
                <div css={css`
                    font-size: 18px;
                    padding-bottom: 5px;
                `}>
                    현재 진행 중인 문제
                </div>
                <Button style={css`
                    max-width: 70vw;
                    padding: 15px 0;
                    width: 300px;
                `} action={() => navigate(now.href)}>
                    <FontAwesomeIcon icon={faPlay} css={css`margin-right: 7px;`}/>
                    {now.name}
                </Button>
            </div>
            <div css={css`
                padding: 25px 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            `}>
                <div css={css`
                    font-size: 18px;
                    padding-bottom: 5px;
                `}>
                    과거 진행했던 문제
                </div>
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