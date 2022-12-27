import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View,TouchableOpacity,Alert,StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import { database } from '../firebaseConfig';
import { collection,doc,deleteDoc,updateDoc,query,where,getDocs} from 'firebase/firestore';
import { cores } from '../globalStyle';
import { AntDesign } from '@expo/vector-icons'; 
import Header from '../components/Header';

const EditDistrito = ({route}) => {
    const navigation = useNavigation();
    const {distrito} = route.params;
    const [nome,setNome] = useState(distrito.nome);
    
   

    const onSalvar =  () => {
    
      const docRef = doc(database,'Distritos',distrito.id);
      updateDoc(docRef,{nome: nome});
      navigation.goBack();

    }

    const onDelete = async () => {

      const collectionRef = collection(database,'Distritos');
      const q = query(collectionRef, where("distritoId", "==", distrito.id));
      const querySnapshot = await getDocs(q);
      if(querySnapshot.size===0){
        const docRef = doc(database,'Distritos',distrito.id);
        deleteDoc(docRef);
        navigation.goBack();
      } else {
        alert('Esta distrito está sendo utilizado e não poderá ser excluido.')
      }
    }

    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar
            animated={true}
            backgroundColor={cores.background}
            barStyle="light-content"
          />
            <Header title="Guia Bahia Extremo Sul" subTitle="Editando Distrito"/>
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
           
           <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
               <Text style={styles.buttonText}>EXCLUIR</Text>
            </TouchableOpacity>
          
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
      backButton:{
        position: 'absolute',
        width: 50,
        height: 50,
        top: 25,
        left: 15,
      }
    
  });