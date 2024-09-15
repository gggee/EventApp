import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const appliedEvents = [
  {
    id: '1',
    title: 'Очистка берега пляжа от мусора',
    organization: 'Eco Foundation',
    date: '15.10.2024',
    type: 'Окружающая среда',
    status: 'Заявка в обработке',
  },
  {
    id: '2',
    title: 'Продуктовый сбор',
    organization: 'Community Helpers',
    date: '22.10.2024',
    type: 'Социальное',
    status: 'Заявка в обработке',
  },
];

const volunteerApplications = [
  {
    id: '1',
    fullName: 'Иван Иванов',
    bDay: '01.01.1990',
    availability: '3-6 часов',
    experience: '2 года',
    event: 'Очистка берега пляжа от мусора',
  },
  {
    id: '2',
    fullName: 'Мария Петрова',
    bDay: '15.03.1985',
    availability: 'менее 3 часа',
    experience: '1 год',
    event: 'Продуктовый сбор',
  },
];

export default function ProfileScreen({ navigation }) {
  const { isAuthenticated, userProfile, signOut } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Register');
    }
  }, [isAuthenticated, navigation]);

  if (!isAuthenticated) {
    return <SafeAreaView style={styles.container}><Text>Loading...</Text></SafeAreaView>;
  }

  const renderAppliedEvent = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardText}>Организация: {item.organization}</Text>
      <Text style={styles.cardText}>Дата: {item.date}</Text>
      <Text style={styles.cardText}>Тип: {item.type}</Text>
      <Text style={styles.cardTextStatus}>Статус: {item.status}</Text>
    </View>
  );

  const renderVolunteerApplication = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.fullName}</Text>
      <Text style={styles.cardText}>Дата рождения: {item.bDay}</Text>
      <Text style={styles.cardText}>Доступное время: {item.availability}</Text>
      <Text style={styles.cardText}>Опыт: {item.experience || 'Не указано'}</Text>
      <Text style={styles.cardTextStatus}>Мероприятие: {item.event}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {userProfile ? (
        <>
          <View style={styles.profileContainer}>
            <Ionicons name="person" size={70} color="#d4eaf7" style={styles.userIcon} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {userProfile.type === 'Volunteer' ? userProfile.fullName || 'Не указано' : userProfile.orgName || 'N/A'}
              </Text>
              <Text style={styles.userEmail}>{userProfile.email || 'Не указано'}</Text>
              {userProfile.type === 'Volunteer' && (
                <Text style={styles.userExperience}>Опыт: {userProfile.experience ? userProfile.experience : 'Не указано'}</Text>
              )}
            </View>
          </View>
          {userProfile.type === 'Volunteer' ? (
            <>
              <Text style={styles.sectionTitle}>Поданные заявки</Text>
              <FlatList
                data={appliedEvents}
                renderItem={renderAppliedEvent}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.scrollContainer}
              />
            </>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Заявки на рассмотрение</Text>
              <FlatList
                data={volunteerApplications}
                renderItem={renderVolunteerApplication}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.scrollContainer}
              />
            </>
          )}
        </>
      ) : (
        <Text>Профиль пользователя недоступен</Text>
      )}
      <View style={styles.btnBlock}>
        <TouchableOpacity style={styles.submitButton} onPress={signOut}>
          <Text style={styles.submitButtonText}>Выход</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F4F4F9',
    textAlign: 'center'
  },
  profileContainer: {
    flexDirection: 'col',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#113566',
    margin: 20,
    padding: 25,
    borderRadius: 50,
    height: '30%',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  userIcon: {
    textAlign: 'center',
    paddingBottom: 3
  },
  userInfo: {
    flex: 1,
    alignItems: 'center',
    color: 'white',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
    color: 'white',
    paddingBottom: 5
  },
  userEmail: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 5,
    color: 'white'
  },
  userExperience: {
    fontSize: 16,
    color: '#555555',
    color: 'white'
  },
  scrollContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3B3B98',
    marginVertical: 15,
    textAlign: 'center'
  },
  submitButton: {
    backgroundColor: '#113566',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnBlock:{
    alignItems:'center',
    marginBottom:10
  },
  cardTextStatus:{
    fontSize: 16,
    color: '#555555',
    marginBottom: 5,
    fontWeight: 'bold'
  }
});
