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
import Switch from './components/Switch';
import Timer from './components/Timer';
import Button, {BUTTON_SIZES} from './components/Button';

import { Constants } from 'expo';

const WORKING_TEXT = 'Time to work buddy!',
      RESTING_TEXT = 'You can relax now :)',
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
        let {showMainScreen, isTicking} = this.state;

        this.setState({showMainScreen: !showMainScreen});

        // if the time is running when the user switches to the Edit page, we turn off the timer
        if (showMainScreen && isTicking) {
            this.timerToggle();
        }
    }

    renderMainScreen() {
        let {minutes, seconds} = this.state.currentTime,
            {isTicking, isWork, workTimer, breakTimer} = this.state;

        return (
            <View style={styles.mainContainer}>
                <View style={styles.mainHeader}>
                    <View style={styles.timersDetailsContainer}>
                        <Text style={styles.timerDetail}>{`Work:  ${workTimer} minutes`}</Text>
                        <Text style={styles.timerDetail}>{`Break: ${breakTimer} minutes`}</Text>
                    </View>
                    <Button
                        text={'Edit'}
                        callback={() => this.screenToggle()}
                        size={BUTTON_SIZES.SMALL}
                        background={TouchableNativeFeedback.Ripple()}>
                    </Button>
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.switcher}>
                        <Switch
                            value={isWork}
                            textTrue='Work'
                            textFalse='Break'
                            callback={this.switchToggledCallback.bind(this)}>
                        </Switch>
                    </View>
                    {isTicking && <Text style={styles.mainText}>{isWork ? WORKING_TEXT : RESTING_TEXT}</Text>}
                    {!isTicking && <Text style={styles.mainText}>Press the button to start the clock!</Text>}
                    <View>
                        <Timer minutes={minutes} seconds={seconds} fontSize={60}></Timer>
                    </View>
                </View>
                <View style={styles.mainButtonPanel}>
                    <View>
                        <Button
                            text={isTicking ? 'Stop' : 'Start'}
                            callback={() => this.timerToggle()}
                            size={BUTTON_SIZES.MEDIUM}
                            extraStyles={styles.startButton}>
                        </Button>
                    </View>
                    <View>
                        <Button
                            text='Reset'
                            callback={() => this.resetTimer()}
                            size={BUTTON_SIZES.MEDIUM}>
                        </Button>
                    </View>
                </View>
            </View>
        );
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

    renderEditScreen() {
        let {workTimer, breakTimer} = this.state;

        return <View>
            <Text>Edit your timers</Text>
            <View>
                <Text>Working time</Text>
                <TextInput
                    maxLength={2}
                    placeholder={workTimer.toString()}
                    keyboardType='numeric'
                    onChangeText={(v) => this.editInputHandler(v, 'work')}
                ></TextInput>
            </View>
            <View>
                <Text>Break time</Text>
                <TextInput
                    maxLength={2}
                    placeholder={breakTimer.toString()}
                    keyboardType='numeric'
                    onChangeText={(v) => this.editInputHandler(v, 'break')}
                ></TextInput>
            </View>
            <Button text='Go Back' callback={() => this.screenToggle()}></Button>
        </View>;
    }

    render() {
        let {showMainScreen} = this.state;

        return <ImageBackground source={require('./assets/tomatoes.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                {showMainScreen ? this.renderMainScreen() : this.renderEditScreen()}
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
    },
    mainHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 150
    },
    editButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 100,
        backgroundColor: 'steelblue'
    },
    mainContainer: {
        flex: 1,
        height: 500
    },
    mainContent: {
        flex: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainText: {
        fontSize: 20,
        color: '#FFF'
    },
    mainButtonPanel: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150
    },
    startButton: {
        marginBottom: 20
    },
    timersDetailsContainer: {
        
    },
    timerDetail: {
        color: 'grey'
    }
});
