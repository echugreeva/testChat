import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect, useCallback } from 'react';
import Signup from './screens/Signup';
import Chats from './screens/Chats';
import Messages from './screens/Messages'

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState('');

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        {user ?
          <>
            <Stack.Screen name="Messages" options={() => ({
              headerBackVisible: false,
            })}>
              {props => <Messages {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Chats" options={({ route }) => ({
              title: route.params.name,
              headerBackTitleVisible: false
            })}>
              {props => <ChatScreen {...props} user={user} />}
            </Stack.Screen>
          </>
          :

          <Stack.Screen name="Auth" component={Signup} options={() => ({
            headerBackVisible: false,
            headerShown: false,
          })} />
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  iconColor: {
    color: '009387',
  }
});
