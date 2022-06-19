import React from 'react'
import {StyleSheet, Image} from 'react-native'

export default function ProfileImage({uri}) {
  return <Image source={{ uri: uri }} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 10
    }
})