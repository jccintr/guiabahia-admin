import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView,TouchableOpacity,ScrollView,StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import ListItem from '../components/ListItem';
import { database } from '../firebaseConfig';
import { doc,deleteDoc,updateDoc,collection,query,where,onSnapshot,getDocs} from 'firebase/firestore';
import { cores } from '../globalStyle';
import Header from '../components/Header';
import { FontAwesome,AntDesign } from '@expo/vector-icons'; 


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
  const collectionRef = collection(database,'Contatos');
  const q = query(collectionRef, where("cidadeId", "==", cidade.id));
  const querySnapshot = await getDocs(q);
  if(querySnapshot.size===0 && distritos.length === 0){
    const docRef = doc(database,'Cidades',cidade.id);
    deleteDoc(docRef);
    navigation.navigate('Cidades');
  } else {
    alert('Esta cidade está sendo utilizada e não poderá ser excluida.')
  }

}

const onAddPress = () => {
  navigation.navigate('AddDistrito',{cidadeId: cidade.id});
}

const onDistritoPress = (distrito) => {
  navigation.navigate('EditDistrito',{distrito: distrito});
}

    return (
        
        <SafeAreaView style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor={cores.background}
            barStyle="light-content"
          />
            <Header title="Guia Bahia Extremo Sul" subTitle="Editando Cidade"/>
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
             <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
               <Text style={styles.buttonText}>EXCLUIR</Text>
            </TouchableOpacity>
            
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
      districtTitle:{
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 22,
        width:'100%',
        textAlign: 'left',
        marginBottom:10,
        color:'#fff',
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
        backgroundColor: cores.verde,
    },
    backButton:{
      position: 'absolute',
      width: 50,
      height: 50,
      top: 25,
      left: 15,
    }
   
    
  });