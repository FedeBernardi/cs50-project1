import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Button, {BUTTON_SIZES} from '../components/Button';
import Switch from '../components/Switch';
import Timer from '../components/Timer';

const WORKING_TEXT = 'Time to work buddy!',
      RESTING_TEXT = 'You can relax now :)';

export default class MainScreen extends React.Component {

    render() {
        let {minutes, seconds} = this.props.currentTime,
            {
                isTicking,
                isWork,
                workTimer,
                breakTimer,
                showRemainingTime,
                screenToggle,
                switchToggledCallback,
                timerToggle,
                resetTimer
            } = this.props;

        return (
            <View style={styles.mainContainer}>
                <View style={styles.mainHeader}>
                    <View>
                        <Text style={styles.timerDetail}>{`Work:  ${workTimer} minutes`}</Text>
                        <Text style={styles.timerDetail}>{`Break: ${breakTimer} minutes`}</Text>
                    </View>
                    <Button
                        text={'Edit'}
                        callback={screenToggle}
                        size={BUTTON_SIZES.SMALL}
                    />
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.switcher}>
                        <Switch
                            value={isWork}
                            textTrue='Work'
                            textFalse='Break'
                            callback={switchToggledCallback}>
                        </Switch>
                    </View>
                    {isTicking && <Text style={styles.mainText}>{isWork ? WORKING_TEXT : RESTING_TEXT}</Text>}
                    {!isTicking && <Text style={styles.mainText}>Press the button to start the clock!</Text>}
                    <View style={styles.timerContainer}>
                        <Timer showTime={(!showRemainingTime && !isTicking) || showRemainingTime} minutes={minutes} seconds={seconds} fontSize={60}></Timer>
                        {!showRemainingTime && <Text style={styles.noticeMessage}>If you want to see the remaining time go to the config</Text>}
                    </View>
                </View>
                <View style={styles.mainButtonPanel}>
                    <View>
                        <Button
                            text={isTicking ? 'Stop' : 'Start'}
                            callback={timerToggle}
                            size={BUTTON_SIZES.MEDIUM}
                            extraStyles={styles.startButton}>
                        </Button>
                    </View>
                    <View>
                        <Button
                            text='Reset'
                            callback={resetTimer}
                            size={BUTTON_SIZES.MEDIUM}>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }

}

MainScreen.propTypes = {
    currentTime: PropTypes.object.isRequired,
    isTicking: PropTypes.bool.isRequired,
    isWork: PropTypes.bool.isRequired,
    workTimer: PropTypes.number.isRequired,
    breakTimer: PropTypes.number.isRequired,
    showRemainingTime: PropTypes.bool.isRequired,
    screenToggle: PropTypes.func.isRequired,
    switchToggledCallback: PropTypes.func.isRequired,
    timerToggle: PropTypes.func.isRequired,
    resetTimer: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    mainHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 150
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
    timerContainer: {
        alignItems: 'center'
    },
    noticeMessage: {
        fontSize: 10
    },
    timerDetail: {
        color: 'grey'
    }
});
