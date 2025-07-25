import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import QueueFlowLogo from '../components/QueueFlowLogo';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <QueueFlowLogo size={120} showText={true} />
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('ServiceSelection')}
        >
          <LinearGradient
            colors={['#3B82F6', '#1E40AF']}
            style={styles.buttonGradient}
          >
            <MaterialIcons name="add-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Obtenir un ticket</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('TicketStatus')}
        >
          <MaterialIcons name="search" size={24} color="#3B82F6" />
          <Text style={styles.secondaryButtonText}>Vérifier mon ticket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  primaryButton: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3B82F6',
    marginBottom: 40,
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
