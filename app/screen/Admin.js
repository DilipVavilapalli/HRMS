import React, {useState} from 'react'
import {StyleSheet, SafeAreaView, View, Text, TouchableOpacity, 
    ActivityIndicator, StatusBar
} from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import Label from '../components/Label'
import Logo from '../components/Logo'
import Input from '../components/Input'
import Header from '../components/Header'

import colors from '../config/colors'

export default function Admin({navigation}) {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const headerText = {
        first: <AntDesign name="arrowleft" size={24} color={colors.white} />
    }

    const headerAction = {
        first: ()=>navigation.goBack()
    }

    const login = () => {
        setLoading(true)
        setTimeout(()=>{
            if(username && password){
                if(username === 'admin' && password === 'admin'){
                    setLoading(false)
                    navigation.navigate('AdminBoard')
                }else{
                    setLoading(false)
                    setError('Invalid username or password')
                    setTimeout(()=> setError(''), 3000)
                }
            }else{
                setLoading(false)
                setError('Username and password are required')
                setTimeout(() => setError(''), 3000)
            }
        }, 1500)
    }
  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.primary} />
        <Header text={headerText} action={headerAction} />
        <View style={styles.container}>
            <View style={styles.logo}>
                <Logo />
                <Text style={styles.title}>HRMS Admin Login</Text>
            </View>
            <View style={styles.break} />

            <View style={styles.form}>
                <Label text="Username" color={colors.white} />
                <Input value={username} onChangeText={text=>setUsername(text)} placeholder="Username" />

                <Label text="Password" color={colors.white} />
                <Input value={password} onChangeText={text=>setPassword(text)} secureTextEntry placeholder="Password" />
                <Text style={styles.error}>{error}</Text>

                <View style={{ width: '100%', height: 5}} />
                <TouchableOpacity onPress={login}>
                    <View style={styles.button}>
                        {loading ? 
                            <ActivityIndicator size="large" color={colors.white} /> 
                            :
                            <Text style={styles.buttonText}>Sign In</Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'tomato',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white
    },
    break: {
        width: '100%',
        height: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    error: {
        color: 'yellow',
        fontSize: 16
    },
    form: {
        width: '80%',
        alignSelf: 'center'
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