import React from 'react';
import { StyleSheet, Text, SafeAreaView,View,ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { cores } from '../globalStyle';



const Home = () => {
    const navigation = useNavigation();
    

    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <TouchableOpacity style={styles.menu} onPress={()=>navigation.navigate('Cidades')}>
                <Text style={styles.menuText}>Cadastro de Cidades</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu} onPress={()=>navigation.navigate('Categorias')}>
                <Text style={styles.menuText}>Cadastro de Categorias</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu} onPress={()=>navigation.navigate('Categorias')}>
                <Text style={styles.menuText}>Cadastro de Contatos</Text>
            </TouchableOpacity>
           
        </SafeAreaView>
       
       )
}

export default Home


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    menu:{
        width: '90%',
        height: 50,
        backgroundColor: cores.botaoBackground,
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