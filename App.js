import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import ScannerScreen from './ScannerScreen';

const Stack = createNativeStackNavigator();

// Configure how notifications should be displayed
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function HomeScreen({ navigation }) {
  const [notificationPermission, setNotificationPermission] = useState(false);

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setNotificationPermission(status === 'granted');
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please enable notifications for medication reminders');
    }
  };

  const testNotification = async () => {
    if (!notificationPermission) {
      Alert.alert('Error', 'Notification permissions not granted');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time to take your medicine! 💊",
        body: 'Test medication reminder',
        sound: true,
      },
      trigger: {
        seconds: 2,
      },
    });

    Alert.alert('Success', 'Test notification scheduled in 2 seconds!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PillPal</Text>
      <Text style={styles.subtitle}>AI-Powered Medication Management</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Notifications: {notificationPermission ? '✅ Enabled' : '❌ Disabled'}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Scanner')}
        >
          <Text style={styles.buttonIcon}>📸</Text>
          <Text style={styles.buttonText}>Scan Medicine Label</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={testNotification}
        >
          <Text style={styles.buttonIcon}>🔔</Text>
          <Text style={styles.buttonText}>Test Notification</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>How it works:</Text>
        <Text style={styles.infoText}>1. Scan your medication label</Text>
        <Text style={styles.infoText}>2. AI extracts dosage & schedule</Text>
        <Text style={styles.infoText}>3. Get timely reminders</Text>
        <Text style={styles.infoText}>4. Track your medication adherence</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'PillPal' }}
        />
        <Stack.Screen 
          name="Scanner" 
          component={ScannerScreen}
          options={{ title: 'Scan Medicine' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  statusContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
  },
  buttonIcon: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
});