/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { End, Mirror, Splitter, Start } from "./type"
import React from "react"
import Triangle from "/src/assets/triangle.svg"

export const StartDiv: React.FC<{ info: Start }> = (props) => {
    const { direction } = props.info
    return (
        <div
            css={css`
                width: 80%;
                aspect-ratio: 1;
                background-color: white;
                border: 3px solid red;
                border-radius: 8px;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 5;
            `}
        >
            <img 
                css={css`
                    width: 70%;
                    transform: ${direction === "up" ? "rotate(90deg)" : direction === "left" ? "rotate(0deg)" : direction === "down" ? "rotate(270deg)" : "rotate(180deg)"};
                `}
                src={Triangle}
            />
        </div>
    )
}

export const SplitterDiv: React.FC<{ info: Splitter }> = (props) => {
    const { direction } = props.info

    return (
        <div
            css={css`
                width: 80%;
                aspect-ratio: 1;
                background-color: white;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
            `}
        >
            <div
                css={css`
                    height: 10px;
                    width: 160%;
                    border-radius: 5px;
                    ${direction === "diagonal" && "transform: rotate(135deg);"}
                    ${direction === "anti" && "transform: rotate(45deg);"}
                    background-color: #2014DE;
                `}
            />
        </div>
    )
}

export const MirrorDiv: React.FC<{ info: Mirror }> = (props) => {
    const { direction } = props.info
    return (
        <div
            css={css`
                width: 80%;
                aspect-ratio: 1;
                background-color: white;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
            `}
        >
            <div
                css={css`
                    height: 10px;
                    width: 160%;
                    border-radius: 5px;
                    ${direction === "diagonal" && "transform: rotate(135deg);"}
                    ${direction === "anti" && "transform: rotate(45deg);"}
                    background-color: #252525;
                `}
            />
        </div>
    )
}

export const BlockDiv: React.FC = () => {
    return (
        <div
            css={css`
                width: 100%;
                aspect-ratio: 1;
                background-color: gray;
            `}
        />
    )
}

export const EndDiv: React.FC<{ info: End }> = (props) => {
    return (
        <div
            css={css`
                width: 80%;
                aspect-ratio: 1;
                border: 3px solid red;
                border-radius: 8px;
                box-sizing: border-box;
                background: ${props.info.detected ? "red" : "white"};
                z-index: 5;
            `}
        />
    )
}