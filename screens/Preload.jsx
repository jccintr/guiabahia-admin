import React, { useEffect } from 'react';
import { StyleSheet, Image, SafeAreaView,ActivityIndicator } from 'react-native';
import logo from '../assets/logo-300.png';
import { useNavigation } from '@react-navigation/native';
import { cores } from '../globalStyle';
import { StatusBar } from 'expo-status-bar';


const Preload = () => {
    const navigation = useNavigation();

    useEffect(()=>{
      
      setTimeout(() => { 

        navigation.reset({
          routes:[{name:'Home'}] 
        }); 

      }, 1500);
       
    }, []);



    return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
            <Image source={logo} style={styles.imagelogo}/>
            <ActivityIndicator size="large" color={cores.botaoBackground}/>
        </SafeAreaView>
       )
}

export default Preload 

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: cores.backgroundColor,
        
    },
    imagelogo:{
        height: 300,
        width: 300,
        borderRadius:150,
    },
    
  });