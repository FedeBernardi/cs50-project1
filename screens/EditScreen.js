import React from 'react';
import { View, Text, TextInput, CheckBox, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Button, { BUTTON_SIZES } from '../components/Button';

export default class EditScreen extends React.Component {

    render() {
        let {
            workTimer,
            breakTimer,
            buttonCallback,
            editHandler,
            checkboxHandler,
            showRemainingTime
        } = this.props;

        return <View>
            <Text style={styles.mainTitle}>Configuration</Text>
            <View style={styles.timersContainer}>
                <Text style={styles.subtitle}>Edit your timers</Text>
                <View>
                    <Text style={styles.timersTitles}>Working time</Text>
                    <TextInput
                        style={styles.inputs}
                        underlineColorAndroid='transparent'
                        maxLength={2}
                        placeholder={workTimer.toString()}
                        keyboardType='numeric'
                        onChangeText={(v) => editHandler(v, 'work')}
                    ></TextInput>
                </View>
                <View>
                    <Text style={styles.timersTitles}>Break time</Text>
                    <TextInput
                        style={styles.inputs}
                        underlineColorAndroid='transparent'
                        maxLength={2}
                        placeholder={breakTimer.toString()}
                        keyboardType='numeric'
                        onChangeText={(v) => editHandler(v, 'break')}
                    ></TextInput>
                </View>
            </View>
            <View style={styles.checkBoxContainer}>
                <Text style={styles.subtitle}>Show remaining time</Text>
                <View style={styles.checkboxRow}>
                    <Text style={styles.checkboxRowText}>This will prevent you to look how much time's left, in case you are a little bit anxious :)</Text>
                    <View style={styles.checkbox}>
                        <CheckBox
                            onValueChange={(v) => {checkboxHandler(v)}} value={showRemainingTime}
                        />
                    </View>
                </View>
            </View>
            <Button size={BUTTON_SIZES.MEDIUM} text='Go Back' callback={buttonCallback}></Button>
        </View>;
    }

}

EditScreen.propTypes = {
    workTimer: PropTypes.number.isRequired,
    breakTimer: PropTypes.number.isRequired,
    showRemainingTime: PropTypes.bool.isRequired,
    buttonCallback: PropTypes.func.isRequired,
    editHandler: PropTypes.func.isRequired,
    checkboxHandler: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    timersContainer: {
        marginBottom: 30
    },
    checkBoxContainer: {
        marginBottom: 30
    },
    mainTitle: {
        fontSize: 40,
        marginBottom: 20,
        color: '#FFF'
    },
    subtitle: {
        fontSize: 25,
        marginBottom: 15,
        color: '#FFF'
    },
    timersTitles: {
        color: '#FFF',
        marginBottom: 15
    },
    inputs: {
        fontSize: 35,
        borderWidth: 1,
        borderRadius: 50,
        paddingLeft: 15,
        backgroundColor: '#FFF'
    },
    checkboxRow: {
        flexDirection: 'row'
    },
    checkboxRowText: {
        flex: 2,
        color: '#FFF'
    },
    checkbox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

