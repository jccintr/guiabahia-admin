import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View,TouchableOpacity,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import { database } from '../firebaseConfig';
import { doc,deleteDoc,updateDoc} from 'firebase/firestore';
import { cores } from '../globalStyle';

const EditCategoria = ({route}) => {
    const navigation = useNavigation();
    const {categoria} = route.params;
    const [nomeCategoria,setNomeCategoria] = useState(categoria.nome);
    const [ordemCategoria,setOrdemCategoria] = useState(categoria.ordem);
   
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
    
      const docRef = doc(database,'Categorias',categoria.id);
      updateDoc(docRef,{nome: nomeCategoria,ordem: ordemCategoria});
      navigation.goBack();

    }

    const onDelete = async () => {
        const docRef = doc(database,'Categorias',categoria.id);
        deleteDoc(docRef);
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
           label="Ordem de Exibição"
           placeholder="Digite a ordem da categoria"
           value={ordemCategoria.toString()}
           onChangeText={ (text) => setOrdemCategoria(text*1)}
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

export default EditCategoria


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