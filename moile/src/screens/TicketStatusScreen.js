import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import ApiService from '../services/ApiService';

export default function TicketStatusScreen({ navigation, route }) {
  const [ticketNumber, setTicketNumber] = useState('');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Si on arrive depuis TicketGenerated avec un ticket complet
  const initialTicketId = route.params?.ticketId;
  const initialTicketNumber = route.params?.ticketNumber;
  const initialTicket = route.params?.initialTicket;

  useEffect(() => {
    if (initialTicket) {
      // Utiliser le ticket fourni directement
      console.log('📋 Ticket initial reçu:', initialTicket);
      console.log('📋 Statut du ticket initial:', initialTicket.statut);
      setTicket(initialTicket);
    } else if (initialTicketId) {
      loadTicketById(initialTicketId);
    } else if (initialTicketNumber) {
      loadTicketByNumber(initialTicketNumber);
    }

    // Timer pour l'heure
    const timeTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timeTimer);
    };
  }, [initialTicketId, initialTicketNumber, initialTicket]);

  // Timer séparé pour le rafraîchissement automatique
  useEffect(() => {
    if (!ticket || !ticket.numero) return;

    const statusTimer = setInterval(() => {
      console.log('🔄 Vérification du rafraîchissement automatique...');
      console.log('Ticket présent:', !!ticket);
      console.log('Numéro ticket:', ticket?.numero);
      console.log('Statut actuel:', ticket?.statut);
      
      if (ticket.statut !== 'termine' && ticket.statut !== 'annule') {
        console.log('✅ Lancement du rafraîchissement automatique...');
        handleRefresh(true); // Mode silencieux
      } else {
        console.log('❌ Ticket terminé ou annulé, arrêt du rafraîchissement');
      }
    }, 10000); // 10 secondes

    return () => {
      clearInterval(statusTimer);
    };
  }, [ticket?.numero, ticket?.statut]);

  const loadTicketById = async (ticketId) => {
    try {
      setLoading(true);
      // Tenter d'abord par ID, sinon utiliser une méthode alternative
      try {
        const response = await ApiService.getTicketById(ticketId);
        setTicket(response);
      } catch (idError) {
        // Si la route par ID n'existe pas, on pourrait utiliser d'autres méthodes
        console.warn('Route GET /tickets/{id} non disponible, ticket déjà chargé depuis la création');
        throw idError;
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger le ticket');
      console.error('Error loading ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTicketByNumber = async (numero) => {
    try {
      setLoading(true);
      const response = await ApiService.getTicketByNumber(numero);
      setTicket(response);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger le ticket');
      console.error('Error loading ticket by number:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTicket = async () => {
    if (!ticketNumber.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un numéro de ticket');
      return;
    }

    try {
      setLoading(true);
      const response = await ApiService.getTicketByNumber(ticketNumber.trim());
      setTicket(response);
    } catch (error) {
      Alert.alert('Erreur', 'Ticket non trouvé. Vérifiez le numéro saisi.');
      console.error('Error searching ticket:', error);
      setTicket(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (silent = false) => {
    if (!ticket) return;

    try {
      if (!silent) {
        setRefreshing(true);
      }
      
      console.log(`🔄 ${silent ? 'Rafraîchissement automatique' : 'Rafraîchissement manuel'} pour ticket:`, ticket.numero);
      console.log('Statut actuel avant rafraîchissement:', ticket.statut);
      console.log('Position actuelle avant rafraîchissement:', ticket.position);
      
      // Utiliser le numéro pour rafraîchir car c'est plus fiable
      const response = await ApiService.getTicketByNumber(ticket.numero);
      
      console.log('Statut reçu:', response.statut);
      console.log('Position reçue:', response.position);
      
      // Vérifier s'il y a des changements significatifs
      const statusChanged = ticket.statut !== response.statut;
      const positionChanged = ticket.position !== response.position;
      
      if (statusChanged || positionChanged) {
        console.log('🎉 CHANGEMENTS DÉTECTÉS !');
        if (statusChanged) console.log(`Statut: ${ticket.statut} → ${response.statut}`);
        if (positionChanged) console.log(`Position: ${ticket.position} → ${response.position}`);
        
        setTicket(response);
        setLastUpdate(new Date());
      } else {
        console.log('ℹ️ Aucun changement détecté');
        // Mettre à jour seulement le lastUpdate même s'il n'y a pas de changements
        setLastUpdate(new Date());
      }
      
    } catch (error) {
      if (!silent) {
        Alert.alert('Erreur', 'Impossible de mettre à jour le statut');
      }
      console.error('❌ Erreur lors du rafraîchissement:', error.message);
    } finally {
      if (!silent) {
        setRefreshing(false);
      }
    }
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      'en_attente': {
        label: 'En attente',
        color: '#f59e0b',
        icon: 'hourglass-empty',
        description: 'Votre ticket est en file d\'attente',
      },
      'appele': {
        label: 'Appelé',
        color: '#3b82f6',
        icon: 'volume-up',
        description: 'Veuillez vous présenter au guichet',
      },
      'en_cours': {
        label: 'En cours de traitement',
        color: '#10b981',
        icon: 'pending',
        description: 'Votre demande est en cours de traitement',
      },
      'termine': {
        label: 'Terminé',
        color: '#6b7280',
        icon: 'check-circle',
        description: 'Votre demande a été traitée',
      },
    };
    return statusMap[status] || statusMap['en_attente'];
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getEstimatedWaitTime = () => {
    if (!ticket || ticket.statut !== 'en_attente') return null;
    
    // Simulation simple du temps d'attente basé sur la position
    const position = ticket.position || 1;
    const averageTimePerClient = 5; // 5 minutes par client
    return position * averageTimePerClient;
  };

  if (loading && !ticket) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
      {!ticket ? (
        <View style={styles.searchContainer}>
          <View style={styles.searchHeader}>
            <MaterialIcons name="search" size={60} color="#3B82F6" />
            <Text style={styles.searchTitle}>Rechercher votre ticket</Text>
            <Text style={styles.searchSubtitle}>
              Entrez le numéro de votre ticket pour voir son statut
            </Text>
          </View>

          <View style={styles.searchForm}>
            <Text style={styles.label}>Numéro de ticket</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="confirmation-number" size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ex: T001, T002..."
                value={ticketNumber}
                onChangeText={setTicketNumber}
                autoCapitalize="characters"
              />
            </View>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearchTicket}
              disabled={loading}
            >
              <LinearGradient
                colors={['#3B82F6', '#1E40AF']}
                style={styles.buttonGradient}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <MaterialIcons name="search" size={24} color="white" />
                )}
                <Text style={styles.buttonText}>
                  {loading ? 'Recherche...' : 'Rechercher'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.ticketContainer}>
          <View style={styles.ticketHeader}>
            <Text style={styles.ticketNumber}>{ticket.numero}</Text>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={handleRefresh}
              disabled={refreshing}
            >
              <MaterialIcons 
                name="refresh" 
                size={24} 
                color="#3B82F6" 
                style={refreshing ? styles.spinning : null}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.statusCard}>
            <View style={[styles.statusIcon, { backgroundColor: `${getStatusInfo(ticket.statut).color}20` }]}>
              <MaterialIcons
                name={getStatusInfo(ticket.statut).icon}
                size={40}
                color={getStatusInfo(ticket.statut).color}
              />
            </View>
            <Text style={[styles.statusLabel, { color: getStatusInfo(ticket.statut).color }]}>
              {getStatusInfo(ticket.statut).label}
            </Text>
            <Text style={styles.statusDescription}>
              {getStatusInfo(ticket.statut).description}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Informations du ticket</Text>
            
            <View style={styles.infoRow}>
              <MaterialIcons name="business" size={20} color="#3B82F6" />
              <Text style={styles.infoLabel}>Service</Text>
              <Text style={styles.infoValue}>{ticket.service?.nom || 'Non spécifié'}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="person" size={20} color="#3B82F6" />
              <Text style={styles.infoLabel}>Client</Text>
              <Text style={styles.infoValue}>{ticket.nom_client}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="schedule" size={20} color="#3B82F6" />
              <Text style={styles.infoLabel}>Créé le</Text>
              <Text style={styles.infoValue}>
                {formatDate(ticket.created_at)} à {formatTime(ticket.created_at)}
              </Text>
            </View>

            {ticket.guichet && (
              <View style={styles.infoRow}>
                <MaterialIcons name="store" size={20} color="#3B82F6" />
                <Text style={styles.infoLabel}>Guichet</Text>
                <Text style={styles.infoValue}>{ticket.guichet.nom}</Text>
              </View>
            )}

            {ticket.position && ticket.statut === 'en_attente' && (
              <View style={styles.infoRow}>
                <MaterialIcons name="format-list-numbered" size={20} color="#3B82F6" />
                <Text style={styles.infoLabel}>Position</Text>
                <Text style={styles.infoValue}>{ticket.position}</Text>
              </View>
            )}
            
            <View style={styles.infoRow}>
              <MaterialIcons name="sync" size={20} color="#3B82F6" />
              <Text style={styles.infoLabel}>Dernière mise à jour</Text>
              <Text style={styles.infoValue}>
                {lastUpdate.toLocaleTimeString('fr-FR')}
              </Text>
            </View>
          </View>

          {getEstimatedWaitTime() && (
            <View style={styles.waitTimeCard}>
              <MaterialIcons name="timer" size={30} color="#1E40AF" />
              <View style={styles.waitTimeContent}>
                <Text style={styles.waitTimeTitle}>Temps d'attente estimé</Text>
                <Text style={styles.waitTimeValue}>{getEstimatedWaitTime()} minutes</Text>
                <Text style={styles.waitTimeNote}>Estimation basée sur votre position</Text>
              </View>
            </View>
          )}

          <View style={styles.currentTimeCard}>
            <MaterialIcons name="access-time" size={24} color="#64748b" />
            <Text style={styles.currentTimeLabel}>Heure actuelle</Text>
            <Text style={styles.currentTimeValue}>
              {currentTime.toLocaleTimeString('fr-FR')}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.newSearchButton}
            onPress={() => setTicket(null)}
          >
            <MaterialIcons name="search" size={20} color="#3B82F6" />
            <Text style={styles.newSearchText}>Rechercher un autre ticket</Text>
          </TouchableOpacity>
        </View>
      )}
      </ScrollView>
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
  searchContainer: {
    padding: 20,
    paddingBottom: 40, // Marge supplémentaire pour éviter la zone système
  },
  searchHeader: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 40,
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 20,
    marginBottom: 10,
  },
  searchSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
  searchForm: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 15,
    marginBottom: 20,
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
  searchButton: {
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
  ticketContainer: {
    padding: 20,
    paddingBottom: 40, // Marge supplémentaire pour éviter la zone système
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ticketNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  refreshButton: {
    padding: 10,
  },
  spinning: {
    // Animation de rotation (nécessiterait react-native-reanimated pour une vraie animation)
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statusIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#64748b',
  },
  infoValue: {
    flex: 2,
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
    textAlign: 'right',
  },
  waitTimeCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f4ff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#1E40AF',
  },
  waitTimeContent: {
    flex: 1,
    marginLeft: 15,
  },
  waitTimeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4c1d95',
    marginBottom: 5,
  },
  waitTimeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 5,
  },
  waitTimeNote: {
    fontSize: 12,
    color: '#7c3aed',
  },
  currentTimeCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  currentTimeLabel: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 10,
  },
  currentTimeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  newSearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  newSearchText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
