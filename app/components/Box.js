import React from 'react'
import {View, Text} from 'react-native'

export default function Box({label, text}) {
  return (
    <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, borderWidth: 1, borderColor: 'black', padding: 10 }}>
            <Text>{label ?? ''}</Text>
        </View>
        <View style={{ flex: 3, borderWidth: 1, borderColor: 'black', padding: 10 }}>
            <Text>{text ?? ''}</Text>
        </View>
    </View>
  )
}
