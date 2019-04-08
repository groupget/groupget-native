import React from 'react';
import Colors from '../../constants/Colors';
import AnyExpo from '../../utils/AnyExpo';


type TabBarIconProps = {
    name: string;
    focused?: boolean;
}

export default class TabBarIcon extends React.Component<TabBarIconProps> {

    render(): JSX.Element {
        return (
            <AnyExpo.Icon.Ionicons
                name={this.props.name}
                size={26}
                style={{marginBottom: -3}}
                color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        );
    }

    // private generateIconName() {
    //     const { name } = this.props;
    // }
}