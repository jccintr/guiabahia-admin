import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View, StatusBar, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { cores } from '../globalStyle';
import Header from '../components/Header';
import InputField from '../components/InputField';
import InputArea from '../components/InputArea';
import { AntDesign } from '@expo/vector-icons'; 


const Parametros = () => {
  const navigation = useNavigation();
  const [zap,setZap] = useState('');
  const [mensagem,setMensagem] = useState('');


  const onSalvar =  () => {

   
  
  }




  return (
    <SafeAreaView style={styles.container}>
       <StatusBar
            animated={true}
            backgroundColor={cores.background}
            barStyle="light-content"
          />
            <Header title="Guia Bahia Extremo Sul" subTitle="Parâmetros"/>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
          <InputField 
            label="WhatsApp:"
            placeholder="Digite o número do WhatsApp"
            value={zap}
            onChangeText={ (text) => setZap(text)}
            password={false}
            keyboard="default"
          />
          <InputArea 
                  label="Mensagem:"
                  placeholder="Informe a mensagem"
                  value={mensagem}
                  onChangeText={t=>setMensagem(t)}
                  linhas={3}
                  
                />
          <TouchableOpacity onPress={onSalvar} style={styles.button}>
               <Text style={styles.buttonText}>SALVAR</Text>
            </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Parametros


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: cores.background,
        paddingHorizontal: 5,
    },
    body:{
        marginTop: 10,  
        flex:1,
        width: '100%',
        paddingHorizontal: 20,
        alignItems:'center',
        justifyContent: 'center',
      },
   
    backButton:{
      position: 'absolute',
      width: 50,
      height: 50,
      top: 25,
      left: 15,
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
   
    
  });