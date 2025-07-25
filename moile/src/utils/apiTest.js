import ApiService from './services/ApiService';

// Test de connectivité avec le serveur Laravel
export const testApiConnection = async () => {
  try {
    console.log('🔄 Test de connexion à l\'API...');
    
    // Test de l'endpoint health
    const healthResponse = await ApiService.checkConnection();
    console.log('✅ Health check réussi:', healthResponse);
    
    // Test de récupération des services
    const servicesResponse = await ApiService.getServices();
    console.log('✅ Services récupérés:', servicesResponse);
    
    return { success: true, data: { health: healthResponse, services: servicesResponse } };
  } catch (error) {
    console.error('❌ Erreur de connexion API:', error.message);
    return { success: false, error: error.message };
  }
};

// Endpoint de test simple (à utiliser depuis un écran)
export const simpleApiTest = async () => {
  try {
    const response = await fetch('http://10.0.2.2:8000/api/health');
    const data = await response.json();
    console.log('✅ Test fetch réussi:', data);
    return data;
  } catch (error) {
    console.error('❌ Test fetch échoué:', error);
    throw error;
  }
};
