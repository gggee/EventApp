import React, { useState } from "react";
import { View, Button, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import CustomModal from "./CustomModal";
import EventTable from "./EventTabale";

const OrganizationPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [inProgressEvents, setInProgressEvents] = useState([]); 
  const [completedEvents, setCompletedEvents] = useState([]); 

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const handleEventSubmit = (eventData) => {
    setInProgressEvents((prevEvents) => [...prevEvents, { ...eventData, status: "In Progress" }]);
    closeModal();
  };

  const markAsCompleted = (index) => {
    const completedEvent = inProgressEvents[index];
    setInProgressEvents((prevEvents) => prevEvents.filter((_, i) => i !== index)); 
    setCompletedEvents((prevEvents) => [...prevEvents, { ...completedEvent, status: "Completed" }]); 
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Добавить событие" onPress={openModal} color="#00668C" />
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>В процессе</Text>
          {inProgressEvents.length > 0 ? (
            <FlatList
              data={inProgressEvents}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.listContentContainer}
              renderItem={({ item, index }) => (
                <View style={styles.eventCard}>
                  <Text style={styles.eventTitle}>{item.name}</Text>
                  <Text style={styles.eventText}>Тип: {item.type}</Text>
                  <Text style={styles.eventText}>Дата: {item.date}</Text>
                  <Text style={styles.eventText}>Статус: {item.status}</Text>
                  <Button title="Окончить" onPress={() => markAsCompleted(index)} color="#FF5722" />
                </View>
              )}
            />
          ) : (
            <Text style={styles.noEventsText}>Нет событий в процессе</Text>
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Завершено</Text>
          {completedEvents.length > 0 ? (
            <FlatList
              data={completedEvents}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.listContentContainer}
              renderItem={({ item }) => (
                <View style={styles.eventCard}>
                  <Text style={styles.eventTitle}>{item.name}</Text>
                  <Text style={styles.eventText}>Тип: {item.type}</Text>
                  <Text style={styles.eventText}>Дата: {item.date}</Text>
                  <Text style={styles.eventText}>Статус: {item.status}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noEventsText}>Нет завершенных событий</Text>
          )}
        </View>
      </View>

      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <EventTable onClose={closeModal} onSubmit={handleEventSubmit} />
      </CustomModal>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4', 
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  sectionContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: "#FFFFFF", 
    borderRadius: 12,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 8,
    elevation: 5, 
  },
  eventCard: {
    backgroundColor: "#FFFFFF",  
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#DDDDDD", 
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
  },
  eventText: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#444444",
    marginBottom: 10,
  },
  noEventsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888888",
  },
  listContentContainer: {
    paddingBottom: 16,
  },
});

export default OrganizationPage;
