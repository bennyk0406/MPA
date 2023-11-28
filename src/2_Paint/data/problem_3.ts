const colors = ["#FF0000", "#FFC000", "#FFFF00", "#92D050", "#00B0F0", "#9943D9"]
const [R, B, P] = colors // Please insert underbar(_) in front of the variables which are not used.
//const _ = ""

const map = [
    [P, P, P, P, P, P, P, B],
    [B, R, B, P, B, P, R, B],
    [B, R, B, P, B, P, R, B],
    [B, R, R, P, B, P, R, B],
    [P, P, P, P, P, P, R, B],
    [B, R, R, P, B, P, R, B],
    [P, P, P, P, P, P, R, B],
    [B, R, P, P, B, P, R, B]
]

export { colors, map }