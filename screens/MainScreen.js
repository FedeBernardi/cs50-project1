import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import ImageButton, {BUTTON_IMAGE_SIZES} from '../components/ImageButton';
import Switch from '../components/Switch';
import Timer from '../components/Timer';
import AlarmButton from '../components/AlarmButton';
import Button, { BUTTON_SIZES } from '../components/Button';

import images from '../utils/images';

const WORKING_TEXT = 'Time to work buddy!',
      RESTING_TEXT = 'You can relax now :)';

export default class MainScreen extends React.Component {

    render() {
        let {minutes, seconds} = this.props.currentTime,
            {
                isTicking,
                isWork,
                workTimer,
                hasFinished,
                breakTimer,
                showRemainingTime,
                screenToggle,
                switchToggledCallback,
                timerToggle,
                resetTimer,
                stopAlarm
            } = this.props;

        return (
            <View style={styles.mainContainer}>
                <View style={styles.mainHeader}>
                    <View>
                        <Text style={styles.timerDetail}>{`Work:  ${workTimer} minutes`}</Text>
                        <Text style={styles.timerDetail}>{`Break: ${breakTimer} minutes`}</Text>
                    </View>
                    <Button size={BUTTON_SIZES.SMALL} text='Config' callback={screenToggle} />
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
                        {hasFinished && <AlarmButton callback={stopAlarm}/>}
                        {!hasFinished && <Timer showTime={(!showRemainingTime && !isTicking) || showRemainingTime} minutes={minutes} seconds={seconds} fontSize={60} />}
                        {!showRemainingTime && <Text style={styles.noticeMessage}>If you want to see the remaining time go to the config</Text>}
                    </View>
                </View>
                <View style={styles.buttonsPanelWrapper}>
                    {!hasFinished && <View style={styles.mainButtonsPanel}>
                        <View>
                            {!isTicking && <ImageButton
                                imgSource={images.buttons.start}
                                size={BUTTON_IMAGE_SIZES.MEDIUM}
                                callback={timerToggle}
                            />}
                            {isTicking && <ImageButton
                                imgSource={images.buttons.stop}
                                size={BUTTON_IMAGE_SIZES.MEDIUM}
                                callback={timerToggle}
                            />}
                        </View>
                        <View>
                            <ImageButton
                                imgSource={images.buttons.reset}
                                size={BUTTON_IMAGE_SIZES.SMALL}
                                callback={resetTimer}
                            />
                        </View>
                    </View>}
                </View>
            </View>
        );
    }

}

MainScreen.propTypes = {
    currentTime: PropTypes.object.isRequired,
    isTicking: PropTypes.bool.isRequired,
    isWork: PropTypes.bool.isRequired,
    hasFinished: PropTypes.bool.isRequired,
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
    buttonsPanelWrapper: {
        flex: 2,
        height: 150
    },
    mainButtonsPanel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
