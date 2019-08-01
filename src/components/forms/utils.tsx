import React from 'react'

type GetProps<T> = T extends React.FC<infer P> ? P : {};

export function configure<
    ComponentType extends React.FC<GetProps<ComponentType>>,
    ConfigureProps extends Partial<GetProps<ComponentType>>
>(Component: ComponentType, configureProps: ConfigureProps): React.FC<Omit<GetProps<ComponentType>, keyof ConfigureProps>> {
    return props => {
        const allProps = {...configureProps, ...props} as GetProps<ComponentType>;
        return <Component {...allProps} />;
    }
}