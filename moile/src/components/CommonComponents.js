import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const Card = ({ children, style, onPress, ...props }) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent 
      style={[styles.card, style]} 
      onPress={onPress}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export const InfoRow = ({ icon, label, value, iconColor = '#6366f1' }) => (
  <View style={styles.infoRow}>
    <MaterialIcons name={icon} size={20} color={iconColor} />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export const StatusBadge = ({ status, size = 'medium' }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'en_attente': {
        label: 'En attente',
        color: '#f59e0b',
        backgroundColor: '#fef3c7',
        icon: 'hourglass-empty',
      },
      'appele': {
        label: 'Appelé',
        color: '#3b82f6',
        backgroundColor: '#dbeafe',
        icon: 'volume-up',
      },
      'en_cours': {
        label: 'En cours',
        color: '#10b981',
        backgroundColor: '#d1fae5',
        icon: 'pending',
      },
      'termine': {
        label: 'Terminé',
        color: '#6b7280',
        backgroundColor: '#f3f4f6',
        icon: 'check-circle',
      },
    };
    return configs[status] || configs['en_attente'];
  };

  const config = getStatusConfig(status);
  const sizeStyles = size === 'small' ? styles.badgeSmall : styles.badgeMedium;

  return (
    <View style={[styles.badge, sizeStyles, { backgroundColor: config.backgroundColor }]}>
      <MaterialIcons 
        name={config.icon} 
        size={size === 'small' ? 14 : 16} 
        color={config.color} 
      />
      <Text style={[
        styles.badgeText, 
        { color: config.color },
        size === 'small' && styles.badgeTextSmall
      ]}>
        {config.label}
      </Text>
    </View>
  );
};

export const EmptyState = ({ icon, title, description, actionText, onAction }) => (
  <View style={styles.emptyState}>
    <MaterialIcons name={icon} size={80} color="#cbd5e1" />
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyDescription}>{description}</Text>
    {actionText && onAction && (
      <TouchableOpacity style={styles.emptyAction} onPress={onAction}>
        <Text style={styles.emptyActionText}>{actionText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export const LoadingSpinner = ({ text = 'Chargement...', size = 'large' }) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size={size} color="#6366f1" />
    <Text style={styles.loadingText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeMedium: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  badgeTextSmall: {
    fontSize: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  emptyAction: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyActionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748b',
  },
});
