/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import Title from "../components/Title"
import Button from "../components/Button"

const Home = () => {
    const navigate = useNavigate()

    return (
        <>
            <Title title="#2. 페인트 칠하기" />
            <div css={css`
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `}>
                {new Array(5).fill(null).map((_, i) => (
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