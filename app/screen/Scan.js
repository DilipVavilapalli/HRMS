import React, {useEffect, useState} from 'react'
import {StyleSheet, SafeAreaView, View, Text, Button, Alert} from 'react-native'

import { BarCodeScanner } from 'expo-barcode-scanner'

export default function Scan({navigation}) {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          console.log('status', status)
          setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        try{
            const json = JSON.parse(data)
            navigation.navigate({name: "AdminView", params: {details: json}})
        }catch(e){
            Alert.alert('Scan Error', 'Invalid data type', [
                {
                    text: 'OK',
                    onPress: ()=>navigation.goBack()
                }
            ])
        }
        // setScanned(false)
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
    
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

  return (
    <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container}>
            <BarCodeScanner 
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject} 
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeareaview: {
        flex: 1
    }
})