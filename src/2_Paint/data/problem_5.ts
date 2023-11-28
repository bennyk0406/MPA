const colors = ["#FF0000", "#FFC000", "#FFFF00", "#92D050", "#00B0F0", "#9943D9"]
const [R, _O, Y, G, B, P] = colors // Please insert underbar(_) in front of the variables which are not used.
const _ = ""

const map = [
    [B, Y, B, G, G, _O, _O, R, R, P, Y],
    [B, Y, R, R, R, R, R, R, R, R, Y],
    [B, Y, G, G, G, G, G, G, R, G, Y],
    [B, Y, B, G, G, _O, _O, R, R, P, Y],
    [B, Y, B, B, B, B, _O, B, R, B, Y],
    [B, Y, B, B, B, _O, _O, R, R, P, Y],
    [B, Y, Y, Y, Y, Y, Y, Y, Y, Y, Y],
    [B, P, P, P, P, P, P, P, P, P, P],
    [B, Y, _O, _O, _O, _O, _O, _O, R, _O, Y],
    [B, Y, B, G, G, _O, _O, R, R, P, Y],
    [B, Y, B, Y, Y, _O, _O, Y, R, Y, Y],
    [B, Y, B, G, G, _O, _O, R, R, P, Y],
    [B, Y, B, G, G, _O, _O, R, R, P, Y]
]

export { colors, map }