import React from 'react'
import { StyleSheet, View,TextInput,Text} from 'react-native';

const InputArea = ( {label,placeholder, value, onChangeText,linhas} ) => {
  return (
    <>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.inputArea}>
          <TextInput style={styles.input}
             multiline
             numberOfLines={linhas}
             placeholder={placeholder}
             value={value}
             onChangeText={onChangeText}
           
            
           />
      </View>
    </>

  )
}

export default InputArea


const styles = StyleSheet.create({
    inputArea: {
      width: '100%',
      height: 120,
      flexDirection: 'row',
      borderColor: '#c1c1c1',
      borderWidth: 1,
      paddingLeft: 10,
      alignItems: 'center',
      marginBottom: 15,
      borderRadius: 15,
    },
    input: {
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 4,
      color: '#c1c1c1',
  },
    labelText:{
        fontSize: 18,
        fontWeight: 'bold',
        width:'100%',
        paddingLeft: 10,
        marginBottom: 5,
        color: '#fff',
    }

  });
