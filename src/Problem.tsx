/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretLeft, faCaretRight, faCaretUp, faPerson, faRotateRight } from "@fortawesome/free-solid-svg-icons"
import { faCopy } from "@fortawesome/free-regular-svg-icons"
import { css } from "@emotion/react"
import { useEffect, useRef, useState } from "react"
import Noodle from "./assets/noodle.svg"
import Button from "./components/Button"
import { useSearchParams } from "react-router-dom"
import { MapData } from "./interface/mapData"
import Modal from "./components/Modal"
import Notification from "./components/Notification"

const Problem = () => {
    const [searchParams] = useSearchParams()
    const number = searchParams.get("no")
    if (number === null) return <></>
    const [mapData, setMapData] = useState<MapData>({
        width: 0,
        height: 0,
        wall: [],
        goal: [],
        rock: [],
        position: []
    })
    
    const [problem, setProblem] = useState("")
    const [personPos, setPersonPos] = useState<number[]>([0, 0])
    const [noodlePos, setNoodlePos] = useState<number[]>([0, 0])
    const [path, setPath] = useState("")
    const [finished, setFinished] = useState(false)
    const [walls, setWalls] = useState<number[]>([])
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [wall, setWall] = useState<boolean[][]>([])
    const [resetModal, setResetModal] = useState(false)
    const [notification, setNotification] = useState<string>();
    
    const div = useRef<HTMLDivElement>(null)

    useEffect(() => {
        import(`./data/problem_${number}.ts`).then((res) => {
            const data = res.default as MapData
            setMapData(data)
            const modifiedWall: string[][] = data.wall.map((L) => L.map((v) => v ? "1" : "0"))
            for (let dy = 0; dy < 2; dy++) {
                for (let dx = 0; dx < 2; dx++) {
                    modifiedWall[data.rock[0] + dy][data.rock[1] + dx] = "-"
                }
            }
            for (let dy = 0; dy < 2; dy++) {
                for (let dx = 0; dx < 2; dx++) {
                    modifiedWall[data.goal[0] + dy][data.goal[1] + dx] = "*"    
                }
            }
            modifiedWall[data.position[0]][data.position[1]] = "@"
            setProblem(modifiedWall.map((v) => v.join("")).join("\n"))
        })  
    }, [])

    useEffect(() => {
        if (mapData === undefined) return
        setPersonPos(mapData.position)
        setNoodlePos(mapData.rock)
        
        const { width, height, wall } = mapData
        const walls: number[] = []
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (wall[i][j]) walls.push(width * i + j);
            }
        }
        setWalls(walls)
        setWidth(width)
        setHeight(height)
        setWall(wall)
    }, [mapData])

    useEffect(() => {
        if (div.current === null) return
        div.current.focus()
    })

    useEffect(() => {
        if (noodlePos.length === 0) return
        const [y, x] = noodlePos
        const [goalY, goalX] = mapData.goal
        setFinished(y === goalY && x === goalX)
    }, [noodlePos])

    const moveNoodle = (direction: "left" | "right" | "up" | "down") => {
        let [y, x] = noodlePos
        if (direction === "left") x--
        else if (direction === "right") x++
        else if (direction === "up") y--
        else y++
        if (x < 0 || x + 1 >= width || y < 0 || y + 1 >= height || wall[y][x] || wall[y][x + 1] || wall[y + 1][x] || wall[y + 1][x + 1] ) return false
        
        setNoodlePos([y, x])
        return true
    }

    const move = (direction: "left" | "right" | "up" | "down") => {
        let [y, x] = personPos
        if (direction === "left") x--
        else if (direction === "right") x++
        else if (direction === "up") y--
        else y++
        if (x < 0 || x >= width || y < 0 || y >= height || wall[y][x]) return
        let [noodleY, noodleX] = noodlePos
        if ([0, 1].includes(y - noodleY) && [0, 1].includes(x - noodleX)) {
            const res = moveNoodle(direction)
            if (!res) return
        }
        setPersonPos([y, x])
        setPath(path + direction[0].toUpperCase())
    }

    const reset = () => {
        setPersonPos(mapData.position)
        setNoodlePos(mapData.rock)
        setPath("")
        setFinished(false)
    }

    const keyDown = (e: React.KeyboardEvent<Element>) => {
        if (e.key === "ArrowLeft") move("left")
        else if (e.key === "ArrowRight") move("right")
        else if (e.key === "ArrowUp") move("up")
        else if (e.key === "ArrowDown") move("down")
    }

    const copy = () => {
        navigator.clipboard.writeText(path).then(() => {
            setNotification("이동 경로가 복사되었습니다!")
            setTimeout(() => {
                setNotification(undefined)
            }, 3000)
        })
    }

    if (mapData.width === 0) return <></>

    return (
        <div ref={div} tabIndex={0} onKeyDown={keyDown}>
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
                <div css={css`
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    gap: 10px;
                    align-items: center;
                `}>
                    <Button action={() => {
                        navigator.clipboard.writeText(problem).then(() => {
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
            </div>
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
                <div>
                    <div css={css`
                        display: grid;
                        grid-template-columns: repeat(${width}, 1fr);
                        grid-template-rows: repeat(${height}, 1fr);
                        gap: ${(width >= 15 || height >= 15) ? 3 : 5}px;
                        width: 70vw;
                        max-width: 400px;
                    `}>
                        {walls.map((v, i) => {
                            const y = Math.floor(v / width);
                            const x = v % width;
                            return (
                                <div css={css`
                                    grid-column-start: ${x + 1};
                                    grid-column-end: ${x + 2};
                                    grid-row-start: ${y + 1};
                                    grid-row-end: ${y + 2};
                                    background-color: #385170;
                                    aspect-ratio: 1;
                                `} key={i} />
                            )
                        })}
                        <div css={css`
                            background-color: #FFCCCC;
                            grid-column-start: ${mapData.goal[1] + 1};
                            grid-column-end: ${mapData.goal[1] + 3};
                            grid-row-start: ${mapData.goal[0] + 1};
                            grid-row-end: ${mapData.goal[0] + 3};
                        `} />
                        <FontAwesomeIcon icon={faPerson} css={css`
                            height: 90% !important;
                            width: 90%;
                            aspect-ratio: 1;
                            grid-column-start: ${personPos[1] + 1};
                            grid-column-end: ${personPos[1] + 2};
                            grid-row-start: ${personPos[0] + 1};
                            grid-row-end: ${personPos[0] + 2};
                        `}/>
                        <img src={Noodle} css={css`
                            margin: auto;
                            width: 90%;
                            height: 90%;
                            grid-column-start: ${noodlePos[1] + 1};
                            grid-column-end: ${noodlePos[1] + 3};
                            grid-row-start: ${noodlePos[0] + 1};
                            grid-row-end: ${noodlePos[0] + 3};
                        `}/>
                    </div>
                    <div css={css`
                        display: flex;
                        width: 100%;
                        justify-content: center;
                        align-items: center;
                        gap: 30px;
                        margin-top: 30px;
                    `}>
                        <div css={css`
                            gap: 10px;
                            display: grid;
                            grid-template-columns: repeat(4, 1fr);
                            grid-template-rows: repeat(2, 1fr);
                            width: 200px;
                            aspect-ratio: 2;
                        `}>
                            <Button style={css`
                                grid-column: 2/4;
                                grid-row: 1/2;
                            `} action={() => move("up")}>
                                <FontAwesomeIcon icon={faCaretUp} />
                            </Button>
                            <Button style={css`
                                grid-column: 2/4;
                                grid-row: 2/3;
                            `} action={() => move("down")}>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </Button>
                            <Button style={css`
                                grid-column: 1/2;
                                grid-row: 1/3;
                            `} action={() => move("left")}>
                                <FontAwesomeIcon icon={faCaretLeft} />
                            </Button>
                            <Button style={css`
                                grid-column: 4/5;
                                grid-row: 1/3;
                            `} action={() => move("right")}>
                                <FontAwesomeIcon icon={faCaretRight} />
                            </Button>
                        </div>
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
                            text-align: center;
                            padding: 10px 0 0;
                            font-size: 18px;
                        `}>
                            Answer
                        </div>
                        <div css={css`
                            text-align: center;
                            padding: 10px;
                            width: 100%;
                            min-height: 100px;
                            max-height: 300px;
                            overflow-y: scroll;
                            box-sizing: border-box;
                            word-wrap: break-word;
                            font-size: 16px;
                        `}>
                            {path}
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
        </div>
    )
}

export default Problem
