import React, {useEffect} from 'react'
import {StyleSheet, View, StatusBar, SafeAreaView, TouchableWithoutFeedback} from 'react-native';

import colors from '../config/colors'
import Logo from '../components/Logo'

export default function Splash({navigation}) {
    useEffect(() =>{
        setTimeout(() => navigation.navigate('Home'), 3000)
    }, [])
  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.primary} />
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('Home')}>
            <View style={styles.container}>
                <Logo />
            </View>
        </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
    },
    safeareaview: {
        flex: 1
    }
})