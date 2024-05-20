/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Title from "../components/Title"
import Button from "../components/Button"
import Modal from "../components/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurst, faCopy, faRotateRight } from "@fortawesome/free-solid-svg-icons"
import { EventHandler } from "../utils/event"
import { Element, HVDirection } from "./type"
import { EndDiv, MirrorDiv, SplitterDiv, StartDiv } from "./Element"
import { Laser } from "./Laser"

interface IProblemInfo {
    originalMap: Element[][]
    nowMap: Element[][]
    textProblem: string
}

const defaultInfo: IProblemInfo = {
    originalMap: [],
    nowMap: [],
    textProblem: ""
}

const createMap = (textMap: string): Element[][] => {
    const result: Element[][] = []
    const charMap = textMap.split("\n").map((v) => v.split(""))
    for (const charRow of charMap) {
        const row: Element[] = []
        for (const char of charRow) {
            if ("<>v^".includes(char)) {
                row.push({
                    type: "start",
                    direction: {"<": "left", ">": "right", "v": "down", "^": "up"}[char] as "right" | "left" | "up" | "down",
                    laser: []
                })
            }
            else if ("\\/".includes(char)) {
                row.push({
                    type: "splitter",
                    direction: {"\\": "anti", "/": "diagonal"}[char] as "anti" | "diagonal",
                    laser: []
                })
            }
            else if (char === "g") {
                row.push({
                    type: "end",
                    laser: [],
                    detected: false
                })
            }
            else if (char === ".") {
                row.push({
                    type: "empty",
                    laser: []
                })
            }
            else if (char === "X") {
                row.push({
                    type: "block",
                    laser: []
                })
            }
        }
        result.push(row)
    }
    return result
}

