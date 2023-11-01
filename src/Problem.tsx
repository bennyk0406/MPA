/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretLeft, faCaretRight, faCaretUp, faPerson, faRotateRight } from "@fortawesome/free-solid-svg-icons"
import { css } from "@emotion/react"
import { useEffect, useRef, useState } from "react"
import Noodle from "./assets/noodle.svg"
import Button from "./components/Button"
import { useSearchParams } from "react-router-dom"
import { MapData } from "./interface/mapData"

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
    
    const [personPos, setPersonPos] = useState<number[]>([0, 0])
    const [noodlePos, setNoodlePos] = useState<number[]>([0, 0])
    const [path, setPath] = useState("")
    const [finished, setFinished] = useState(false)
    const [walls, setWalls] = useState<number[]>([])
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [wall, setWall] = useState<boolean[][]>([])
    
    const div = useRef<HTMLDivElement>(null)

    useEffect(() => {
        import(`./data/problem_${number}.ts`).then((res) => {
            setMapData(res.default)
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
        if (y === goalY && x === goalX) setFinished(true)
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
        navigator.clipboard.writeText(path)
            .then(() => alert("이동 경로가 클립보드에 복사되었습니다!"))
    }

    if (mapData.width === 0) return <></>

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
                <div css={css`color: gray; font-size: 18px;`}>Problem {number}.</div>
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
            `} ref={div} tabIndex={0} onKeyDown={keyDown}>
                <div>
                    <div css={css`
                        display: grid;
                        grid-template-columns: repeat(${width}, 1fr);
                        grid-template-rows: repeat(${height}, 1fr);
                        gap: 5px;
                        aspect-ratio: 1;
                        width: 70vw;
                        max-width: 400px;
                    `}>
                        {walls.map((v, i) => {
                            const y = Math.floor(v / width);
                            const x = v % width;
                            return (
                                <div css={css`
                                    grid-column-start: ${y + 1};
                                    grid-column-end: ${y + 2};
                                    grid-row-start: ${x + 1};
                                    grid-row-end: ${x + 2};
                                    background-color: #385170;
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
                        <Button width={50} height={50} action={reset}>
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
                            color: #8a8f95;
                            font-size: 18px;
                        `}>
                            Answer
                        </div>
                        <div css={css`
                            text-align: center;
                            padding: 10px;
                            width: 100%;
                            min-height: 100px;
                            box-sizing: border-box;
                            word-wrap: break-word;
                            font-size: 20px;
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
        </>
    )
}

export default Problem
