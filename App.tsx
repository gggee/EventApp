import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import Menu from './pages/Menu';
import ProfileScreen from './pages/ProfileScreen';
import RegisterScreen from './pages/RegisterScreen';
import SignUpVolunteerScreen from './pages/SignUpVolunteer';
import SignUpOrganizationScreen from './pages/SignUpOrganizationScreen';
import EventApplyScreen from './pages/EventApplyScreen';
import AddEventScreen from './pages/AddEventScreen';
import OrganizationPage from './componets/OrganizationPage';
import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#00668c',
            },
            headerTintColor: '#d4eaf7',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpVolunteer" component={SignUpVolunteerScreen} options={{ headerShown: true, title: 'Регистрация волонтера' }} />
          <Stack.Screen name="SignUpOrganization" component={SignUpOrganizationScreen} options={{ headerShown: true, title: 'Регистрация организации' }} />
          <Stack.Screen name="EventApplyScreen" component={EventApplyScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddEventScreen" component={AddEventScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OrganizationPage" component={OrganizationPage} options={{ headerShown: false }} />
        </Stack.Navigator>
        <Menu />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4eaf7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#2e2e2e',
  },
  button: {
    backgroundColor: '#00668c',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#d4eaf7',
  },
});
