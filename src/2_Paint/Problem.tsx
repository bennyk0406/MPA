/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateRight } from "@fortawesome/free-solid-svg-icons"
import { faCopy } from "@fortawesome/free-regular-svg-icons"
import Button from "../components/Button"
import Modal from "../components/Modal"
import Title from "../components/Title"
import Palette from "./Palette"
import { EventHandler } from "../utils/event"


const Problem = () => {
    const [searchParams] = useSearchParams()
    const [problem, setProblem] = useState("")
    const [answer, setAnswer] = useState("")
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [finished, setFinished] = useState(false)
    const [map, setMap] = useState<string[][]>([])
    const [rawMap, setRawMap] = useState<string[][]>([])
    const [colors, setColors] = useState<string[]>([])
    const [modifiedMap, setModifiedMap] = useState<string[]>([])
    const [resetModal, setResetModal] = useState(false)
    const [selected, setSelected] = useState("")
    
    const number = searchParams.get("no")

    useEffect(() => {
        import(`./data/problem_${number}.ts`).then((res) => {
            setColors(res.colors as string[])
            setWidth(res.map[0].length)
            setHeight(res.map.length)
            setMap(() => {
                const newMap: string[][] = []
                for (let i = 0; i < res.map.length; i++) {
                    newMap.push(new Array(res.map[0].length).fill(""))
                }
                return newMap
            })
            setRawMap(res.map)
            setModifiedMap(res.map.flat())
            let problem = `${res.map.length} ${res.map[0].length}`
            for (let i = 0; i < res.map.length; i++) {
                problem += "\n"
                problem += res.map[i].map((color: string) => res.colors.indexOf(color) + 1).join(" ")
            }
            setProblem(problem)
        })  
    }, [number])

    useEffect(() => {
        if (rawMap.length === 0) return
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (rawMap[i][j] !== "" && map[i][j] !== rawMap[i][j]) return
            }
        }
        setFinished(true)
        EventHandler.trigger("notification", "맞았습니다!")
    }, [map, height, rawMap, width])

    const tint = (direction: "H" | "V", index: number) => {
        if (selected === "") return
        if (direction === "H") {
            setMap((map) => {
                const newMap = [...map]
                newMap[index] = new Array(width).fill(selected)
                return newMap
            })
        }
        else {
            setMap((map) => {
                const newMap = [...map]
                for (let i = 0; i < height; i++) newMap[i][index] = selected
                return newMap
            })
        }
        setAnswer(`${answer}\n${direction} ${index + 1} ${colors.indexOf(selected) + 1}`.trim())
    }

    const reset = () => {
        setMap(() => {
            const newMap: string[][] = []
            for (let i = 0; i < height; i++) {
                newMap.push(new Array(width).fill(""))
            }
            return newMap
        })
        setAnswer("")
        setFinished(false)
    }

    const copy = () => {
        navigator.clipboard.writeText(answer).then(() => {
            EventHandler.trigger("notification", "답안이 복사되었습니다!")
        })
    }

    if (width === 0) return <></>

    return (
        <>
            <Title title="#2. 강의실 바닥 꾸미기">
                <div css={css`
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    gap: 10px;
                    align-items: center;
                `}>
                    <Button action={() => {
                        navigator.clipboard.writeText(problem).then(() => {
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
                        grid-template-columns: 25px repeat(${width}, 1fr);
                        grid-template-rows: 25px repeat(${height}, 1fr);
                        gap: 3px;
                        width: 80vw;
                        max-width: 400px;
                    `}>
                        {modifiedMap.map((v, i) => {
                            const y = Math.floor(i / width);
                            const x = i % width;
                            return (
                                <div css={css`
                                    grid-column: ${x + 2}/${x + 3};
                                    grid-row: ${y + 2}/${y + 3};
                                    border: 1px solid black;
                                    aspect-ratio: 1;
                                    display: flex;
                                    justify-content: end;
                                    align-items: end;
                                    background-color: ${map[y][x]};
                                `} key={i}>
                                    {v === "" || <div css={css`
                                        width: 30%;
                                        height: 30%;
                                        border-top: 1px solid black;
                                        border-left: 1px solid black;
                                        background-color: ${v}
                                    `} />}
                                </div>
                            )
                        })}
                        {new Array(width).fill(null).map((_, i) => {
                            return (
                                <Button style={css`
                                    grid-column: ${i + 2}/${i + 3};
                                    grid-row: 1/2;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    background-color: #f5f6f7;
                                `} action={() => tint("V", i)} key={i}>
                                    {i + 1}
                                </Button>
                            )
                        })}
                        {new Array(height).fill(null).map((_, i) => {
                            return (
                                <Button style={css`
                                    grid-row: ${i + 2}/${i + 3};
                                    grid-column: 1/2;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    background-color: #f5f6f7;
                                `} action={() => tint("H", i)} key={i}>
                                    {i + 1}
                                </Button>
                            )
                        })}
                    </div>
                    <div css={css`
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    `}>
                        <div css={css`
                            text-align: center;
                            font-size: 18px;
                            background-color: white;
                            position: relative;
                            top: 15px;
                            width: 80px;
                            height: 30px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        `}>
                            Palette
                        </div>
                        <div css={css`
                            display: flex;
                            gap: 7px;
                            width: 90%;
                            padding: 20px 10px 10px;
                            box-sizing: border-box;
                            border: 1px solid black;
                        `}>
                            {colors.map((color, i) => {
                                return (
                                    <Palette selected={selected === color} bgcolor={color} action={() => setSelected(color)} key={i} />
                                )
                            })}
                        </div>
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
