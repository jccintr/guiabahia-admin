import React from 'react';

import { StyleSheet,Text,View } from 'react-native';
import { database } from '../firebaseConfig';
import { deleteDoc,doc,updateDoc } from 'firebase/firestore';
import { Entypo } from '@expo/vector-icons';


const ListItem = ({label}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
        <Entypo name="chevron-small-right" size={30} color="black" />  
    </View>
  )
}

export default ListItem

const styles = StyleSheet.create({
    
    container:{
      
       height: 50,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       borderBottomColor: '#c1c1c1',
       borderBottomWidth: 1,
    },
   text:{
      fontSize: 18,
     
   },
    
    
   
  });