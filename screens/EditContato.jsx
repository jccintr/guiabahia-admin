import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView,TouchableOpacity,StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import { database } from '../firebaseConfig';
import { doc,deleteDoc,updateDoc} from 'firebase/firestore';
import { cores } from '../globalStyle';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons'; 

const EditContato = ({route}) => {
    const navigation = useNavigation();
    const {contato} = route.params;
    const [nome,setNome] = useState(contato.nome);
    const [telefone,setTelefone] = useState(contato.telefone);
   
    /*
    const deleteAlert = () =>
    Alert.alert(
      "Atenção !",
      "Deseja realmente excluir este contato ?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Excluir", onPress: () => console.log("OK Pressed") }
      ]
    );
    */

    const onSalvar =  () => {
    
      const docRef = doc(database,'Contatos',contato.id);
      updateDoc(docRef,{nome: nome,telefone: telefone});
      navigation.goBack();

    }

    const onDelete = async () => {
        const docRef = doc(database,'Contatos',contato.id);
        deleteDoc(docRef);
        navigation.goBack();
    }

    return (
        
        <SafeAreaView style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor={cores.background}
            barStyle="light-content"
          />
            <Header title="Guia Bahia Extremo Sul" subTitle="Editando Contato"/>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
            <InputField 
            label="Nome:"
            placeholder="Digite o nome do contato"
            value={nome}
            onChangeText={ (text) => setNome(text)}
            password={false}
            keyboard="default"
          />
            <InputField 
            label="Telefone:"
           placeholder="Digite o telefone do contato"
           value={telefone}
           onChangeText={ (text) => setTelefone(text)}
           password={false}
           keyboard="number-pad"
       />
       
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
               <Text style={styles.buttonText}>EXCLUIR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSalvar} style={styles.button}>
               <Text style={styles.buttonText}>SALVAR</Text>
            </TouchableOpacity>

        </SafeAreaView>
       
       )
}

export default EditContato


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
      deleteButton:{
        height: 50,
        width: '100%',
        backgroundColor: cores.vermelho,
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
      backButton:{
        position: 'absolute',
        width: 50,
        height: 50,
        top: 25,
        left: 15,
      }
    
  });