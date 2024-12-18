import {ReactNode} from "react";

type ContainerProps = {
    children: ReactNode
}

export function Container({children}: ContainerProps) {
    return (
        <div className={'w-full max-w-7xl px-4 mx-auto'}>
            {children}
        </div>
    )
}