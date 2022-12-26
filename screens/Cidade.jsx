import React, { useEffect,useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet,SafeAreaView,View,ScrollView,TouchableOpacity,Text,StatusBar} from 'react-native';
import { database } from '../firebaseConfig';
import { collection,onSnapshot, orderBy, query,where } from 'firebase/firestore';
import ContactItem from '../components/ContactItem';
import { FontAwesome,AntDesign,MaterialIcons } from '@expo/vector-icons'; 
import { cores } from '../globalStyle';
import SearchField from '../components/SearchField';

import Header from '../components/Header';


const Cidade = ({route}) => {
  const navigation = useNavigation();
  const {cidade} = route.params;
  const [contatos,setContatos] = useState([]);
  const [categorias,setCategorias] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [cidadeId,setCidadeId] = useState(cidade.id);
  const [searchText,setSearchText] = useState('');



  useEffect(()=>{
    const collectionRef = collection(database,'Categorias');
    // const q = query(collectionRef, where("nome", "==", "Daniela"));
    const q = query(collectionRef, orderBy('nome','asc'));

    const unsuscribe = onSnapshot(q,querySnapshot => {
      setCategorias(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome} )))
    })
    setIsLoading(false);
    return unsuscribe;

}, []);


  useEffect(()=>{
    const collectionRef = collection(database,'Contatos');
    const q = query(collectionRef, where("cidadeId", "==", cidade.id));
   // const q = query(collectionRef, orderBy('nome','asc'));

    const unsuscribe = onSnapshot(q,querySnapshot => {
      setContatos(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome,telefone: doc.data().telefone,categoriaId: doc.data().categoriaId} )))
    })
    setIsLoading(false);
    return unsuscribe;

}, []);

const GetCategoryName = (categoryId) => {
  let categoryName = '' 
  for (let i=0;i<categorias.length;i++){
    if(categorias[i].id===categoryId){
      categoryName = categorias[i].nome
    }
  }
  return categoryName;
}

const onEditCidade = () => {
   navigation.navigate('EditCidade',{cidade: cidade});
}

const onAddPress = () => {
  navigation.navigate('AddContato',{cidadeId: cidadeId});
}

const onContatoPress = (contato) => {
  navigation.navigate('EditContato',{contato: contato});
}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
            animated={true}
            backgroundColor={cores.background}
            barStyle="light-content"
          />
      <Header title="Guia Bahia Extremo Sul" subTitle="Cidade"/>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
       <View style={styles.cityNamearea}>
          <Text style={styles.cityNameText}>{cidade.nome}</Text>
          <TouchableOpacity onPress={()=>onEditCidade()}>
              <MaterialIcons name="edit" size={26} color="black" />  
          </TouchableOpacity>
       </View>
       <Text style={styles.contactListTitle}>Contatos desta Cidade</Text>
       {contatos.length>0?<SearchField
            placeholder="Pesquisar"
            value={searchText}
            onChangeText={t=>setSearchText(t)}
        />:''}
       {contatos.length===0 ? <Text style={styles.noContactText}>Nenhum contato encontrado.</Text>:''}
       <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
         {contatos.filter((contato)=>contato.nome.toUpperCase().includes(searchText.toUpperCase())).sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)).map(contato => <TouchableOpacity key={contato.id} style={{width:'100%'}} onPress={()=>onContatoPress(contato)}><ContactItem key={contato.id} label={contato.nome} categoria={GetCategoryName(contato.categoriaId)}/></TouchableOpacity>)}
       </ScrollView>
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
      backgroundColor: '#000',
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
    marginBottom:10,
    color:'#fff',
    
  },
  noContactText:{
    position: 'absolute',
    top: '50%',
    left: 0,
    fontSize: 14,
    width:'100%',
    textAlign: 'center',
    color: '#fff',
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
buttonText: {
   fontWeight: 'bold',
   fontSize: 30,
   color: '#fff',
},
backButton:{
  position: 'absolute',
  width: 50,
  height: 50,
  top: 25,
  left: 15,
}
  

});