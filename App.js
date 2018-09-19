import React from 'react';
import {
    StyleSheet,
    View,
    Vibration,
    ImageBackground
} from 'react-native';
import { Constants } from 'expo';

import EditScreen from './screens/EditScreen';
import MainScreen from './screens/MainScreen';

const DEFAULT_WORK_TIME = 25,
      DEFAULT_BREAK_TIME = 5;

/**
 * workTimer: amount of minutes set for work
 * breakTimer: amount of minutes set for break,
 * currentTime
 * isTicking: determines if the time is running
 * isWork: flag to know if the current time is work or not
 * showMainScreen: flag to switch between the main screen and the edir screen
 * showRemainingTime: config to determines if the remaining time should be displayed
 * hasFinished: flag to know if the time ran out
 */
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
            showRemainingTime: true,
            hasFinished: false
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
        this.intervalTimer = setInterval(() => {
            let {minutes, seconds} = this.state.currentTime;
            seconds--;

            if (seconds === -1 && minutes) {
                seconds = 59;
                minutes--;
            }
            console.log(seconds);
            this.setState({currentTime: {minutes, seconds}})
            if (!minutes && !seconds) {
                this.setState({hasFinished: true})
                this.startVibration();
            }
        }, 1000);
    }

    startVibration() {
        this.destroyInterval();
        Vibration.vibrate([500, 500, 500], true);
    }

    stopVibration() {
        Vibration.cancel();
        this.switchTimers();
    }

    destroyInterval() {
        clearInterval(this.intervalTimer);
    }

    // Changes from one timer to the other
    switchTimers() {
        let {workTimer, breakTimer, isWork} = this.state;

        this.setState({
            hasFinished: false,
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
        let {
            showMainScreen,
            workTimer,
            breakTimer,
            currentTime,
            isTicking,
            isWork,
            showRemainingTime,
            hasFinished
        } = this.state;

        return <ImageBackground source={require('./assets/bg.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                {showMainScreen
                    ? <MainScreen
                        currentTime={currentTime}
                        isTicking={isTicking}
                        isWork={isWork}
                        hasFinished={hasFinished}
                        workTimer={workTimer}
                        breakTimer={breakTimer}
                        showRemainingTime={showRemainingTime}
                        screenToggle={this.screenToggle.bind(this)}
                        switchToggledCallback={this.switchToggledCallback.bind(this)}
                        timerToggle={this.timerToggle.bind(this)}
                        resetTimer={this.resetTimer.bind(this)}
                        stopAlarm={this.stopVibration.bind(this)}
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
        </ImageBackground>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: Constants.statusBarHeight,
        padding: 10
    }
});
