import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Importation des écrans
import HomeScreen from './src/screens/HomeScreen';
import ServiceSelectionScreen from './src/screens/ServiceSelectionScreen';
import ClientInfoScreen from './src/screens/ClientInfoScreen';
import TicketGeneratedScreen from './src/screens/TicketGeneratedScreen';
import TicketStatusScreen from './src/screens/TicketStatusScreen';

// Configuration du thème QueueFlow
const theme = {
  colors: {
    primary: '#6366f1', // Indigo
    accent: '#8b5cf6',  // Purple
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    placeholder: '#64748b',
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6366f1',
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
            options={{ title: 'QueueFlow Mobile' }}
          />
          <Stack.Screen 
            name="ServiceSelection" 
            component={ServiceSelectionScreen} 
            options={{ title: 'Sélectionner un service' }}
          />
          <Stack.Screen 
            name="ClientInfo" 
            component={ClientInfoScreen} 
            options={{ title: 'Informations client' }}
          />
          <Stack.Screen 
            name="TicketGenerated" 
            component={TicketGeneratedScreen} 
            options={{ 
              title: 'Votre ticket',
              headerLeft: null, // Empêche le retour en arrière
            }}
          />
          <Stack.Screen 
            name="TicketStatus" 
            component={TicketStatusScreen} 
            options={{ title: 'Statut de votre ticket' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
