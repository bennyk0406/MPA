const _ = ""
const F = "fire"
const W = "wall"

const map = [
    [_, F, W, _, F, F, F],
    [_, F, W, W, F, W, W],
    [F, F, _, W, F, F, F],
    [W, F, F, F, F, _, _],
    [F, W, _, F, F, F, F],
    [_, W, F, _, _, F, F],
    [F, F, F, _, _, W, F]
]

export { map }