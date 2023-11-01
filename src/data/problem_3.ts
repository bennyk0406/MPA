const T = true
const F = false

export default {
    width: 11,
    height: 12,
    wall: [
        [T, T, T, T, T, T, T, T, T, T, T],
        [T, F, F, F, F, F, F, F, F, F, T],
        [T, F, F, F, F, F, F, F, F, F, T],
        [T, F, F, F, F, F, F, F, F, F, T],
        [T, F, F, F, T, T, T, T, T, T, T],
        [T, F, F, F, F, F, F, F, F, F, T],
        [T, F, F, F, F, F, F, F, F, F, T],
        [T, F, F, F, F, F, F, F, F, F, T],
        [T, T, T, T, T, T, T, F, F, F, T],
        [T, F, F, F, F, F, F, F, F, F, T],
        [T, F, F, F, F, F, F, F, F, F, T],
        [T, T, T, T, T, T, T, T, T, T, T],
    ],
    goal: [9, 1],
    rock: [2, 7],
    position: [6, 5]
}