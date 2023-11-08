const T = true
const F = false

export default {
    width: 8,
    height: 4,
    wall: [
        [T, T, T, T, T, T, T, T],
        [T, F, F, F, F, F, F, T],
        [T, F, F, F, F, F, F, T],
        [T, T, T, T, T, T, T, T]
    ],
    goal: [1, 5],
    rock: [1, 2],
    position: [1, 1]
}