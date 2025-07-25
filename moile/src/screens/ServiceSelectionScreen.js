import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import ApiService from '../services/ApiService';

export default function ServiceSelectionScreen({ navigation }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getServices();
      // Si la réponse contient directement un tableau
      const servicesData = response.data || response;
      setServices(servicesData);
    } catch (error) {
      console.error('Error loading services:', error);
      // Données de test en cas d'erreur de connexion
      const testServices = [
        { id: 1, nom: 'Dépôt', code: 'DEP', description: 'Service de dépôt d\'argent', duree_estimee: 5 },
        { id: 2, nom: 'Retrait', code: 'RET', description: 'Service de retrait d\'argent', duree_estimee: 3 },
        { id: 3, nom: 'Ouverture de compte', code: 'OUV', description: 'Ouverture d\'un nouveau compte', duree_estimee: 15 },
        { id: 4, nom: 'Consultation', code: 'CON', description: 'Consultation et informations', duree_estimee: 8 },
        { id: 5, nom: 'Virement', code: 'VIR', description: 'Service de virement bancaire', duree_estimee: 10 },
      ];
      setServices(testServices);
      Alert.alert('Mode hors ligne', 'Utilisation des services de démonstration.\nVérifiez votre connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleContinue = () => {
    if (selectedService) {
      navigation.navigate('ClientInfo', { service: selectedService });
    }
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        selectedService?.id === item.id && styles.selectedServiceCard,
      ]}
      onPress={() => handleServiceSelect(item)}
    >
      <View style={styles.serviceIcon}>
        <MaterialIcons
          name={getServiceIcon(item.nom)}
          size={30}
          color={selectedService?.id === item.id ? '#3B82F6' : '#64748b'}
        />
      </View>
      <View style={styles.serviceContent}>
        <Text style={[
          styles.serviceName,
          selectedService?.id === item.id && styles.selectedServiceName,
        ]}>
          {item.nom}
        </Text>
        <Text style={styles.serviceDescription}>
          {item.description || 'Service bancaire'}
        </Text>
        <View style={styles.serviceInfo}>
          <MaterialIcons name="schedule" size={16} color="#1E40AF" />
          <Text style={styles.serviceTime}>
            Temps d'attente estimé: {item.duree_estimee || 5} min
          </Text>
        </View>
      </View>
      {selectedService?.id === item.id && (
        <MaterialIcons name="check-circle" size={24} color="#3B82F6" />
      )}
    </TouchableOpacity>
  );

  const getServiceIcon = (serviceName) => {
    const name = serviceName.toLowerCase();
    if (name.includes('compte') || name.includes('ouverture')) return 'account-balance-wallet';
    if (name.includes('crédit') || name.includes('prêt')) return 'credit-card';
    if (name.includes('consultation') || name.includes('info')) return 'info';
    if (name.includes('retrait') || name.includes('dépôt')) return 'attach-money';
    if (name.includes('virement') || name.includes('transfer')) return 'swap-horiz';
    return 'business';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Chargement des services...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choisissez votre service</Text>
        <Text style={styles.headerSubtitle}>
          Sélectionnez le service pour lequel vous souhaitez obtenir un ticket
        </Text>
      </View>

      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => (item.id || item.code).toString()}
        style={styles.servicesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.servicesContainer}
      />

      {selectedService && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <LinearGradient
              colors={['#3B82F6', '#1E40AF']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Continuer</Text>
              <MaterialIcons name="arrow-forward" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748b',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 22,
  },
  servicesList: {
    flex: 1,
  },
  servicesContainer: {
    padding: 20,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedServiceCard: {
    borderColor: '#3B82F6',
    backgroundColor: '#f0f4ff',
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  serviceContent: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  selectedServiceName: {
    color: '#3B82F6',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceTime: {
    fontSize: 12,
    color: '#1E40AF',
    marginLeft: 5,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  continueButton: {
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
    marginRight: 10,
  },
});
