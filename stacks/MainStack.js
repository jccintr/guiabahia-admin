import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Preload from "../screens/Preload";
import Home from '../screens/Home';
import Cidades from "../screens/Cidades";
import AddCidade from "../screens/AddCidade";
import EditCidade from "../screens/EditCidade";
import Categorias from "../screens/Categorias";
import AddCategoria from "../screens/AddCategoria";
import EditCategoria from "../screens/EditCategoria";
import Cidade from "../screens/Cidade";
import AddContato from "../screens/AddContato";
import EditContato from "../screens/EditContato";
import AddDistrito from "../screens/AddDistrito";
import EditDistrito from "../screens/EditDistrito";



const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true}} initialRouteName="Preload">
        <Stack.Screen  name="Preload" options={{ headerShown: false }} component={Preload}/>
        <Stack.Screen  name="Home"  options={{ headerShown: false }} component={Home}/>
        <Stack.Screen  name="Cidades" options={{ headerShown: false }}  component={Cidades}/>
        <Stack.Screen  name="AddCidade"  options={{ headerShown: false }} component={AddCidade}/>
        <Stack.Screen  name="EditCidade" options={{ headerShown: false }}component={EditCidade}/>
        <Stack.Screen  name="Categorias" options={{ headerShown: false }} component={Categorias}/>
        <Stack.Screen  name="AddCategoria" options={{ headerShown: false }} component={AddCategoria}/>
        <Stack.Screen  name="EditCategoria" options={{ headerShown: false }} component={EditCategoria}/>
        <Stack.Screen  name="Cidade"  options={{ headerShown: false }} component={Cidade}/>
        <Stack.Screen  name="AddContato" options={{ headerShown: false }} component={AddContato}/>
        <Stack.Screen  name="EditContato" options={{ headerShown: false }} component={EditContato}/>
        <Stack.Screen  name="AddDistrito" options={{ headerShown: false }} component={AddDistrito}/>
        <Stack.Screen  name="EditDistrito" options={{ headerShown: false }} component={EditDistrito}/>
    </Stack.Navigator>
  )
}

export default MainStack