import React, { useState,useEffect } from 'react'
import { StyleSheet, Text,TouchableOpacity, Modal,View} from 'react-native';
import { cores } from '../globalStyle';
import { AntDesign } from '@expo/vector-icons';
import InputField from './InputField';
import { database } from '../firebaseConfig';
import { doc,updateDoc} from 'firebase/firestore';


const ModalEditCidade = ({modalVisible,setModalVisible,cidade}) => {
    const [nomeCidade,setNomeCidade] = useState(cidade.nome);
   
   
    const onSalvar =  () => {
    
        const docRef = doc(database,'Cidades',cidade.id);
        updateDoc(docRef,{nome: nomeCidade});
       // navigation.goBack();
        setModalVisible(false);
      }
   
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
        <View style={styles.container}>
             <View style={styles.header}>
                 <Text style={styles.titleText}>Nome da Cidade</Text>
                 <TouchableOpacity onPress={()=>setModalVisible(false)}>
                    <AntDesign name="close" size={26} color="black" />
                 </TouchableOpacity>
              </View>
              <View style={styles.body}>
              <InputField 
          
          placeholder="Digite o nome da cidade"
          value={nomeCidade}
          onChangeText={ (text) => setNomeCidade(text)}
          password={false}
          keyboard="default"
        />
     
         
          <TouchableOpacity onPress={onSalvar} style={styles.button}>
             <Text style={styles.buttonText}>SALVAR</Text>
          </TouchableOpacity>
              </View>
         </View>
    </Modal>
  )
}

export default ModalEditCidade

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent:'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop: 20,
        paddingBottom: 20,
        
    },
    header:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 5,
      marginBottom: 10,
    },
    titleText:{
       fontSize: 20,
       color: cores.backgroundColor,
       fontWeight: 'bold',
      
    },
    body:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 5,
    },
    modalItemArea:{
      flexDirection: 'column',
      alignItems: 'flex-start',  
      marginBottom: 10,
      width: '100%',
    },
    subTitleText:{
        
        fontSize: 16,
        width:'100%',
        textAlign: 'left',
    },
    valueArea: {
        backgroundColor: cores.cinzaClaro,
        width:'100%',
        borderRadius:15,
        padding:10
    }, 
    descriptionText:{
        fontSize: 14,
    } ,  
    button:{
        width: '100%',
        height: 50,
        backgroundColor: cores.botaoBackground,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        marginTop: 20,
      
      },
      buttonReject:{
        width: '100%',
        height: 50,
        backgroundColor: cores.vermelho,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        marginTop: 20,
      
      },
      buttonText:{
        color: '#fff',
        fontSize: 16,
     
        fontWeight: 'bold',
      },
   
   
  
    
  }); 