const T = true
const F = false

export default {
    width: 20,
    height: 20,
    wall: [
        [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
        [T, T, F, F, F, F, T, F, F, T, F, F, F, F, F, F, F, F, T, T],
        [T, F, F, F, F, F, F, F, F, T, F, F, F, F, F, F, T, F, F, T],
        [T, F, F, F, F, F, F, F, F, T, F, F, F, F, F, F, F, T, F, T],
        [T, F, T, T, T, T, F, F, F, T, T, F, F, T, F, F, F, F, F, T],
        [T, F, F, F, F, F, T, F, F, T, F, F, F, F, T, F, F, F, F, T],
        [T, F, F, F, F, F, F, F, F, F, F, F, F, F, T, F, F, F, F, T],
        [T, F, F, T, F, F, T, F, F, F, F, F, F, F, T, F, F, F, F, T],
        [T, T, F, F, F, F, T, F, F, F, T, T, F, F, F, T, F, F, F, T],
        [T, F, F, F, F, F, F, T, T, T, F, F, T, T, T, F, F, F, T, T],
        [T, F, F, F, T, F, F, F, F, F, F, F, F, F, F, F, F, F, F, T],
        [T, T, F, F, T, T, T, F, F, F, F, T, F, F, F, F, F, T, F, T],
        [T, F, F, F, F, F, F, T, F, T, F, F, F, F, F, F, F, T, F, T],
        [T, F, F, F, F, T, F, T, F, F, F, F, F, F, F, T, F, T, F, T],
        [T, F, F, F, T, F, F, F, F, F, F, F, T, F, T, F, F, T, F, T],
        [T, F, F, F, T, F, F, F, F, F, F, F, F, T, F, T, F, T, F, T],
        [T, F, F, F, F, F, F, T, F, F, F, F, F, F, F, F, T, T, F, T],
        [T, F, F, F, F, F, F, F, T, F, T, T, F, F, T, F, F, T, F, T],
        [T, F, F, F, T, F, F, F, F, F, T, T, F, T, T, T, F, F, F, T],
        [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T]
    ],
    goal: [6, 1],
    rock: [2, 2],
    position: [18, 18]
}