import React from 'react'
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native'

export default function Button({width, title, bgColor, color, onPress}) {
    
  return (
    <TouchableOpacity style={{ width: width ?? '100%' }} onPress={()=>{onPress? onPress(): null}}>
        <View style={[styles.button, {backgroundColor: bgColor ?? 'dodgerblue'}]}>
            <Text style={[styles.buttonText, {color: color ?? '#fff'}]}>{title ?? 'Button'}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        borderRadius: 50
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})