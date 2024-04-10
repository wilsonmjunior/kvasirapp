import React from 'react';
import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from "expo-font";

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import { useLoadKeys } from './src/hooks/loadKeys';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  
  const { privateKey } = useLoadKeys();

  if (!fontsLoaded && !fontError && !privateKey) {
    return <Loading />
  }

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