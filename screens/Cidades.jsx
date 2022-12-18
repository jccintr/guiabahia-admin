import React, { useEffect,useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet,SafeAreaView,ActivityIndicator,ScrollView, StatusBar, TouchableOpacity,Dimensions} from 'react-native';
import { database } from '../firebaseConfig';
import { collection,onSnapshot, orderBy, query} from 'firebase/firestore';
import ListItem from '../components/Listitem';
import { FontAwesome } from '@expo/vector-icons'; 
import { cores } from '../globalStyle';
import SearchField from '../components/SearchField';



const Cidades = () => {
const navigation = useNavigation();
const [cidades,setCidades] = useState([]);
const [searchText,setSearchText] = useState('');
const [isLoading,setIsLoading] = useState(true);

useEffect(()=>{
    const collectionRef = collection(database,'Cidades');
    // const q = query(collectionRef, where("nome", "==", "Daniela"));
    const q = query(collectionRef, orderBy('nome','asc'));

    const unsuscribe = onSnapshot(q,querySnapshot => {
        setCidades(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome} )))
    })
    setIsLoading(false);
    return unsuscribe;

}, []);

const onAddPress = () =>{
    navigation.navigate('AddCidade');
  }

  const onCidadePress = (cidade) => {
    //navigation.navigate('EditCidade',{cidade: cidade});
    navigation.navigate('Cidade',{cidade: cidade});
  }

return (

    <SafeAreaView style={styles.container}>
        <StatusBar/>
        <SearchField
            placeholder="Pesquisar"
            value={searchText}
            onChangeText={t=>setSearchText(t)}
        />
        <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
          {cidades.filter((cidade)=>cidade.nome.toUpperCase().includes(searchText.toUpperCase())).map(cidade => <TouchableOpacity key={cidade.id} style={{width:'100%'}} onPress={()=>onCidadePress(cidade)}><ListItem key={cidade.id} label={cidade.nome} /></TouchableOpacity>)}
        </ScrollView>
        <TouchableOpacity  onPress={()=>onAddPress()}style={styles.addButton}>
           <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
        
        {isLoading&&<ActivityIndicator style={styles.loading} size="large" color="#00f"/>}
    </SafeAreaView>

    )



}

export default Cidades



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