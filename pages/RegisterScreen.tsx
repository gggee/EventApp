import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { signIn } = useAuth();

  const handleVolunteerPress = async () => {
    const userData = { userType: 'Volunteer' }; 
    await signIn(userData);
    navigation.navigate('SignUpVolunteer');
  };

  const handleOrganizationPress = async () => {
    const userData = { userType: 'Organization' }; 
    await signIn(userData);
    navigation.navigate('SignUpOrganization');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Вы проходите регистрацию как</Text>
      <TouchableOpacity style={styles.button} onPress={handleVolunteerPress}>
        <Text style={styles.buttonText}>Волонтер</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleOrganizationPress}>
        <Text style={styles.buttonText}>Организатор</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4eaf7', 
    padding: 20,
  },
  txt: {
    textAlign: 'center',
    fontSize: 20,
    color: '#2e2e2e',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00668c',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
