/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Title from "../components/Title"
import Button from "../components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy, faRotateRight } from "@fortawesome/free-solid-svg-icons"
import Modal from "../components/Modal"
import Fire from "../assets/flame.svg"
import { EventHandler } from "../utils/event"

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
                problem: (res.map as string[][])
                .map((v) => 
                    v
                        .map((v_) => ({"": ".", "fire": "1", "wall": "#"}[v_]))
                        .join("")
                ).join("\n"),
                nowMap: res.map as string[][],
                map: res.map as string[][],
                off
            })
        })
    }, [number])

    useEffect(() => {
        if (info.nowMap.length === 0 || finished) return
        if (info.nowMap.flat().filter((v) => v === "fire").length !== 0) return
        
        setFinished(true)
        EventHandler.trigger("notification", "맞았습니다!")
    }, [info, finished])

    const copy = () => {
        navigator.clipboard.writeText(answer).then(() => {
            EventHandler.trigger("notification", "답안이 복사되었습니다!")
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
        setAnswer("")
    }

    useEffect(() => {
        if (info.off.some((v) => v.some((v_) => v_))) {
            setTimeout(() => {
                const off: boolean[][] = []
                for (let i = 0; i < info.map.length; i++) {
                    off.push(new Array(info.map[0].length).fill(false))
                }
        
                setInfo({...info, off})
            }, 500)
        }
    }, [info])

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
                            EventHandler.trigger("notification", "문제가 복사되었습니다!")
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
                    `}>
                        {info.nowMap.flat().map((v, i) => {
                            const x = i % info.nowMap[0].length
                            const y = Math.floor(i / info.nowMap[0].length)
                            return <div key={i} css={css`
                                width: 100%;
                                box-sizing: border-box;
                                border-right: 1px dashed black;
                                border-bottom: 1px dashed black;
                                aspect-ratio: 1;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                ${x === info.nowMap[0].length - 1 && "border-right: none;"}
                                ${y === info.nowMap.length - 1 && "border-bottom: none;"}
                            `}>
                                {v === "fire" || info.map[y][x] === "fire"
                                ? <div
                                    css={css`
                                        width: 100%;
                                        height: 100%;
                                        border-radius: 0;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        position: relative;
                                    `}
                                >
                                    {<img src={Fire} css={css`width: 60%; ${v !== "fire" && "filter: grayscale(100%);"}`} />}
                                    {
                                        info.off[y][x] &&
                                        <div css={css`
                                            width: 100%;
                                            height: 100%;
                                            position: absolute;
                                            background-color: #3E95FF80;

                                            :hover {
                                                ${info.off[y][x] && "background-color:#3177CC80;"}
                                            }
                                        `} />
                                    }
                                </div>
                                : v === "wall"
                                ? <div css={css`background-color: gray; width: 100%; height: 100%;`}/>
                                : <Button
                                    action={() => tint(x, y)}
                                    style={css`
                                        border-radius: 0px;
                                        width: 100%;
                                        height: 100%;
                                        background-color: ${info.off[y][x] ? "#3e95ff80" : "#F5F6F7"};

                                        :hover {
                                            ${info.off[y][x] && "background-color:#3177CC80;"}
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
                
                        <div css={css`
                            display: flex;
                            gap: 10px;
                        `}>
                            <Button
                                height={50}
                                width={50}
                                action={() => setMode("horizontal")}
                                style={css`
                                    font-size: 20px;
                                    font-weight: 600;
                                    color: ${mode === "horizontal" ? "black" : "gray"};
                                    box-shadow: ${mode === "horizontal" && "inset 4px 4px 8px 0px #B1B2B3"};

                                    :hover {
                                        box-shadow: ${mode === "horizontal" && "inset 4px 4px 8px 0px #B1B2B3"};
                                    }
                                `}
                            >
                                H
                            </Button>
                            <Button
                                height={50}
                                width={50}
                                action={() => setMode("vertical")}
                                style={css`
                                    font-size: 20px;
                                    font-weight: 600;
                                    color: ${mode === "vertical" ? "black" : "gray"};
                                    box-shadow: ${mode === "vertical" && "inset 4px 4px 8px 0px #B1B2B3"};

                                    :hover {
                                        box-shadow: ${mode === "vertical" && "inset 4px 4px 8px 0px #B1B2B3"};
                                    }
                                `}
                            >
                                V
                            </Button>
                        </div>
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
        </>
    )
}

export default Problem