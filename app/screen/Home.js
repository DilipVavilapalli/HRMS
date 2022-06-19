import React from 'react'
import {StyleSheet, SafeAreaView, StatusBar, View, Image, Text, TouchableOpacity} from 'react-native'

import colors from '../config/colors'
import Button from '../components/Button'
import Logo from '../components/Logo'

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.primary} />
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Logo />
                <Text style={styles.title}>WELCOME TO HRMS</Text>
            </View>

            <View style={styles.break} />

            <View style={styles.box}>
                <Button width="60%" bgColor="#fff" color="black" title="Sign Up" onPress={()=>navigation.navigate('SignUp')} />

                <View style={styles.break} />

                <Button width="60%" title="Sign In" onPress={()=>navigation.navigate('UserLogin')} />

                <View style={styles.break} />

                <Button width="60%" title="Admin Login" bgColor="tomato" onPress={()=>navigation.navigate('Admin')} />
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    box: {
        alignItems: 'center'
    },
    break: {
        width: '100%',
        height: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    imageView: {
        alignSelf: 'center',
        alignItems: 'center',
        margin: 10
    },
    safeareaview: {
        flex: 1
    },
    title: {
        color: colors.white, 
        fontSize: 30, 
        fontWeight: 'bold',
        textAlign: 'center'
    }
})