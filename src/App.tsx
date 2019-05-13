import React from 'react';
import Expo from 'expo';
import {AppLoading, Asset, Font} from 'expo';
import {AppContainer} from './constants/AppNavigator';


export const MyContext = React.createContext({
    name: 'Test',
});

export type Value = {
    name: string;
    setName: (val: string) => void;
}

export type AppProps = {
    skipLoadingScreen?: boolean;
}

class App extends React.Component<AppProps> {

    state = {
        name: 'unset name',
        isLoadingComplete: false,
    };

    setName = (newName: string) => {
        this.setState({name: newName});
    };

    componentDidMount(): void {
        this.loadResourcesAsync();
    }

    render(): JSX.Element {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this.loadResourcesAsync}
                    onError={this.handleLoadingError}
                    onFinish={this.handleFinishLoading}
                />
            );
        } else {
            return (

                <MyContext.Provider
                    value={{
                        name: this.state.name,
                        setName: this.setName,
                    }}
                >
                    <AppContainer/>
                </MyContext.Provider>
            );
        }
    }

    private loadResourcesAsync = async (): Promise<void> => {
        await Asset.loadAsync([
            require('../../assets/images/robot-dev.png'),
            require('../../assets/images/robot-prod.png'),
        ]);
        await Font.loadAsync({
            ...(Expo as any).Icon.Ionicons.font,
            'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
        });
    };

    private handleLoadingError = (error: Error) => {
        console.warn(error);
    };

    private handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}


export default App;
