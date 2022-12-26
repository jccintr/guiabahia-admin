import React from 'react';

import { StyleSheet,Text,View } from 'react-native';
import { database } from '../firebaseConfig';
import { deleteDoc,doc,updateDoc } from 'firebase/firestore';
import { Entypo } from '@expo/vector-icons';


const ContactItem = ({label,categoria}) => {
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.text}>{label}</Text>
            <Text style={styles.categoryText}>{categoria}</Text>
        </View>
        <Entypo name="chevron-small-right" size={30} color="black" />  
    </View>
  )
}

export default ContactItem

const styles = StyleSheet.create({
    
    container:{
      
       height: 50,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       borderBottomColor: '#c1c1c1',
       borderBottomWidth: 1,
    },
    textArea:{
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
   text:{
      fontSize: 18,
      color: '#fff'
     
   },
   categoryText:{
    fontSize: 12,
    fontStyle: 'italic',
    color: '#fff',
   }
    
    
   
  });