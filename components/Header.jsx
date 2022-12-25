import React from 'react'
import { StyleSheet,Text,SafeAreaView} from 'react-native';
import { cores } from '../globalStyle';


const Header = ({title,subTitle}) => {
  return (
    <SafeAreaView style={styles.container}>
       <Text style={styles.title}>{title}</Text>
       <Text style={styles.subTitle}>{subTitle}</Text>
    </SafeAreaView>
    
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
       
      width: '100%',
      height: 70,
      backgroundColor: cores.background,
      alignItems: 'center',
      justifyContent: 'center',
     
     },
    title:{
      fontWeight:'bold',
      fontSize: 24,
      color: cores.branco,
    },
    subTitle:{
        fontWeight:'bold',
        fontSize: 18,
        color: cores.branco,
    }
  
  }); 