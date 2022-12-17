import React, { useEffect,useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet,SafeAreaView,View,ScrollView, StatusBar, TouchableOpacity,Text} from 'react-native';
import { database } from '../firebaseConfig';
import { collection,onSnapshot, orderBy, query, querySnapshot,where } from 'firebase/firestore';
import ContactItem from '../components/ContactItem';
import { FontAwesome,Feather } from '@expo/vector-icons'; 
import { cores } from '../globalStyle';



const Cidade = ({route}) => {
  const navigation = useNavigation();
  const {cidade} = route.params;
  const [contatos,setContatos] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  


  useEffect(()=>{
    const collectionRef = collection(database,'Contatos');
    // const q = query(collectionRef, where("nome", "==", "Daniela"));
    const q = query(collectionRef, orderBy('nome','asc'));

    const unsuscribe = onSnapshot(q,querySnapshot => {
      setContatos(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome,telefone: doc.data().telefone} )))
    })
    setIsLoading(false);
    return unsuscribe;

}, []);


const onEditCidade = () => {
   navigation.navigate('EditCidade',{cidade: cidade});
}
const onAddPress = () => {
  navigation.navigate('AddContato');
}

const onContatoPress = (contato) => {
  navigation.navigate('EditContato',{contato: contato});
}

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.cityNamearea}>
          <Text style={styles.cityNameText}>{cidade.nome}</Text>
          <TouchableOpacity onPress={()=>onEditCidade()}>
              <Feather name="edit" size={26} color="black" />  
          </TouchableOpacity>
       </View>
       <Text style={styles.contactListTitle}>Contatos desta Cidade</Text>
       {contatos.map(contato => <TouchableOpacity key={contato.id} style={{width:'100%'}} onPress={()=>onContatoPress(contato)}><ContactItem key={contato.id} label={contato.nome} /></TouchableOpacity>)}
       <TouchableOpacity  onPress={()=>onAddPress()}style={styles.addButton}>
           <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
    </SafeAreaView>

    
  )
}

export default Cidade



const styles = StyleSheet.create({
  container: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 10,
  },
  cityNamearea:{
     width: '100%',
     height: 50,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
     marginTop: 10,
     
     backgroundColor: cores.cinzaClaro,
     paddingHorizontal:10,
     borderRadius: 10,
  },
  cityNameText:{
     fontSize: 18,
  },
  contactListTitle:{
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 22,
    width:'100%',
    textAlign: 'left',
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
buttonText: {
   fontWeight: 'bold',
   fontSize: 30,
   color: '#fff',
},
  

});