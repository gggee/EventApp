import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Помоги и предложи помощь в <Text style={styles.highlightText}>HelpHub</Text>
      </Text>
      <Text style={styles.descriptionText}>
        Приложение помогает волонтерам найти событие, чтобы помочь в его проведении. А организациям найти волонтеров для помощи.
      </Text>
      <ImageBackground 
        source={require('../assets/help.jpg')} 
        style={styles.imgBackground}
      />
      <Image 
        source={require('../assets/talk.jpg')} 
        style={styles.imgOverlay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  headerText: {
    fontSize: 28, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  highlightText: {
    color: '#00668c',
  },
  descriptionText: {
    fontSize: 18, 
    textAlign: 'center',
    marginBottom: 20,
  },
  imgBackground: {
    position: 'absolute',
    bottom: '42%',
    right: 95,
    width: '80%',
    height: '60%',
    resizeMode: 'cover',
  },
  imgOverlay: {
    position: 'absolute',
    bottom: 40,
    right: 0,
    width: '50%',
    height: '20%',
    resizeMode: 'cover',
  },
});
