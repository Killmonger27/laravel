import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QueueFlowLogo from './QueueFlowLogo';

export default function AppHeader({ title, subtitle, showLogo = true, style }) {
  return (
    <LinearGradient
      colors={['#3B82F6', '#1E40AF']}
      style={[styles.header, style]}
    >
      <View style={styles.headerContent}>
        {showLogo && <QueueFlowLogo size={60} showText={false} />}
        {title && <Text style={styles.title}>{title}</Text>}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
    textAlign: 'center',
    lineHeight: 20,
  },
});
