import React, { Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, Button, ScrollView, View } from "react-native";

const EventTable = ({ onClose, onSubmit }) => {
  const { control, formState: { errors }, handleSubmit } = useForm({
    mode: "onBlur"
  });

  const onSubmitHandler = (data) => {
    onSubmit(data); 
    onClose(); 
  };

  return (
    <Fragment>
      <ScrollView contentContainerStyle={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Название события</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Пожалуйста, введите название события!" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder="Введите название события"
                placeholderTextColor="#888"
              />
            )}
          />
          {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Тип события</Text>
          <Controller
            control={control}
            name="type"
            rules={{ required: "Пожалуйста, введите тип события!" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder="Введите тип события"
                placeholderTextColor="#888"
              />
            )}
          />
          {errors.type && <Text style={styles.error}>{errors.type.message}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Дата события</Text>
          <Controller
            control={control}
            name="date"
            rules={{ required: "Пожалуйста, введите дату события!" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder="Введите дату события"
                placeholderTextColor="#888"
                keyboardType="default"
              />
            )}
          />
          {errors.date && <Text style={styles.error}>{errors.date.message}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Волонтерский опыт</Text>
          <Controller
            control={control}
            name="volunteerExperience"
            rules={{ required: "Пожалуйста, введите опыт волонтера!" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, styles.textarea]}
                onChangeText={onChange}
                value={value}
                placeholder="Введите опыт волонтера"
                placeholderTextColor="#888"
                multiline={true}
              />
            )}
          />
          {errors.volunteerExperience && (
            <Text style={styles.error}>{errors.volunteerExperience.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Возраст участия волонтера</Text>
          <Controller
            control={control}
            name="ageRestriction"
            rules={{ required: "Пожалуйста, введите возраст волонтера!" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder="Введите возраст волонтера"
                placeholderTextColor="#888"
                keyboardType="numeric"
              />
            )}
          />
          {errors.ageRestriction && (
            <Text style={styles.error}>{errors.ageRestriction.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Обзор события</Text>
          <Controller
            control={control}
            name="description"
            rules={{ required: "Пожалуйста, опишите событие!" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, styles.textarea]}
                onChangeText={onChange}
                value={value}
                placeholder="Опишите событие"
                placeholderTextColor="#888"
                multiline={true}
              />
            )}
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description.message}</Text>
          )}
        </View>

        <Button title="Создать событие" onPress={handleSubmit(onSubmitHandler)} color="#00668C" />
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 10,
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333', 
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 12,
    borderColor: "#DDDDDD", 
    borderWidth: 1,
    borderRadius: 12, 
    backgroundColor: "#FFFFFF", 
    fontSize: 12, 
  },
  textarea: {
    height: 100, 
    textAlignVertical: 'top',
  },
  error: {
    color: "#D32F2F", 
    fontSize: 12,
    marginTop: 4,
  }
});

export default EventTable;
