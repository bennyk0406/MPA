const _ = ""
const F = "fire"
const W = "wall"

const map = [
    [F, F, F, _, F, F, F, F, _, _, F, F, F, F],
    [F, F, F, _, _, W, F, F, _, _, _, F, F, F],
    [F, F, _, _, W, W, F, _, _, F, F, _, W, W],
    [W, W, W, F, F, F, F, _, _, F, F, _, F, F],
    [F, F, F, F, _, _, _, _, F, F, F, _, F, _],
    [_, _, F, F, _, _, _, _, W, F, F, W, W, _],
    [_, _, F, W, W, W, W, _, F, F, F, F, F, _],
    [_, _, _, F, F, F, F, _, F, F, _, _, _, _],
    [F, F, _, F, F, F, F, F, _, _, _, F, F, W],
    [F, F, _, _, _, F, F, W, _, _, _, F, F, W],
    [_, _, F, _, _, _, _, W, W, F, F, F, _, _],
    [_, F, W, W, W, _, _, F, F, F, F, F, _, _],
    [_, F, F, F, F, F, F, _, _, _, _, F, F, F],
    [_, F, W, W, W, F, _, _, F, _, _, F, W, F]
]

export { map }