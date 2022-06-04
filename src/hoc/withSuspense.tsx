import React, {Suspense} from "react";
import {Preloader} from '../components/generic/Preloader/Preloader';

export const withSuspense = (WrappedComponent: any) => {
    const ComponentWithSuspense = (props: object) => {
        return (
            <Suspense fallback={<Preloader size={'30px'} color={'#EC4899'}/>}>
                <WrappedComponent {...props}/>
            </Suspense>
        )
    }
    return ComponentWithSuspense
}