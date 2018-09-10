import React from 'react';
import { View, Text, TextInput, CheckBox } from 'react-native';
import PropTypes from 'prop-types';

import Button, { BUTTON_SIZES } from '../components/Button';

export default class EditScreen extends React.Component {

    render() {
        let {workTimer, breakTimer, buttonCallback, editHandler, checkboxHandler, showRemainingTime} = this.props;

        return <View>
            <Text>Edit your timers</Text>
            <View>
                <Text>Working time</Text>
                <TextInput
                    maxLength={2}
                    placeholder={workTimer.toString()}
                    keyboardType='numeric'
                    onChangeText={(v) => editHandler(v, 'work')}
                ></TextInput>
            </View>
            <View>
                <Text>Break time</Text>
                <TextInput
                    maxLength={2}
                    placeholder={breakTimer.toString()}
                    keyboardType='numeric'
                    onChangeText={(v) => editHandler(v, 'break')}
                ></TextInput>
            </View>
            <View>
                <CheckBox onValueChange={(v) => {checkboxHandler(v)}} value={showRemainingTime}/>
                <Text>Show remaining time</Text>
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

