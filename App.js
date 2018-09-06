import React from 'react';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';
import Switch from './components/Switch';
import Timer from './components/Timer';

import { Constants } from 'expo';

const WORKING_TEXT = "Time to work buddy!",
      RESTING_TEXT = "You can relax now :)",
      DEFAULT_WORK_TIME = 25,
      DEFAULT_BREAK_TIME = 5;

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            workTimer: DEFAULT_WORK_TIME,
            breakTimer: DEFAULT_BREAK_TIME,
            currentTime: {minutes: DEFAULT_WORK_TIME, seconds: 0},
            isTicking: false,
            isWork: true,
            showMainScreen: true
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

    // Changes from one timer to the other
    switchTimers() {
        let {workTimer, breakTimer, isWork} = this.state;

        this.setState({
            isTicking: false,
            isWork: !isWork,
            currentTime: {minutes: !isWork ? workTimer : breakTimer, seconds: 0}
        });
        this.destroyInterval();
    }

    // It resets the current timer
    resetTimer() {
        let {workTimer, breakTimer, isWork} = this.state;

        this.setState({isTicking: false, currentTime: {minutes: isWork ? workTimer : breakTimer, seconds: 0}});
        this.destroyInterval();
    }

    // Callback passed to the Switch component to notify the App that the timer has changed
    switchToggledCallback() {
        this.setState({isWork: !this.state.isWork});
        this.switchTimers();
    }

    // Toggles the flag that determines which screen is shown, the timer one or the edit screen
    screenToggle() {
        this.setState({showMainScreen: !this.state.showMainScreen});

        if (this.state.showMainScreen) {
            this.timerToggle();
        }
    }

    renderMainScreen() {
        let {minutes, seconds} = this.state.currentTime,
            {isTicking, isWork, workTimer, breakTimer} = this.state;

        return (
            <View>
                <View style={styles.header}>
                    <View style={styles.timersDetailsContainer}>
                        <Text style={styles.timerDetail}>{`Work:  ${workTimer} minutes`}</Text>
                        <Text style={styles.timerDetail}>{`Break: ${breakTimer} minutes`}</Text>
                    </View>
                    <Button
                        title='Edit'
                        onPress={() => this.screenToggle()}>
                    </Button>
                </View>
                <Switch value={isWork} textTrue="Work" textFalse="Break" callback={this.switchToggledCallback.bind(this)}></Switch>
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
                    <Button
                        title="Reset"
                        onPress={() => this.resetTimer()}>
                    </Button>
                </View>
            </View>
        );
    }

    renderEditScreen() {
        return <Text>Edit Page</Text>;
    }

    render() {
        let {showMainScreen} = this.state;

        return <View style={styles.container}>
            {showMainScreen ? this.renderMainScreen() : this.renderEditScreen()}
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        marginTop: Constants.statusBarHeight
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timersDetailsContainer: {
        
    },
    timerDetail: {
        color: 'grey'
    }
});
