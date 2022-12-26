import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View,TouchableOpacity,StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import { database } from '../firebaseConfig';
import { collection,addDoc,onSnapshot, orderBy, query, querySnapshot,where } from 'firebase/firestore';
import { cores } from '../globalStyle';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons';


const AddDistrito = ({route}) => {
    const navigation = useNavigation();
    const [nome,setNome] = useState('');
    const cidadeId = route.params.cidadeId;
   

    const onCadastrar = async () => {
         
         await addDoc(collection(database,'Distritos'),{nome: nome,cidadeId: cidadeId});
         navigation.goBack();
    }

    return (
        
        <SafeAreaView style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor={cores.background}
            barStyle="light-content"
          />
            <Header title="Guia Bahia Extremo Sul" subTitle="Novo Distrito"/>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
            <InputField 
                label="Nome:"
                placeholder="Digite o nome do distrito"
                value={nome}
                onChangeText={ (text) => setNome(text)}
                password={false}
                keyboard="default"
            />
            
           
            <TouchableOpacity onPress={onCadastrar} style={styles.button}>
              <Text  style={styles.buttonText}>ADICIONAR DISTRITO</Text>
            </TouchableOpacity>
        </SafeAreaView>
       
       )
}

export default AddDistrito


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