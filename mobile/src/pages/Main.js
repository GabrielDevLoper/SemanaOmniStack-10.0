import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main(){
    const [currentRegion, setcurrentRegion] = useState(null);
    


    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();

            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: false,
                });

               const { latitude, longitude } = coords;

                setcurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        }

        loadInitialPosition();
    },[]);

    if(!currentRegion){
        return null;
    }

    return <MapView initialRegion={currentRegion} style={styles.map} />
}

const styles = StyleSheet.create({
    map:{
        flex: 1
    },

})

export default Main;