export type HVDirection = "right" | "left" | "up" | "down"
export type DADirection = "diagonal" | "anti"

export interface Basic {
    laser: HVDirection[]
}

export interface Start extends Basic {
    type: "start"
    direction: HVDirection
}

export interface End extends Basic {
    type: "end"
    detected: boolean
}

export interface Mirror extends Basic {
    type: "mirror"
    direction: DADirection
}

export interface Splitter extends Basic {
    type: "splitter"
    direction: DADirection
}

export interface Block extends Basic {
    type: "block"
}

export interface Empty extends Basic {
    type: "empty"
}

export type Element = Start | End | Mirror | Splitter | Block | Empty