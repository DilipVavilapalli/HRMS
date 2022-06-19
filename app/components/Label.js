import React from 'react'
import {Text} from 'react-native'

export default function Label({text, color}) {
  return <Text style={{ color: color ?? 'black', fontSize: 16, fontWeight: 'bold' }}>{text ?? ''}</Text>
}
