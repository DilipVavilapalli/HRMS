import React from 'react'
import {StyleSheet, Image} from 'react-native'

import logo from '../assets/logo1.png'

export default function Logo() {
  return <Image source={logo} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200
    }
})