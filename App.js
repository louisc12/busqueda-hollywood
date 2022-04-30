import 'react-native-gesture-handler';
import React from 'react';
import {ScrollView,StyleSheet,Text,View} from 'react-native';
import Home from './views/home';
import Detalles from './views/Detalles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' >
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='detalles' component={Detalles}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
