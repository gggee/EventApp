import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, TextInput, Alert, SafeAreaView, Dimensions } from 'react-native';

const initialEvents = [
  {
    id: '1',
    title: 'Очистка берега пляжа от мусора',
    organization: 'Eco Foundation',
    date: '15.10.2024',
    type: 'Окружающая среда',
    time: '10:00 - 12:00',
    requirements: 'Возраст должен быть старше 18 лет, опыт работы приветствуется.',
  },
  {
    id: '2',
    title: 'Продуктовый сбор',
    organization: 'Community Helpers',
    date: '22.10.2024',
    type: 'Социальное',
    time: '09:00 - 18:00',
    requirements: 'Нет возрастных ограничений, опыт не требуется',
  },
  {
    id: '3',
    title: 'Учебный семинар для молодежи',
    organization: 'Молодежный центр',
    date: '21.10.2024',
    type: 'Образование',
    time: '12:00 - 16:00',
    requirements: 'Возраст от 18 лет, желательно наличие опыта в обучении',
  },
  {
    id: '4',
    title: 'Уход за животными в приюте',
    organization: 'Animal Rescue',
    date: '02.10.2024',
    type: 'Экология',
    time: '10:00 - 21:00',
    requirements: 'Возраст от 16 лет, опыт работы с животными приветствуется',
  },
  {
    id: '5',
    title: 'Восстановление исторических памятников',
    organization: 'HeritageTOO',
    date: '29.10.2024',
    type: 'Культура',
    time: '09:00 - 17:00',
    requirements: 'Возраст от 18 лет, опыт в реставрации или строительстве',
  },
];

export default function EventApplyScreen({ navigation }) {
  const [events, setEvents] = useState(initialEvents);
  const [appliedEvents, setAppliedEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [customTime, setCustomTime] = useState('');

  const handleCardPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleOpenTimeModal = () => {
    setModalVisible(false);
    setTimeModalVisible(true);
  };

  const handleCloseTimeModal = () => {
    setTimeModalVisible(false);
    setSelectedEvent(null);
    setSelectedTime('');
    setCustomTime('');
  };

  const handleSubmit = () => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== selectedEvent.id));
    setAppliedEvents(prevApplied => [...prevApplied, { ...selectedEvent, status: 'Заявка в обработке' }]);
    
    setTimeModalVisible(false);
    Alert.alert('Заявка отправлена', 'Ваша заявка на мероприятие отправлена на рассмотрение.');
  };

  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => handleCardPress(item)}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text>Организация: {item.organization}</Text>
      <Text>Дата: {item.date}</Text>
      <Text>Тип: {item.type}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContainer}
      />

      {selectedEvent && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
              <Text>Организация: {selectedEvent.organization}</Text>
              <Text>Дата: {selectedEvent.date}</Text>
              <Text>Время: {selectedEvent.time}</Text>
              <Text>Тип: {selectedEvent.type}</Text>
              <Text>Требования: {selectedEvent.requirements}</Text>
              <Button title="Записаться" onPress={handleOpenTimeModal} color="#3B3B98" />
              <Button title="Закрыть" onPress={handleCloseModal} color="#3B3B98" />
            </View>
          </View>
        </Modal>
      )}

      {timeModalVisible && (
        <Modal
          visible={timeModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseTimeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.label}>Сколько времени вы можете уделить мероприятию?</Text>
              <TouchableOpacity
                style={[styles.timeButton, selectedTime === 'Не более 3 часов' && styles.selectedButton]}
                onPress={() => setSelectedTime('Не более 3 часов')}
              >
                <Text style={styles.buttonText}>Менее 3 часов</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timeButton, selectedTime === 'От 3-6 часов' && styles.selectedButton]}
                onPress={() => setSelectedTime('От 3-6 часов')}
              >
                <Text style={styles.buttonText}>3-6 часов</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timeButton, selectedTime === 'Весь указанный период на мероприятие' && styles.selectedButton]}
                onPress={() => setSelectedTime('Весь указанный период на мероприятие')}
              >
                <Text style={styles.buttonText}>Весь указанный период на мероприятие</Text>
              </TouchableOpacity>
              {selectedTime === 'Другое' && (
                <TextInput
                  style={styles.input}
                  placeholder="Укажите свое время"
                  value={customTime}
                  onChangeText={setCustomTime}
                />
              )}
              <Button title="Отправить" onPress={handleSubmit} color="#3B3B98" />
              <Button title="Закрыть" onPress={handleCloseTimeModal} color="#3B3B98" />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4', 
  },
  scrollContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 6, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 10, 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
    fontFamily: 'Roboto-Regular', 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20, 
    width: '90%', 
    maxHeight: Dimensions.get('window').height * 0.8,
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, 
    shadowRadius: 15, 
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 15,
    fontFamily: 'Roboto-Regular', 
  },
  label: {
    fontSize: 18,
    color: '#333', 
    marginBottom: 15,
    fontFamily: 'Roboto-Regular', 
  },
  timeButton: {
    backgroundColor: '#86C232', 
    padding: 15,
    marginBottom: 12,
    borderRadius: 10, 
  },
  selectedButton: {
    backgroundColor: '#4CAF50', 
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd', 
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#f9f9f9', 
    fontFamily: 'Roboto-Regular', 
  },
});
