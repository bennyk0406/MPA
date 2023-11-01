/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Button from "./components/Button"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()

    return (
        <>
            <div css={css`
                display: flex;
                flex-direction: column;
                gap: 10px;
                text-align: center;
                width: 100%;
                border-bottom: 1px solid gray;
                padding-bottom: 20px;
            `}>
                <div css={css`color: gray;`}>2023-2 문풀안</div>
                <div css={css`
                    font-weight: 800;
                    font-size: 32px;
                `}>
                    #1. 라면 밀기
                </div>
            </div>
            <div css={css`
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `}>
                {new Array(10).fill(null).map((_, i) => (
                <Button style={css`
                    max-width: 70vw;
                    padding: 15px 0;
                    width: 300px;
                `} action={() => navigate(`./problem?no=${i+1}`)} key={i}>
                    <FontAwesomeIcon icon={faPlay} css={css`margin-right: 7px;`}/>
                    문제 {i + 1}
                </Button>
            ))}
            </div>
        </>
    )
}

export default Home