import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from "expo-font";

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  
  if (!fontsLoaded && !fontError) {
    return <Loading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </GestureHandlerRootView>
  );
}