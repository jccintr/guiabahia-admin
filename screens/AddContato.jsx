import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View,TouchableOpacity,StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import InputField from '../components/InputField';
import { database } from '../firebaseConfig';
import { collection,addDoc,onSnapshot, orderBy, query, querySnapshot,where } from 'firebase/firestore';
import { cores } from '../globalStyle';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons'; 


const AddContato = ({route}) => {
    const navigation = useNavigation();
    const [nome,setNome] = useState('');
    const [telefone,setTelefone] = useState('');
    const cidadeId = route.params.cidadeId;
    const [categoriaId,setCategoriaId] = useState('');
    const [categorias,setCategorias] = useState([]);
    const [distritoId,setDistritoId] = useState('');
    const [distritos,setDistritos] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
   

    useEffect(()=>{
      const collectionRef = collection(database,'Distritos');
      const q = query(collectionRef, where("cidadeId", "==", cidadeId));
      
      const unsuscribe = onSnapshot(q,querySnapshot => {
        setDistritos(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome} )))
      })
      setIsLoading(false);
      return unsuscribe;
  
  }, []);



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


    const onCadastrar = async () => {
         
         await addDoc(collection(database,'Contatos'),{nome: nome,telefone: telefone,cidadeId: cidadeId,distritoId: distritoId,categoriaId: categoriaId});
         navigation.goBack();
    }

    return (
        
        <SafeAreaView style={styles.container}>
         <StatusBar
            animated={true}
            backgroundColor={cores.background}
            barStyle="light-content"
          />
            <Header title="Guia Bahia Extremo Sul" subTitle="Editando Contato"/>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
            <InputField 
                label="Nome:"
                placeholder="Digite o nome do contato"
                value={nome}
                onChangeText={ (text) => setNome(text)}
                password={false}
                keyboard="default"
            />
            <InputField 
              label="Telefone:"
              placeholder="Digite o telefone do contato"
              value={telefone}
              onChangeText={ (text) => setTelefone(text)}
              password={false}
              keyboard="number-pad"
            />
            <Text style={styles.labelText}>Categoria:</Text>
            <Picker
                  style={{width: '100%', backgroundColor: cores.cinzaClaro,borderRadius: 10,marginBottom:10}} 
                  selectedValue={categoriaId}
                  onValueChange={(itemValue, itemIndex)=>setCategoriaId(itemValue)
                }>
                {categorias.map(categoria=><Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id} />)}
             </Picker>
            <Text style={styles.labelText}>Distrito:</Text>
             <Picker
                  style={{width: '100%', backgroundColor: cores.cinzaClaro,borderRadius: 10,marginBottom:10}} 
                  selectedValue={distritoId}
                  onValueChange={(itemValue, itemIndex)=>setDistritoId(itemValue)
                }>
                {distritos.map(distrito=><Picker.Item key={distrito.id} label={distrito.nome} value={distrito.id} />)}
             </Picker>
      
            <TouchableOpacity onPress={onCadastrar} style={styles.button}>
              <Text  style={styles.buttonText}>ADICIONAR CONTATO</Text>
            </TouchableOpacity>
        </SafeAreaView>
       
       )
}

export default AddContato


const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: cores.background,
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
      labelText:{
        fontSize: 18,
        fontWeight: 'bold',
        width:'100%',
        paddingLeft: 10,
        marginBottom: 5,
     },
     backButton:{
      position: 'absolute',
      width: 50,
      height: 50,
      top: 25,
      left: 15,
    }
    
  });