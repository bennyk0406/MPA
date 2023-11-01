const T = true
const F = false

export default {
    width: 7,
    height: 4,
    wall: [
        [T, T, T, T, T, T, T],
        [T, F, F, F, F, F, T],
        [T, F, F, F, F, F, T],
        [T, T, T, T, T, T, T]
    ],
    goal: [1, 4],
    rock: [1, 2],
    position: [1, 1]
}