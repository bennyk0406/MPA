import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NotiContainer } from "./components/Notification"
import { default as RamenProblem } from "./1_Ramen/Problem"
import { default as PaintProblem } from "./2_Paint/Problem"
import { default as FireProblem } from "./3_Fire/Problem"
import { default as LaserProblem } from "./4_Laser/Problem"
import Lobby from "./Lobby"
import Home from "./Home"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <NotiContainer />
                <Routes>
                    <Route path="/" element={<Lobby />} />
                    <Route path="/ramen" element={<Home title="#1. 라면 밀기" probNum={5} />} />
                    <Route path="/paint" element={<Home title="#2. 강의실 바닥 꾸미기" probNum={5} />} />
                    <Route path="/fire" element={<Home title="#3. 실험실 불 끄기" probNum={5} />} />
                    <Route path="/laser" element={<Home title="#4. 실험실 탈출하기" probNum={5} />} />
                    <Route path="/ramen/problem" element={<RamenProblem />} />
                    <Route path="/paint/problem" element={<PaintProblem />} />
                    <Route path="/fire/problem" element={<FireProblem />} />
                    <Route path="/laser/problem" element={<LaserProblem />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App