import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import { database } from '../firebaseConfig';
import { collection,addDoc } from 'firebase/firestore';
import { cores } from '../globalStyle';

const AddCategoria = () => {
    const navigation = useNavigation();
    const [nomeCategoria,setNomeCategoria] = useState('');
    const [ordemCategoria,setOrdemCategoria] = useState(1);
    
   

    const onCadastrar = async () => {
         await addDoc(collection(database,'Categorias'),{nome: nomeCategoria,ordem: ordemCategoria});
         navigation.goBack();
    }

    return (
        
        <SafeAreaView style={styles.container}>
            <InputField 
           label="Nome"
           placeholder="Digite o nome da categoria"
           value={nomeCategoria}
           onChangeText={ (text) => setNomeCategoria(text)}
           password={false}
           keyboard="default"
       />
        <InputField 
           label="Nome"
           placeholder="Digite a ordem da categoria"
           value={ordemCategoria}
           onChangeText={ (text) => setOrdemCategoria(text*1)}
           password={false}
           keyboard="number-pad"
       />
     
       <TouchableOpacity onPress={onCadastrar} style={styles.button}>
        <Text  style={styles.buttonText}>ADICIONAR CATEGORIA</Text>
      </TouchableOpacity>
        </SafeAreaView>
       
       )
}

export default AddCategoria


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