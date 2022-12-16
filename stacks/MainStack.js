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


const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true}} initialRouteName="Home">
        <Stack.Screen  name="Preload"  component={Preload}/>
        <Stack.Screen  name="Home" options={{ title: 'Guia Bahia Admin' }} component={Home}/>
        <Stack.Screen  name="Cidades" options={{ title: 'Cadastro de Cidades' }} component={Cidades}/>
        <Stack.Screen  name="AddCidade" options={{ title: 'Nova Cidade' }} component={AddCidade}/>
        <Stack.Screen  name="EditCidade" options={{ title: 'Editando Cidade' }} component={EditCidade}/>
        <Stack.Screen  name="Categorias" options={{ title: 'Categorias' }} component={Categorias}/>
        <Stack.Screen  name="AddCategoria" options={{ title: 'Nova Categoria' }} component={AddCategoria}/>
        <Stack.Screen  name="EditCategoria" options={{ title: 'Editando Categoria' }} component={EditCategoria}/>
    </Stack.Navigator>
  )
}

export default MainStack