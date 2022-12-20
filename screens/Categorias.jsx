import React, { useEffect,useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet,SafeAreaView,ActivityIndicator,ScrollView, TouchableOpacity} from 'react-native';
import { database } from '../firebaseConfig';
import { collection,onSnapshot, orderBy, query, querySnapshot,where } from 'firebase/firestore';
import ListItem from '../components/ListItem';
import { FontAwesome } from '@expo/vector-icons'; 
import { cores } from '../globalStyle';
import SearchField from '../components/SearchField';
import { StatusBar } from 'expo-status-bar';



const Categorias = () => {
const navigation = useNavigation();
const [categorias,setCategorias] = useState([]);
const [isLoading,setIsLoading] = useState(true);
const [pesquisa,setPesquisa] = useState('');
const [searchText,setSearchText] = useState('');

useEffect(()=>{
    const collectionRef = collection(database,'Categorias');
    // const q = query(collectionRef, where("nome", "==", "Daniela"));
    const q = query(collectionRef, orderBy('nome','asc'));

    const unsuscribe = onSnapshot(q,querySnapshot => {
        setCategorias(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome,ordem: doc.data().ordem})))
    })
    setIsLoading(false);
    return unsuscribe;

}, []);

const onAddPress = () =>{
    navigation.navigate('AddCategoria');
  }

  const onCategoriaPress = (categoria) => {
    navigation.navigate('EditCategoria',{categoria: categoria})
  }

return (

    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SearchField
            placeholder="Pesquisar"
            value={searchText}
            onChangeText={t=>setSearchText(t)}
        />
        <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
           {categorias.filter((categoria)=>categoria.nome.toUpperCase().includes(searchText.toUpperCase())).map(categoria => <TouchableOpacity key={categoria.id} style={{width:'100%'}}onPress={()=>onCategoriaPress(categoria)}><ListItem key={categoria.id} label={categoria.nome} /></TouchableOpacity>)}
        </ScrollView>
        <TouchableOpacity  onPress={()=>onAddPress()}style={styles.addButton}>
           <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
        {isLoading&&<ActivityIndicator style={styles.loading} size="large" color="#00f"/>}
        
    </SafeAreaView>

    )



}

export default Categorias



const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 10,
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
    loading:{
       
        alignItems: 'center',
        justifyContent: 'flex-end',
      }

  });