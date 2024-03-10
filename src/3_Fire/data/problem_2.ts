const _ = ""
const F = "fire"
const W = "wall"

const map = [
    [W, F, _, _, F, F, F, F, W, F],
    [F, F, F, _, W, W, W, F, _, F],
    [F, _, W, W, W, F, _, _, F, F],
    [F, W, F, F, _, F, _, _, F, F],
    [_, _, _, F, _, F, _, _, F, _],
    [_, _, _, F, F, F, W, F, W, W],
    [F, F, F, F, _, F, F, _, _, F],
    [F, W, W, F, W, W, _, F, F, _],
    [F, F, F, F, F, F, _, W, F, _],
    [F, F, _, _, F, F, F, W, F, F]
]

export { map }