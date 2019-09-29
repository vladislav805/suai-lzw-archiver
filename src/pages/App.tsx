import React from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

import Pack from './Pack';
import Unpack from './Unpack';
import './App.scss';

export interface IAppProps {

}

export interface IAppState {

}

/**
 * Главный экран
 */
class App extends React.Component<IAppProps, IAppState> {
    render() {
        return <div className="App">
            <h1 className="App-title">LZW-архиватор</h1>
            <Tabs>
                <TabList>
                    <Tab>Запаковать</Tab>
                    <Tab>Распаковать</Tab>
                </TabList>
                <TabPanel>
                    <Pack />
                </TabPanel>
                <TabPanel>
                    <Unpack />
                </TabPanel>
            </Tabs>
        </div>;
    }
}

export default App;
