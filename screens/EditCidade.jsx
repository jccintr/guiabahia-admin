import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView,TouchableOpacity,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import ListItem from '../components/ListItem';
import { database } from '../firebaseConfig';
import { doc,deleteDoc,updateDoc,collection,query,where,onSnapshot} from 'firebase/firestore';
import { cores } from '../globalStyle';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons'; 


const EditCidade = ({route}) => {
    const navigation = useNavigation();
    const {cidade} = route.params;
    const [nomeCidade,setNomeCidade] = useState(cidade.nome);
    const [distritos,setDistritos] = useState([]);

   
  useEffect(()=>{
    const collectionRef = collection(database,'Distritos');
    const q = query(collectionRef, where("cidadeId", "==", cidade.id));
    const unsuscribe = onSnapshot(q,querySnapshot => {
      setDistritos(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome} )))
    })
    
    return unsuscribe;

}, []);

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

const onAddPress = () => {
  navigation.navigate('AddDistrito',{cidadeId: cidade.id});
}

const onDistritoPress = (distrito) => {
  navigation.navigate('EditDistrito',{distrito: distrito});
}

    return (
        
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
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
            <Text style={styles.districtTitle}>Distritos desta Cidade</Text>
            <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
         {distritos.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)).map(distrito => <TouchableOpacity key={distrito.id} style={{width:'100%'}} onPress={()=>onDistritoPress(distrito)}><ListItem key={distrito.id} label={distrito.nome} /></TouchableOpacity>)}
       </ScrollView>
       <TouchableOpacity  onPress={()=>onAddPress()}style={styles.addButton}>
           <FontAwesome name="plus" size={24} color="white" />
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
      districtTitle:{
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 22,
        width:'100%',
        textAlign: 'left',
        marginBottom:10,
      },
      addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: cores.botaoBackground,
    },
   
    
  });