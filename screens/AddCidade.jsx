import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View,TouchableOpacity,StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import { database } from '../firebaseConfig';
import { collection,addDoc } from 'firebase/firestore';
import { cores } from '../globalStyle';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons'; 

const AddCidade = () => {
    const navigation = useNavigation();
    const [nomeCidade,setNomeCidade] = useState('');
    
   

    const onCadastrar = async () => {
         const docRef = await addDoc(collection(database,'Cidades'),{nome: nomeCidade});
         await addDoc(collection(database,'Distritos'),{nome: 'Sede',cidadeId: docRef.id});
         navigation.goBack();
    }

    return (
        
        <SafeAreaView style={styles.container}>
           <StatusBar
            animated={true}
            backgroundColor={cores.background}
            barStyle="light-content"
          />
            <Header title="Guia Bahia Extremo Sul" subTitle="Nova Cidade"/>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
            <InputField 
           label="Nome:"
           placeholder="Digite o nome da cidade"
           value={nomeCidade}
           onChangeText={ (text) => setNomeCidade(text)}
           password={false}
           keyboard="default"
       />
     
       <TouchableOpacity onPress={onCadastrar} style={styles.button}>
        <Text  style={styles.buttonText}>ADICIONAR CIDADE</Text>
      </TouchableOpacity>
        </SafeAreaView>
       
       )
}

export default AddCidade


const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000',
        paddingHorizontal: 5,
   
        
    },
    button:{
        height: 50,
        width: '100%',
        backgroundColor: cores.verde,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
      
      },
      buttonText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      backButton:{
        position: 'absolute',
        width: 50,
        height: 50,
        top: 25,
        left: 15,
      }
    
  });