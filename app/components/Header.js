import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import colors from '../config/colors'

export default function Header({text, action}) {
  return (
    <View style={styles.header}>
        <View style={styles.headerItem}>
            <TouchableOpacity onPress={()=>{action?.first ? action.first() : console.log('No function passed')}}>
                {text?.first ?? <Text></Text>}
            </TouchableOpacity>
        </View>
        <View style={styles.headerMainItem}>
            {text?.main ?? <Text></Text>}
        </View>
        <View style={styles.headerItem2}>
            <TouchableOpacity onPress={()=>{action?.last ? action.last() : console.log('Pass function')}}>
                {text?.last ?? <Text></Text>}
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: colors.primary,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10
    },
    headerItem: {
        flex:1,
        alignItems: 'flex-start'
    },
    headerItem2: {
        flex:1,
        alignItems: 'flex-end'
    },
    headerMainItem: {
        flex:2,
        alignItems: 'center'
    },
    headerText: {
        color: colors.white
    }
})