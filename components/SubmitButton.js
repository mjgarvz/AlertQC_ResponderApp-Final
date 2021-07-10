import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

// Color Import
import Colors from '../constants/Colors';

const SubmitButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText} numberOfLines={1}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

// Button Style
const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Colors.submitPrimary,
        paddingVertical: 12,
        paddingHorizontal: 80,
        borderRadius: 25,
        borderColor: Colors.submitPrimaryBorder,
        borderWidth: 2,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3,
        shadowOpacity: 0.40,
        elevation: 5,
    },
    buttonText: {
        fontSize: Platform.OS === 'android' ? 12 : 15,
        color: '#5e5e5e',
        fontFamily: 'open-sans'
    }
});

export default SubmitButton;