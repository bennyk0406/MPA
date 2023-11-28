const colors = ["#FF0000", "#FFC000", "#FFFF00", "#92D050", "#00B0F0", "#9943D9"]
const [R, _O, Y, G, B, P] = colors // Please insert underbar(_) in front of the variables which are not used.
const _ = ""

const map = [
    [_, _, G, _, _O, P, P, _],
    [R, R, G, R, _O, P, P, R],
    [Y, Y, G, _, Y, P, Y, _],
    [_, B, G, _, _O, P, P, _],
    [_, B, G, _, _O, P, P, _],
    [R, R, G, R, R, _, P, R],
    [_, _, G, _, _O, P, P, _],
    [_O, _O, _O, _O, _O, P, _O, _O]
]

export { colors, map }