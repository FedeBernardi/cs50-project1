import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timer from './components/Timer';

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            workTimer: 25,
            breakTimer: 5,
            working: true
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Timer startingTime={this.state.working ? this.state.workTimer : this.state.breakTimer}></Timer>
                </View>
                <View>
                    {/*<Button
                        title={this.state.ticking ? 'Stop' : 'Start'}
                        onPress={() => this.timerToggle()}>
                    </Button>*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
