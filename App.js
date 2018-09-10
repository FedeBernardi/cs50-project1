import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Vibration,
    TextInput,
    TouchableNativeFeedback,
    ImageBackground
} from 'react-native';
import { Constants } from 'expo';

import EditScreen from './screens/EditScreen';
import MainScreen from './screens/MainScreen';

const DEFAULT_WORK_TIME = 25,
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
            showMainScreen: true,
            showRemainingTime: true
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
        let {showMainScreen, isTicking} = this.state;

        this.setState({showMainScreen: !showMainScreen});

        // if the time is running when the user switches to the Edit page, we turn off the timer
        if (showMainScreen && isTicking) {
            this.timerToggle();
        }
    }

    editInputHandler(value, timer) {
        if (value) {
            if (timer === 'work') {
                this.setState({workTimer: +value});
            } else {
                this.setState({breakTimer: +value});
            }
        }
    }

    checkboxHandler() {
        this.setState({showRemainingTime: !this.state.showRemainingTime});
    }

    render() {
        let {showMainScreen, workTimer, breakTimer, currentTime, isTicking, isWork, showRemainingTime} = this.state;

        //return <ImageBackground source={require('./assets/tomatoes.jpg')} style={{width: '100%', height: '100%'}}> 
        return    <View style={styles.container}>
                {showMainScreen
                    ? <MainScreen
                        currentTime={currentTime}
                        isTicking={isTicking}
                        isWork={isWork}
                        workTimer={workTimer}
                        breakTimer={breakTimer}
                        showRemainingTime={showRemainingTime}
                        screenToggle={this.screenToggle.bind(this)}
                        switchToggledCallback={this.switchToggledCallback.bind(this)}
                        timerToggle={this.timerToggle.bind(this)}
                        resetTimer={this.resetTimer.bind(this)}
                    />
                    : <EditScreen 
                        workTimer={workTimer}
                        breakTimer={breakTimer}
                        showRemainingTime={showRemainingTime}
                        buttonCallback={this.screenToggle.bind(this)}
                        editHandler={this.editInputHandler.bind(this)}
                        checkboxHandler={this.checkboxHandler.bind(this)}
                        
                    />
                }
            </View>
        //</ImageBackground>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: Constants.statusBarHeight,
        padding: 10,
        backgroundColor: '#f94a4a'
    }
});
