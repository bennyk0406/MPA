const T = true
const F = false

export default {
    width: 7,
    height: 7,
    wall: [
        [T, T, T, T, T, T, T],
        [T, F, F, F, F, F, T],
        [T, F, F, F, F, F, T],
        [T, F, F, F, F, F, T],
        [T, F, F, F, F, F, T],
        [T, F, F, F, F, F, T],
        [T, T, T, T, T, T, T]
    ],
    goal: [4, 4],
    rock: [2, 2],
    position: [3, 4]
}