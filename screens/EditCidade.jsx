import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View,TouchableOpacity,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import { database } from '../firebaseConfig';
import { doc,deleteDoc,updateDoc} from 'firebase/firestore';
import { cores } from '../globalStyle';

const EditCidade = ({route}) => {
    const navigation = useNavigation();
    const {cidade} = route.params;
    const [nomeCidade,setNomeCidade] = useState(cidade.nome);
   
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
    
      const docRef = doc(database,'Cidades',cidade.id);
      updateDoc(docRef,{nome: nomeCidade});
      cidade.nome = nomeCidade;
      
      navigation.navigate('Cidade',{cidade: cidade});

    }

    const onDelete = async () => {
        const docRef = doc(database,'Contatos',contact.id);
        deleteDoc(docRef);
        navigation.goBack();
    }

    return (
        
        <SafeAreaView style={styles.container}>
            <InputField 
            label="Nome:"
            placeholder="Digite o nome da cidade"
            value={nomeCidade}
            onChangeText={ (text) => setNomeCidade(text)}
            password={false}
            keyboard="default"
          />
       
            
            <TouchableOpacity onPress={onSalvar} style={styles.button}>
               <Text style={styles.buttonText}>SALVAR</Text>
            </TouchableOpacity>

        </SafeAreaView>
       
       )
}

export default EditCidade


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