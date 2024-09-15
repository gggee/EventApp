import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SignUpVolunteerScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bDay, setBDay] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const { signIn } = useAuth();

  const handleBirthDateChange = (text) => {
    let formattedText = text
      .replace(/\D/g, '')  
      .replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3'); 
    setBDay(formattedText.substring(0, 10));  
  };

  const handleSubmit = () => {
    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать не менее 6 символов');
      return;
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      Alert.alert('Ошибка', 'Электронная почта должна быть домена @gmail.com');
      return;
    }

    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Ошибка', 'Номер телефона должен содержать только цифры и быть длиной 11 символов');
      return;
    }

    const birthDateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!birthDateRegex.test(bDay)) {
      Alert.alert('Ошибка', 'Дата рождения должна быть в формате ДД.ММ.ГГГГ');
      return;
    }

    const userProfile = {
      fullName,
      phone,
      bDay,
      email,
      experience,
      type: 'Volunteer', 
    };

    signIn(userProfile);
    navigation.navigate('Profile');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="ФИО"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Телефон"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Дата рождения (ДД.ММ.ГГГГ)"
          value={bDay}
          onChangeText={handleBirthDateChange}  
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={styles.label}>Есть ли у вас опыт в волонтерстве?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.experienceButton, experience === 'Yes' && styles.activeButton]}
            onPress={() => setExperience('Yes')}
          >
            <Text style={styles.buttonText}>Да</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.experienceButton, experience === 'No' && styles.activeButton]}
            onPress={() => setExperience('No')}
          >
            <Text style={styles.buttonText}>Нет</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  input: {
    height: 50,
    borderColor: '#00668c',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  experienceButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#cccccc',
    borderRadius: 25,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#00668c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#00668c',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
