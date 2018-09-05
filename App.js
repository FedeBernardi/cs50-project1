import React from 'react';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';
import Timer from './components/Timer';

const WORKING_TEXT = "Time to work buddy!",
      RESTING_TEXT = "You can relax now :)";

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            workTimer: 0,
            breakTimer: 5,
            currentTime: {minutes: 0, seconds: 10},
            isTicking: false,
            isWork: true
        }
    }

    timerToggle() {
        let {isTicking} = this.state;
        this.setState({isTicking: !isTicking});

        if (!isTicking) {
            this.kickInterval();
        } else {
            this.destroyInterval();
        }
    }

    kickInterval() {
        this.interval = setInterval(() => {
            let {minutes, seconds} = this.state.currentTime;
            seconds--;

            if (seconds === -1 && minutes) {
                seconds = 59;
                minutes--;
            }

            if (!minutes && !seconds) {
                Vibration.vibrate();
                this.switchTimers();
            } else {
                this.setState({currentTime: {minutes, seconds}})
            }
        }, 1000);
    }

    destroyInterval() {
        clearInterval(this.interval);
    }

    switchTimers() {
        let {workTimer, breakTimer, isWork} = this.state;

        this.setState({
            isTicking: false,
            isWork: !isWork,
            currentTime: {minutes: !isWork ? workTimer : breakTimer, seconds: 0}
        });
        this.destroyInterval();
    }

    render() {
        let {minutes, seconds} = this.state.currentTime,
            {isTicking, isWork} = this.state;

        return (
            <View style={styles.container}>
                {isTicking && <Text>{isWork ? WORKING_TEXT : RESTING_TEXT}</Text>}
                {!isTicking && <Text>Press the button to start the clock!</Text>}
                <View>
                    <Timer minutes={minutes} seconds={seconds}></Timer>
                </View>
                <View>
                    <Button
                        title={isTicking ? 'Stop' : 'Start'}
                        onPress={() => this.timerToggle()}>
                    </Button>
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
