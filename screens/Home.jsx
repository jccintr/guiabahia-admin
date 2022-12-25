import React from 'react';
import { StyleSheet, Text, SafeAreaView,View, StatusBar, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { cores } from '../globalStyle';
import Header from '../components/Header';



const Home = () => {
    const navigation = useNavigation();
    

    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar
            animated={true}
            backgroundColor={cores.background}
            barStyle="light-content"
          />
            <Header title="Guia Bahia Extremo Sul" subTitle="Admin"/>
            <View style={styles.body}>
            <TouchableOpacity style={styles.menu} onPress={()=>navigation.navigate('Cidades')}>
                <Text style={styles.menuText}>Cadastro de Cidades</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu} onPress={()=>navigation.navigate('Categorias')}>
                <Text style={styles.menuText}>Cadastro de Categorias</Text>
            </TouchableOpacity>
            </View>
           
           
        </SafeAreaView>
       
       )
}

export default Home


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
    menu:{
        width: '90%',
        height: 50,
        backgroundColor: cores.verde,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        marginBottom: 20,
      
      },
     menuText: {
       fontWeight: 'bold',
       fontSize: 20,
       color: '#fff',
      
       
    },
    
  });