/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Check from "../assets/check.svg"
import { CSSTransition } from "react-transition-group";

interface NotificationProps {
    content: string | undefined
}

const Notification: React.FC<NotificationProps> = (props) => {
    return (
        <CSSTransition in={props.content !== undefined} timeout={400} mountOnEnter unmountOnExit classNames="notification">
            <div css={css`
                position: fixed;
                top: 50px;
                left: 50%;
                transform: translate(-50%, 0);
                padding: 10px;
                border-radius: 10px;
                background-color: #ffffff;
                display: flex;
                flex-direction: row;
                gap: 10px;
                align-items: center;
                box-shadow: #dadfe366 0px 4px 8px;

                @keyframes open {
                    from {
                        top: 0;
                    }
                    to { 
                        top: 50px;
                    }
                }

                @keyframes close {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }

                &.notification-enter-active {
                    animation: open 0.4s cubic-bezier(.4,0,.2,1) forwards
                }

                &.notification-exit-active {
                    animation: close 0.3s cubic-bezier(.4,0,.2,1) forwards
                }
            `}>
                <img src={Check} height={20} />
                <div>
                    {props.content}
                </div>
            </div>
        </CSSTransition>
    )
}

export default Notification