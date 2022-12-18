import React from 'react'
import { StyleSheet, View,TextInput,Text} from 'react-native';


const InputField = ( {label,placeholder, value, onChangeText, password,keyboard} ) => {
  return (
    <>
    <Text style={styles.labelText}>{label}</Text>
    <View style={styles.inputArea}>
      <TextInput style={styles.input}
         placeholder={placeholder}
         value={value}
         onChangeText={onChangeText}
         secureTextEntry={password}
         keyboardType={keyboard}
       />
    </View>
    </>
  )
}

export default InputField


const styles = StyleSheet.create({
    inputArea: {
        width: '100%',
        height: 50,
        flexDirection: 'column',
        borderColor: '#c1c1c1',
        borderWidth: 1,
        paddingLeft: 5,
        alignItems: 'flex-start',
        marginBottom: 15,
        borderRadius: 15,
    },
    labelText:{
       fontSize: 18,
       fontWeight: 'bold',
       width:'100%',
       paddingLeft: 10,
       marginBottom: 5,
    },
    input: {
      flex: 1,
      fontSize: 16,
       
      color: '#000',
      marginLeft: 10,
    },
   
  });