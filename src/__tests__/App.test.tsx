import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

describe('App snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
    });

    it('renders the loading screen', async () => {
        const tree = renderer.create(<App/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the root without loading screen', async () => {
        const tree = renderer.create(<App skipLoadingScreen/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
