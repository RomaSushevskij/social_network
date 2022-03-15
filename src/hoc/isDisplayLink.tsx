import React from 'react'
export const isDisplayLink = (WrappedComponent: typeof React.Component) => {
    const ContainerComponent = (props:object) => {
        return (
            <WrappedComponent {...props}/>
        )
    }
    return ContainerComponent
}