import React from 'react'
import {StyleSheet, Text, View, TextInput} from 'react-native'

import colors from '../config/colors'

export default function Input({onChangeText, placeholder, value, secureTextEntry}) {
  return (
    <View style={styles.textInputView}>
        <TextInput 
            value={value ?? ''} 
            onChangeText={text=>onChangeText(text)} 
            secureTextEntry={secureTextEntry ?? false}
            placeholder={placeholder ?? ''} 
            style={styles.textInput} 
        />
    </View>
  )
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.white
    },
    textInputView: {
        marginBottom: 10
    }
})