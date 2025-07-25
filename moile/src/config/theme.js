// Thème global de l'application QueueFlow basé sur le logo

export const Colors = {
  // Couleurs principales du logo
  primary: '#3B82F6',      // Bleu principal du logo
  secondary: '#1E40AF',    // Bleu secondaire du logo
  accent: '#60A5FA',       // Bleu intermédiaire
  
  // Couleurs neutres
  background: '#F8FAFC',   // Arrière-plan clair
  surface: '#FFFFFF',      // Surface des cartes
  surfaceSecondary: '#F1F5F9',
  
  // Couleurs de texte
  text: '#1E293B',         // Texte principal
  textSecondary: '#64748B', // Texte secondaire
  textLight: '#E5E7EB',    // Texte clair (comme dans le logo)
  textInverse: '#FFFFFF',  // Texte sur fond coloré
  
  // Couleurs d'état
  success: '#10B981',      // Vert
  warning: '#F59E0B',      // Orange
  error: '#EF4444',        // Rouge
  info: '#3B82F6',         // Bleu (même que primary)
  
  // Couleurs utilitaires
  border: '#E2E8F0',
  divider: '#F1F5F9',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Dégradés (comme dans le logo)
  gradientPrimary: ['#3B82F6', '#1E40AF'],
  gradientSecondary: ['#60A5FA', '#3B82F6'],
  gradientLight: ['#F8FAFC', '#E2E8F0'],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xl: 20,
  round: 50,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

export default {
  Colors,
  Spacing,
  BorderRadius,
  Typography,
  Shadows,
};
