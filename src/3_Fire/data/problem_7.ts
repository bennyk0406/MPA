const _ = ""
const F = "fire"
const W = "wall"

const map = [
    [_, _, F, _, _, _, _, F, F, F, F, F, F, F],
    [W, _, F, F, F, F, F, F, F, F, _, _, _, _],
    [F, F, F, F, W, W, W, W, W, F, _, _, _, _],
    [F, F, _, _, _, _, _, F, F, F, _, _, _, _],
    [F, F, _, _, F, _, _, F, _, _, _, W, F, F],
    [F, W, W, W, W, _, _, F, F, F, _, W, F, F],
    [F, F, _, F, F, F, F, _, _, F, _, W, F, F],
    [_, _, F, F, F, _, _, _, W, W, F, W, F, F],
    [_, _, _, F, F, _, _, _, F, F, F, F, F, W],
    [F, _, W, F, F, F, F, F, _, _, _, F, F, _],
    [F, F, F, W, W, W, W, F, F, W, W, W, W, F],
    [F, _, _, F, F, _, _, F, _, F, F, F, F, _]
]

export { map }