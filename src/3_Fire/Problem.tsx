/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Title from "../components/Title"
import Button from "../components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy, faRotateRight } from "@fortawesome/free-solid-svg-icons"
import Modal from "../components/Modal"
import Notification from "../components/Notification"
import Fire from "../assets/flame.svg"

interface IProblemInfo {
    map: string[][]
    nowMap: string[][]
    problem: string
    off: boolean[][]
}

type Mode = "horizontal" | "vertical"

const defaultInfo: IProblemInfo = {
    map: [],
    nowMap: [],
    problem: "",
    off: []
}

const Problem = () => {
    const [searchParams] = useSearchParams()
    const number = searchParams.get("no")

    const [info, setInfo] = useState(defaultInfo)
    const [notification, setNotification] = useState<string | undefined>()
    const [resetModal, setResetModal] = useState(false)
    const [answer, setAnswer] = useState("")
    const [finished, setFinished] = useState(false)
    const [mode, setMode] = useState<Mode>("horizontal")

    useEffect(() => {
        import(`./data/problem_${number}.ts`).then((res) => {
            const off = []
            for (let i = 0; i < res.map.length; i++) {
                off.push(new Array(res.map[0].length).fill(false))
            }
            setInfo({
                problem: "",
                nowMap: res.map as string[][],
                map: res.map as string[][],
                off
            })
        })
    }, [])

    useEffect(() => {
        if (info.nowMap.length === 0) return
        if (info.nowMap.flat().filter((v) => v === "fire").length !== 0) return
        
        setFinished(true)
        setNotification("맞았습니다!")
        setTimeout(() => {
            setNotification(undefined)
        }, 3000)
    }, [info])

    const copy = () => {
        navigator.clipboard.writeText(answer).then(() => {
            setNotification("답안이 복사되었습니다!")
            setTimeout(() => {
                setNotification(undefined)
            }, 3000)
        })
    }

    const reset = () => {
        const off = []
        for (let i = 0; i < info.map.length; i++) {
            off.push(new Array(info.map[0].length).fill(false))
        }

        setInfo({
            ...info,
            nowMap: structuredClone(info.map),
            off
        })
        setFinished(false)
    }

    const tint = (x: number, y: number) => {
        if (info.nowMap[y][x] === "fire") return
        
        const off = []
        for (let i = 0; i < info.map.length; i++) {
            off.push(new Array(info.map[0].length).fill(false))
        }

        const copiedNowMap = structuredClone(info.nowMap)

        if (mode === "horizontal") {
            for (let i = x; i >= 0; i--) {
                if (copiedNowMap[y][i] === "wall") break
                off[y][i] = true
                copiedNowMap[y][i] = ""
            }
            for (let i = x; i < info.map[0].length; i++) {
                if (copiedNowMap[y][i] === "wall") break
                off[y][i] = true
                copiedNowMap[y][i] = ""
            }
        }

        if (mode === "vertical") {
            for (let i = y; i >= 0; i--) {
                if (copiedNowMap[i][x] === "wall") break
                off[i][x] = true
                copiedNowMap[i][x] = ""
            }
            for (let i = y; i < info.map.length; i++) {
                if (copiedNowMap[i][x] === "wall") break
                off[i][x] = true
                copiedNowMap[i][x] = ""
            }
        }
        setInfo({...info, nowMap: copiedNowMap, off})
        setAnswer(answer + `${mode[0].toUpperCase()} ${x + 1} ${y + 1}\n`)
    }

    if (info?.map?.length === 0) return <></>

    return (
        <>
            <Title title="#3. 실험실 불 끄기">
                <div css={css`
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    gap: 10px;
                    align-items: center;
                `}>
                    <Button action={() => {
                        navigator.clipboard.writeText(info.problem).then(() => {
                            setNotification("문제가 복사되었습니다!")
                            setTimeout(() => {
                                setNotification(undefined)
                            }, 3000)
                        })
                    }} width={25} height={25}>
                        <FontAwesomeIcon icon={faCopy} />
                    </Button>
                    <div css={css`color: gray; font-size: 18px;`}>Problem {number}.</div>
                </div>
            </Title>
            <div css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                gap: 50px;
                padding: 30px 0;
                width: 100%;
                flex-wrap: wrap;
                max-width: 1200px;
            `}>
                <div css={css`
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                `}>
                    <div css={css`
                        display: grid;
                        grid-template-columns: repeat(${info.nowMap[0].length}, 1fr);
                        grid-template-rows: repeat(${info.nowMap.length}, 1fr);
                        
                        width: 80vw;
                        max-width: 400px;
                        border: 1px solid black;
                        aspect-ratio: 1;
                    `}>
                        {info.nowMap.flat().map((v, i) => {
                            const x = i % info.nowMap[0].length
                            const y = Math.floor(i / info.nowMap[0].length)
                            return <div key={i} css={css`
                                width: 100%;
                                box-sizing: border-box;
                                border-right: 1px dashed black;
                                border-bottom: 1px dashed black;
                                ${x === info.nowMap[0].length - 1 && 'border-right: none;'}
                                ${y === info.nowMap.length - 1 && 'border-bottom: none;'}
                            `}>
                                {v === "fire" || info.map[y][x] === "fire"
                                ? <div
                                    css={css`
                                        width: 100%;
                                        aspect-ratio: 1;
                                        border-radius: 0;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        background-color: ${info.off[y][x] ? "#3e95ff" : v !== "fire" ? "#FF4F3D" : "transparent"};

                                        :hover {
                                            ${info.off[y][x] && "background-color: #3177CC;"}
                                        }
                                    `}
                                >
                                    {v === "fire" && <img src={Fire} css={css`height: 80%;`} />}
                                </div>
                                : v === "wall"
                                ? <div css={css`background-color: gray; height: 100%;`}/>
                                : <Button
                                    action={() => tint(x, y)}
                                    style={css`
                                        border-radius: 0px;
                                        height: 100%;
                                        background-color: ${info.off[y][x] ? "#3e95ff" : "#F5F6F7"};

                                        :hover {
                                            ${info.off[y][x] && "background-color: #3177CC;"}
                                        }
                                    `}
                                />
                                }
                            </div>
                        })}
                    </div>
                    <div css={css`
                        display: flex;
                        width: 100%;
                        justify-content: center;
                        align-items: center;
                        gap: 30px;
                    `}>
                        <Button width={50} height={50} action={() => setResetModal(true)}>
                            <FontAwesomeIcon icon={faRotateRight} />
                        </Button>
                
                        <Button height={50} action={() => setMode(mode === "horizontal" ? "vertical" : "horizontal") } style={css`padding: 0 20px;`}>
                            {
                                mode === "horizontal"
                                ? <>
                                    <span css={css`font-size: 20px; font-weight: 600;`}>H</span>
                                    <span css={css`white-space: pre;`}>{" / V"}</span>
                                </>
                                : <>    
                                    <span css={css`white-space: pre;`}>{"H / "}</span>
                                    <span css={css`font-size: 20px; font-weight: 600;`}>V</span>
                                </>
                            }
                        </Button>
                    </div>
                </div>
                <div>
                    <div css={css`
                        width: 70vw;
                        max-width: 400px;
                        background-color: #f5f6f7;
                        border-radius: 10px;
                        text-align: center;
                    `}>
                        <div css={css`
                            padding: 10px 0;
                            font-size: 18px;
                            border-bottom: 1px dashed gray;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        `}>
                            Answer
                        </div>
                        <div css={css`
                            text-align: center;
                            padding: 10px;
                            width: 100%;
                            min-height: 100px;
                            max-height: 150px;
                            overflow-y: scroll;
                            box-sizing: border-box;
                            word-wrap: break-word;
                            font-size: 16px;
                            white-space: pre-wrap;
                        `}>
                            {answer}
                        </div>
                    </div>
                    <Button width={70} style={css`
                        padding: 15px;
                        margin: 20px auto;
                    `} action={finished ? copy : () => {}} disabled={!finished}>
                        COPY
                    </Button>
                </div>
            </div>
            { resetModal
            ? <Modal>
                <div css={css`
                    width: 400px;
                    max-width: 90vw;
                    height: 200px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: 10px 0;
                `}>
                    <div css={css`
                        text-align: center;
                        font-size: 20px;
                        padding-top: 10px;
                    `}>
                        정말로 리셋하시겠습니까?
                    </div>
                    <div css={css`
                        display: flex;
                        gap: 50px;
                        justify-content: center;
                    `}>
                        <Button width={100} height={50} style={css`
                            background-color: #17ce3a;
                            color: #ffffff;
                            :hover {
                                background-color: #12a02d;
                                box-shadow: #12a02d66 0px 4px 8px;
                            }
                        `} action={() => {
                            setResetModal(false)
                            reset()
                        }}>
                            OK
                        </Button>
                        <Button width={100} height={50} action={() => setResetModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
            : <></>}
            <Notification content={notification} />
        </>
    )
}

export default Problem