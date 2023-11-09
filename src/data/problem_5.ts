const T = true
const F = false

export default {
    width: 25,
    height: 25,
    wall: [
        [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
        [T, T, F, F, F, F, T, F, F, F, F, T, T, F, F, F, F, T, F, F, F, F, F, F, T],
        [T, F, F, F, T, F, T, F, F, T, T, F, F, F, F, F, F, F, F, F, F, F, F, F, T],
        [T, F, F, T, F, F, T, F, F, F, F, F, F, F, F, F, F, F, F, F, T, T, F, T, T],
        [T, F, T, F, F, T, F, F, T, F, F, F, F, T, F, T, T, T, T, F, F, F, T, F, T],
        [T, F, T, F, T, F, F, F, T, F, F, T, F, F, T, F, F, F, F, T, T, F, F, F, T],
        [T, F, T, F, T, F, T, F, F, F, F, F, T, F, F, F, T, T, F, F, F, T, T, F, T],
        [T, F, T, F, F, F, T, T, F, F, F, T, F, F, T, T, F, T, F, F, F, F, F, F, T],
        [T, F, F, T, T, F, F, F, F, F, T, F, F, T, F, F, F, F, T, T, T, T, T, F, T],
        [T, T, F, F, T, T, F, F, F, F, T, F, T, F, F, F, T, F, F, F, F, F, F, F, T],
        [T, F, T, F, F, T, F, F, F, T, F, F, F, F, F, T, F, F, F, F, F, F, T, F, T],
        [T, F, F, F, F, T, F, F, F, T, F, T, T, T, F, F, F, F, F, T, F, F, T, F, T],
        [T, F, T, F, T, F, F, F, T, F, T, F, F, F, F, F, F, F, F, F, F, F, T, F, T],
        [T, F, F, T, F, F, F, F, T, F, F, T, F, F, F, F, T, F, T, F, F, F, T, F, T],
        [T, T, F, T, F, F, F, F, F, F, F, T, F, F, F, F, T, T, F, F, F, T, F, F, T],
        [T, T, F, T, F, T, F, F, F, F, F, F, F, F, T, T, F, F, F, F, F, T, F, F, T],
        [T, F, F, T, F, T, F, F, T, F, F, F, F, F, F, F, F, F, F, F, T, F, F, T, T],
        [T, F, T, F, F, T, F, T, F, F, F, T, T, T, F, F, F, F, F, T, F, F, T, F, T],
        [T, F, T, F, F, F, F, T, F, T, T, F, F, F, F, F, T, F, F, T, F, F, F, F, T],
        [T, F, T, F, T, T, T, F, F, F, F, F, F, F, F, F, T, F, T, F, T, F, T, F, T],
        [T, F, T, T, F, F, F, F, F, F, F, F, F, T, F, F, F, T, F, F, F, T, T, F, T],
        [T, F, F, F, F, F, F, F, F, T, F, F, F, T, T, F, F, F, F, T, F, F, T, F, T],
        [T, F, F, F, F, F, T, T, F, F, T, T, T, F, F, T, T, F, F, T, T, F, F, F, T],
        [T, T, F, F, F, T, F, F, F, F, F, F, F, F, F, F, F, F, T, F, F, T, F, F, T],
        [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T]
    ],
    goal: [1, 22],
    rock: [21, 2],
    position: [23, 2]
}