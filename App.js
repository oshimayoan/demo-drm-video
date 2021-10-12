import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import VideoPlayer from "./RNVideo";

export default function App() {
  let [isIVQVisible, setIVQVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 24, width: '100%' }}>
        <VideoPlayer isIVQVisible={isIVQVisible} />
        <Button 
          title="Toggle IVQ" 
          onPress={() => setIVQVisible(s => !s)}
        />
      </View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
