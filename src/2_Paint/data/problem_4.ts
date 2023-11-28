const colors = ["#FF0000", "#FFC000", "#FFFF00", "#92D050", "#00B0F0", "#9943D9"]
const [R, O, Y, G, B, P] = colors // Please insert underbar(_) in front of the variables which are not used.
const _ = ""

const map = [
    [O, O, R, O, O, O, O, O, O, O],
    [P, _, _, _, R, Y, O, _, Y, _],
    [P, P, R, P, P, P, P, P, Y, P],
    [_, _, R, _, R, _, O, _, Y, _],
    [B, B, R, B, B, B, _, B, B, B],
    [_, _, R, G, G, G, G, _, Y, G],
    [_, _, R, _, R, Y, O, _, Y, _],
    [P, P, R, _, B, Y, O, _, Y, _],
    [_, _, R, _, R, Y, O, _, Y, _],
    [G, G, R, G, G, G, G, G, G, G]
]

export { colors, map }