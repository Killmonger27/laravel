import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import ApiService from '../services/ApiService';

export default function ClientInfoScreen({ navigation, route }) {
  const { service } = route.params;
  const [clientInfo, setClientInfo] = useState({
    nom: '',
    telephone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setClientInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!clientInfo.nom.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir votre nom');
      return false;
    }
    // Le téléphone est optionnel, mais s'il est fourni, il doit être valide
    if (clientInfo.telephone.trim() && !/^[0-9+\-\s()]{8,}$/.test(clientInfo.telephone.trim())) {
      Alert.alert('Erreur', 'Veuillez saisir un numéro de téléphone valide');
      return false;
    }
    return true;
  };

  const handleGenerateTicket = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const ticketData = {
        service_id: service.id || service.code, // OBLIGATOIRE - ID du service (integer)
        nom_client: clientInfo.nom.trim(),      // OBLIGATOIRE - Nom complet du client (string, max 255 caractères)
        telephone_client: clientInfo.telephone.trim() || undefined, // OPTIONNEL - Numéro de téléphone (string, max 20 caractères)
      };

      // Supprimer les champs undefined pour ne pas les envoyer
      Object.keys(ticketData).forEach(key => 
        ticketData[key] === undefined && delete ticketData[key]
      );

      const response = await ApiService.createTicket(ticketData);
      
      navigation.navigate('TicketGenerated', {
        ticket: response, // La réponse contient directement les données du ticket
        service: response.service, // Le service est inclus dans la réponse
        clientInfo: clientInfo,
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer le ticket. Veuillez réessayer.');
      console.error('Error creating ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.serviceInfo}>
            <MaterialIcons name="business" size={24} color="#3B82F6" />
            <Text style={styles.serviceName}>{service.nom}</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Renseignez vos informations pour obtenir votre ticket
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom complet *</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Entrez votre nom complet"
                value={clientInfo.nom}
                onChangeText={(value) => handleInputChange('nom', value)}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Numéro de téléphone (optionnel)</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="phone" size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ex: +237 123 456 789"
                value={clientInfo.telephone}
                onChangeText={(value) => handleInputChange('telephone', value)}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.generateButton, loading && styles.disabledButton]}
          onPress={handleGenerateTicket}
          disabled={loading}
        >
          <LinearGradient
            colors={loading ? ['#94a3b8', '#cbd5e1'] : ['#3B82F6', '#1E40AF']}
            style={styles.buttonGradient}
          >
            {loading ? (
              <>
                <MaterialIcons name="hourglass-empty" size={24} color="white" />
                <Text style={styles.buttonText}>Génération...</Text>
              </>
            ) : (
              <>
                <MaterialIcons name="confirmation-number" size={24} color="white" />
                <Text style={styles.buttonText}>Générer mon ticket</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#1e293b',
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40, // Marge supplémentaire pour éviter la zone système
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  generateButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.7,
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
});
