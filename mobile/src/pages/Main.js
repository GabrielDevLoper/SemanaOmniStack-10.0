import React, {useEffect, useState} from 'react';
import MapView, { Marker, Callout} from 'react-native-maps';
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import {connect, disconnect} from '../services/socket';


function Main({navigation}){
    const [devs, setDevs] = useState([]);
    const [currentRegion, setcurrentRegion] = useState(null);
    const [tecnologias, setTecnologias] = useState('');
    


    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();

            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
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

    function setupWebsocket(){
        const { latitude, longitude } = currentRegion;

        connect(
            latitude,
            longitude,
            tecnologias
        );
    }

    async function loadDevs(){
        const {latitude, longitude} = currentRegion;
        const response = await api.get('/procurar',{
            params:{
                latitude,
                longitude,
                tecnologias
            }
        });
        
        setDevs(response.data.devs);
        setupWebsocket();
    }

    function handleRegionChanged(region){
        console.log(region);
        setcurrentRegion(region);
    }

    if(!currentRegion){
        return null;
    }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}> 
                {devs.map(dev => (
                    <Marker key={dev._id} coordinate={{ latitude:dev.location.coordinates[1], longitude:dev.location.coordinates[0]}}>
                        <Image style={styles.avatar} source={{uri: dev.avatar_url}}></Image>
                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: dev.github_username })
                        }}>
                            <View sytle={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTecn}>{dev.tecnologias.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            
            <View style={styles.searchForm}>
                <TextInput 
                style={styles.searchInput}
                placeholder="Buscar Devs por tecnologias"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={tecnologias}
                onChangeText={text => setTecnologias(text)}
                />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" sizen={20} color="#fff"/>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map:{
        flex: 1
    },
    avatar:{
        width:54,
        height:54,
        borderRadius:4,
        borderWidth:4,
        borderColor:'#fff'
    },

    callout:{
        width: 260
    },

    devName:{
        fontWeight:'bold',
        fontSize:16,
    },

    devBio:{
        color:'#666',
        marginTop: 5,
    },

    devTecn:{
        marginTop:5,
    },

    searchForm:{
        position:"absolute",
        top:20,
        left:20,
        right:20,
        zIndex:5,
        flexDirection:'row',
    },

    searchInput:{
        flex:1,
        height:50,
        backgroundColor: '#fff',
        color:'#333',
        borderRadius:25,
        paddingHorizontal:20,
        fontSize:16,
        //sombras no Ios
        shadowColor:'#000',
        shadowOpacity:0.2,
        shadowOffset:{
            width:4,
            height:4,
        },
        //sombra no android
        elevation: 4
    },

    loadButton:{
        width: 50,
        height:50,
        backgroundColor:'#8e4dff',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:15,
    }

});

export default Main;