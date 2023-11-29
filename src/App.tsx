import { BrowserRouter, Route, Routes } from "react-router-dom"
import Lobby from "./Lobby"
import Home from "./Home"
import { default as RamenProblem } from "./1_Ramen/Problem"
import { default as PaintProblem } from "./2_Paint/Problem"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Lobby />} />
                    <Route path="/ramen" element={<Home title="#1. 라면 밀기" probNum={5} />} />
                    <Route path="/paint" element={<Home title="#2. 강의실 도색하기" probNum={6} />} />
                    <Route path="/ramen/problem" element={<RamenProblem />} />
                    <Route path="/paint/problem" element={<PaintProblem />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App