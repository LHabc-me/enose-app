import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NativeBaseProvider, Box } from "native-base";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, [SplashScreen]);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
