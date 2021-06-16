import React from 'react'
export interface DynamicUseComponentProps {
    dynamicComponent: Function;
    componentProps?: any;
}
export interface DynamicUseComponentState {
    component: React.ReactNode
}
export default class extends React.Component<DynamicUseComponentProps, DynamicUseComponentState> {
    state = {
        component: null
    }
    componentDidMount() {
        const { dynamicComponent } = this.props
        this.setDynamicComponent(dynamicComponent)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { dynamicComponent } = nextProps
        this.setDynamicComponent(dynamicComponent)
    }
    setDynamicComponent(dynamicComponent) {
        dynamicComponent()
            .then(({ default: comp }) => {
                this.setState({ component: comp });
            })
    }
    render() {
        const { component: Component} = this.state;
        const { componentProps = {} } = this.props
        return Component ? <Component {...componentProps} /> : <span>组件加载失败</span>;
    }
}