import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View,TouchableOpacity,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import { database } from '../firebaseConfig';
import { doc,updateDoc} from 'firebase/firestore';
import { cores } from '../globalStyle';
import { StatusBar } from 'expo-status-bar';

const EditDistrito = ({route}) => {
    const navigation = useNavigation();
    const {distrito} = route.params;
    const [nome,setNome] = useState(distrito.nome);
    
   

    const onSalvar =  () => {
    
      const docRef = doc(database,'Distritos',distrito.id);
      updateDoc(docRef,{nome: nome});
      navigation.goBack();

    }
/*
    const onDelete = async () => {
        const docRef = doc(database,'Categorias',categoria.id);
        deleteDoc(docRef);
        navigation.goBack();
    }
*/
    return (
        
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
            <InputField 
            label="Nome:"
            placeholder="Digite o nome do distrito"
            value={nome}
            onChangeText={ (text) => setNome(text)}
            password={false}
            keyboard="default"
          />
           
       
          
            <TouchableOpacity onPress={onSalvar} style={styles.button}>
               <Text style={styles.buttonText}>SALVAR</Text>
            </TouchableOpacity>

        </SafeAreaView>
       
       )
}

export default EditDistrito


const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 5,
    },
    button:{
        height: 50,
        width: '100%',
        backgroundColor: cores.botaoBackground,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
      },
      deleteButton:{
        height: 50,
        width: '100%',
        backgroundColor: "#f00",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
        marginBottom: 10,
      },
      buttonText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
    
  });