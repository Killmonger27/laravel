// Configuration de l'application mobile QueueFlow

export const API_CONFIG = {
  // URL de votre serveur Laravel
  BASE_URL: 'http://192.168.52.62:8000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const THEME = {
  colors: {
    primary: '#3B82F6',      // Couleur principale du logo
    secondary: '#1E40AF',    // Couleur secondaire du logo
    accent: '#60A5FA',       // Couleur intermédiaire
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textSecondary: '#64748b',
    textLight: '#E5E7EB',    // Couleur du texte du logo
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',
    white: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
};

export const STATUS_CONFIG = {
  en_attente: {
    label: 'En attente',
    color: '#f59e0b',
    backgroundColor: '#fef3c7',
    icon: 'hourglass-empty',
  },
  appele: {
    label: 'Appelé',
    color: '#3b82f6',
    backgroundColor: '#dbeafe',
    icon: 'volume-up',
  },
  en_cours: {
    label: 'En cours',
    color: '#10b981',
    backgroundColor: '#d1fae5',
    icon: 'pending',
  },
  termine: {
    label: 'Terminé',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    icon: 'check-circle',
  },
};

export const PRIORITY_CONFIG = {
  normale: {
    label: 'Normale',
    icon: 'person',
    color: '#64748b',
  },
  senior: {
    label: 'Senior (65+)',
    icon: 'elderly',
    color: '#f59e0b',
  },
  handicap: {
    label: 'Handicapé',
    icon: 'accessible',
    color: '#10b981',
  },
  urgent: {
    label: 'Urgent',
    icon: 'priority-high',
    color: '#ef4444',
  },
};

export const SERVICE_ICONS = {
  compte: 'account-balance-wallet',
  credit: 'credit-card',
  consultation: 'info',
  retrait: 'attach-money',
  depot: 'attach-money',
  virement: 'swap-horiz',
  ouverture: 'account-balance-wallet',
  pret: 'credit-card',
  default: 'business',
};

export const NOTIFICATIONS = {
  AUTO_REFRESH_INTERVAL: 30000, // 30 secondes
  SOUND_ENABLED: true,
  VIBRATION_ENABLED: true,
};

export const APP_CONFIG = {
  NAME: 'QueueFlow',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@queueflow.cm',
  SUPPORT_PHONE: '+237 123 456 789',
};

// Utilitaires
export const getServiceIcon = (serviceName) => {
  const name = serviceName.toLowerCase();
  
  for (const [key, icon] of Object.entries(SERVICE_ICONS)) {
    if (name.includes(key)) {
      return icon;
    }
  }
  
  return SERVICE_ICONS.default;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
  }).format(amount);
};

export const formatDateTime = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  
  return new Date(date).toLocaleDateString('fr-FR', { ...defaultOptions, ...options });
};

export const getEstimatedWaitTime = (position, averageServiceTime = 5) => {
  return position * averageServiceTime;
};