const Problem = () => {
    const [searchParams] = useSearchParams()
    const number = searchParams.get("no")

    const [info, setInfo] = useState(defaultInfo)
    const [resetModal, setResetModal] = useState(false)
    const [answer, setAnswer] = useState("")
    const [finished, setFinished] = useState(false)
    const [selectedDir, setSelectedDir] = useState<"diagonal" | "anti">("diagonal")

    useEffect(() => {
        import(`./data/problem_${number}.ts`).then((res) => {
            const textMap = (res.map as string).trim()
            const originalMap = createMap(textMap)
            setInfo({
                textProblem: textMap,
                originalMap,
                nowMap: originalMap
            })
        })
    }, [number])

    useEffect(() => {
        if (info.nowMap.length === 0 || !finished) return
        
        for (let i = 0; i < info.nowMap.length; i++) {
            for (let j = 0; j < info.nowMap[0].length; j++) {
                const element = info.nowMap[i][j]
                if (element.type === "end" && !element.detected) return 
            }
        }
        EventHandler.trigger("notification", "맞았습니다!")
    }, [info, finished])

    const copy = () => {
        navigator.clipboard.writeText(answer).then(() => {
            EventHandler.trigger("notification", "답안이 복사되었습니다!")
        })
    }

    const reset = () => {
        setInfo({
            ...info,
            nowMap: structuredClone(info.originalMap)
        })
        setFinished(false)
        setAnswer("")
    }

    const setMirror = (direction: "diagonal" | "anti", row: number, column: number) => {
        setAnswer((answer) => `${answer}${row} ${column} ${direction === "diagonal" ? "/" : "\\"}\n`)
        setInfo((info) => {
            const newInfo = { ...info }
            newInfo.nowMap[row][column] = {
                type: "mirror",
                direction,
                laser: []
            }
            return newInfo
        })
    }

    const shoot = () => {
        if (finished) return
        const {nowMap} = info
        const visited = nowMap.map(() => new Array(nowMap[0].length).fill(false) as boolean[])
        // find start
        const stack: [number, number, HVDirection][] = []
        for (let i = 0; i < nowMap.length; i++) {
            for (let j = 0; j < nowMap[0].length; j++) {
                const element = nowMap[i][j]
                if (element.type === "start") stack.push([i, j, element.direction])
            }
        }
        
        // traversal
        while (stack.length !== 0) {
            const [originRow, originColumn, originDir] = stack.pop() as [number, number, HVDirection]
            if (visited[originRow][originColumn]) return
            // visited[originRow][originColumn] = true

            let direction: HVDirection = originDir
            const originElement = nowMap[originRow][originColumn]

            if (originElement.type === "splitter") {
                nowMap[originRow][originColumn].laser.push(direction)
                const newRow = originRow + (direction === "up" ? -1 : direction === "down" ? 1 : 0)
                const newColumn = originColumn + (direction === "left" ? -1 : direction === "right" ? 1 : 0)
                if (!(newRow < 0 || newRow >= nowMap.length || newColumn < 0 || newColumn >= nowMap[0].length)) {
                    nowMap[newRow][newColumn].laser.push(direction === "up" ? "down" : direction === "down" ? "up" : direction === "left" ? "right" : "left")
                    stack.push([newRow, newColumn, direction])
                }
                
                if (originElement.direction === "diagonal") {
                    direction = direction === "up" ? "right" : direction === "down" ? "left" : direction === "left" ? "down" : "up"
                }
                else {
                    direction = direction === "up" ? "left" : direction === "down" ? "right" : direction === "left" ? "up" : "down"
                }
                nowMap[originRow][originColumn].laser.push(direction)
                const newRow2 = originRow + (direction === "up" ? -1 : direction === "down" ? 1 : 0)
                const newColumn2 = originColumn + (direction === "left" ? -1 : direction === "right" ? 1 : 0)
                if (newRow2 < 0 || newRow2 >= nowMap.length || newColumn2 < 0 || newColumn2 >= nowMap[0].length) continue
                nowMap[newRow2][newColumn2].laser.push(direction === "up" ? "down" : direction === "down" ? "up" : direction === "left" ? "right" : "left")
                stack.push([newRow2, newColumn2, direction])
            }
            else {
                if (originElement.type === "mirror") {
                    if (originElement.direction === "diagonal") {
                        direction = direction === "up" ? "right" : direction === "down" ? "left" : direction === "left" ? "down" : "up"
                    }
                    else {
                        direction = direction === "up" ? "left" : direction === "down" ? "right" : direction === "left" ? "up" : "down"
                    }
                }
                if (originElement.type === "end") {
                    originElement.detected = true
                    continue
                }
                nowMap[originRow][originColumn].laser.push(direction)
                const newRow = originRow + (direction === "up" ? -1 : direction === "down" ? 1 : 0)
                const newColumn = originColumn + (direction === "left" ? -1 : direction === "right" ? 1 : 0)
                if (newRow < 0 || newRow >= nowMap.length || newColumn < 0 || newColumn >= nowMap[0].length) continue
                nowMap[newRow][newColumn].laser.push(direction === "up" ? "down" : direction === "down" ? "up" : direction === "left" ? "right" : "left")
                stack.push([newRow, newColumn, direction])
            }
        }
        
        setInfo({
            ...info,
            nowMap: structuredClone(nowMap)
        })
        setFinished(true)
    }

    if (info?.nowMap?.length === 0) return <></>

    return (
        <>
            <Title title="#4. 실험실 탈출하기">
                <div css={css`
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    gap: 10px;
                    align-items: center;
                `}>
                    <Button action={() => {
                        navigator.clipboard.writeText(info.textProblem.trim()).then(() => {
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
                                position: relative;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                ${x === info.nowMap[0].length - 1 && "border-right: none;"}
                                ${y === info.nowMap.length - 1 && "border-bottom: none;"}
                                ${v.type === "block" && "background-color: #DDDFE0;"}
                            `} onClick={() => {
                                if (v.type !== "empty") return
                                setMirror(selectedDir, y, x)
                            }}>
                                {v.type === "start" ? <StartDiv info={v} />
                                : v.type === "splitter" ? <SplitterDiv info={v} />
                                : v.type === "end" ? <EndDiv info={v} />
                                : v.type === "mirror" ? <MirrorDiv info={v} /> : <></>}
                                {v.laser.map((v, i) => <Laser key={i} direction={v} /> )}
                            </div>
                        })}
                    </div>

                    <div css={css`
                        display: flex;
                        gap: 30px;
                        margin: 0 auto;
                    `}>
                        <div css={css`
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            position: relative;
                            bottom: 15px;
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
                                Mirrors
                            </div>
                            <div css={css`
                                display: flex;
                                gap: 20px;
                                padding: 25px 20px 20px;
                                box-sizing: border-box;
                                border: 1px solid black;
                            `}>
                                <div
                                    css={css`
                                        height: 50px;
                                        aspect-ratio: 1;
                                        background-color: white;
                                        border-radius: 6px;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        transition: all 0.3s ease 0s;
                                        border: 1px solid #202020;
                                        cursor: pointer;

                                        :hover {
                                            transform: translateY(-3px);
                                        }
                                    `}
                                    onClick={() => setSelectedDir("diagonal")}
                                >
                                    <div
                                        css={css`
                                            height: 8px;
                                            width: 90%;
                                            border-radius: 4px;
                                            transform: rotate(135deg);
                                            background-color: ${selectedDir === "diagonal" ? "#202020;" : "gray"};
                                        `}
                                    />
                                </div>
                                <div
                                    css={css`
                                        height: 50px;
                                        aspect-ratio: 1;
                                        background-color: ${selectedDir === "diagonal" ? "gray" : "blue"};
                                        border-radius: 6px;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        transition: all 0.3s ease 0s;
                                        cursor: pointer;

                                        :hover {
                                            transform: translateY(-3px);
                                        }
                                    `}
                                    onClick={() => setSelectedDir("anti")}
                                >
                                    <div
                                        css={css`
                                            height: 8px;
                                            width: 90%;
                                            border-radius: 4px;
                                            transform: rotate(45deg);
                                            background-color: white;
                                        `}
                                    />
                                </div>
                            </div>
                        </div>
                        <div css={css`
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            gap: 20px;
                        `}>
                            <Button width={50} height={50} action={shoot}>
                                <FontAwesomeIcon icon={faBurst} />
                            </Button>
                            <Button width={50} height={50} action={() => setResetModal(true)}>
                                <FontAwesomeIcon icon={faRotateRight} />
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
                            {answer.trim()}
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