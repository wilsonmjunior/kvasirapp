import React from 'react';
import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from "expo-font";

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  
  if (!fontsLoaded && !fontError) {
    return <Loading />
  }

  console.warn('Font loading: ',fontsLoaded, fontError);
  

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
}