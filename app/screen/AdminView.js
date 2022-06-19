import React, {useEffect, useState} from 'react'
import {StyleSheet, SafeAreaView, View, Text, StatusBar, TouchableOpacity} from 'react-native'

import colors from '../config/colors'
import Header from '../components/Header'
import Logo from '../components/Logo'

import { AntDesign } from '@expo/vector-icons'
import Box from '../components/Box'

export default function AdminView({route, navigation}) {
    const headerText = {
        first:<AntDesign name="arrowleft" size={24} color={colors.white} />
    }

    const headerAction = {
        first: ()=> navigation.goBack()
    }

  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.primary} />
        <View style={styles.container}>
            <Header text={headerText} action={headerAction} />
            <View style={styles.logo}>
                <Logo />
                <Text style={styles.title}>Welcome, Admin</Text>
            </View>
            <View style={styles.break} />

            <View style={[styles.form, {backgroundColor: colors.white, padding: 10}]}>
                <Text style={styles.empTitle}>List of Employees Profile</Text>
                <View style={{ width: '100%', height: 10 }} />

                <Box label="Name" text={route?.params?.details?.fullname ?? ''} />
                <Box label="DOB" text={route?.params?.details?.dob ?? ''} />
                <Box label="Phone" text={route?.params?.details?.phoneNumber ?? ''} />
                <Box label="Email" text={route?.params?.details?.email ?? ''} />
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    break: {
        width: '100%',
        height: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    empTitle: {
        fontSize: 16, 
        fontWeight: 'bold'
    },
    form: {
        width: '90%',
        alignSelf: 'center'
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10, 
        backgroundColor: '#ccc',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 5
    },
    listText: {
        fontSize: 20,
        paddingLeft: 10
    },
    logo: {
        alignSelf: 'center',
        alignSelf: 'center'
    },
    safeareaview: {
        flex: 1
    },
    title: {
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})