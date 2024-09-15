import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function Menu() {
  const navigation = useNavigation();
  const { userProfile } = useAuth();

  const handlePress = () => {
    if (userProfile?.type === 'Volunteer') {
      navigation.navigate('EventApplyScreen');
    } else if (userProfile?.type === 'Organization') {
      navigation.navigate('OrganizationPage');
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.topMenu}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={24} color="#d4eaf7" />
      </TouchableOpacity>

      {userProfile ? (
        <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
          <Ionicons name="search" size={24} color="#d4eaf7" />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person" size={24} color="#d4eaf7" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#00668c', 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
