/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { HVDirection } from "./type"

export const Laser: React.FC<{ direction: HVDirection }> = (props) => {
    return (
        <div css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
        `}>
            <div css={css`${props.direction === "left" && "border-bottom: 3px solid red;"}`} />
            <div
                css={css`
                    ${props.direction === "right" && "border-bottom: 3px solid red;"}
                    ${props.direction === "up" && "border-left: 3px solid red;"}
                `}
            />
            <div />
            <div css={css`${props.direction === "down" && "border-left: 3px solid red;"}`} />
        </div>
    )
}