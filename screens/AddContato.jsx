import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import { database } from '../firebaseConfig';
import { collection,addDoc } from 'firebase/firestore';
import { cores } from '../globalStyle';

const AddContato = () => {
    const navigation = useNavigation();
    const [nome,setNome] = useState('');
    const [telefone,setTelefone] = useState('');
    const cidadeId = 'b1P9JSVVEdbcLRQNRK8Z';
    const categoriaId = '2qlji0bDyILTZb17OvzS';
   

    const onCadastrar = async () => {
         await addDoc(collection(database,'Contatos'),{nome: nome,telefone: telefone,cidadeId: cidadeId,categoriaId: categoriaId});
         navigation.goBack();
    }

    return (
        
        <SafeAreaView style={styles.container}>
            <InputField 
           
           placeholder="Digite o nome do contato"
           value={nome}
           onChangeText={ (text) => setNome(text)}
           password={false}
           keyboard="default"
       />
        <InputField 
           
           placeholder="Digite o telefone do contato"
           value={telefone}
           onChangeText={ (text) => setTelefone(text)}
           password={false}
           keyboard="number-pad"
       />
     
       <TouchableOpacity onPress={onCadastrar} style={styles.button}>
        <Text  style={styles.buttonText}>ADICIONAR CONTATO</Text>
      </TouchableOpacity>
        </SafeAreaView>
       
       )
}

export default AddContato


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