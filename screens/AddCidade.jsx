import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import { database } from '../firebaseConfig';
import { collection,addDoc } from 'firebase/firestore';
import { cores } from '../globalStyle';

const AddCidade = () => {
    const navigation = useNavigation();
    const [nomeCidade,setNomeCidade] = useState('');
    
   

    const onCadastrar = async () => {
         await addDoc(collection(database,'Cidades'),{nome: nomeCidade});
         navigation.goBack();
    }

    return (
        
        <SafeAreaView style={styles.container}>
            <InputField 
           label="Nome"
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
        paddingTop: 40,
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
      buttonText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
    
  });