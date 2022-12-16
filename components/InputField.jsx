import React from 'react'
import { StyleSheet, View,TextInput} from 'react-native';


const InputField = ( {placeholder, value, onChangeText, password,keyboard} ) => {
  return (
    <View style={styles.inputArea}>
      <TextInput style={styles.input}
         placeholder={placeholder}
         value={value}
         onChangeText={onChangeText}
         secureTextEntry={password}
         keyboardType={keyboard}
       />
    </View>
  )
}

export default InputField


const styles = StyleSheet.create({
    inputArea: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderColor: '#c1c1c1',
        borderWidth: 1,
        paddingLeft: 5,
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 15,
    },
    input: {
      flex: 1,
      fontSize: 16,
       
      color: '#000',
      marginLeft: 10,
    },
   
  });