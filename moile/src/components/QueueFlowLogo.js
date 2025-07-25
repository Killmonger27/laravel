import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function QueueFlowLogo({ size = 60, showText = true, style }) {
  const logoSize = size;
  const textSize = size * 0.3; // Proportionnel à la taille du logo

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.logoContainer, { width: logoSize, height: logoSize }]}>
        <LinearGradient
          colors={['#3B82F6', '#1E40AF']}
          style={[styles.logoBackground, { borderRadius: logoSize / 2 }]}
        >
          {/* Lignes de flux en arrière-plan */}
          <View style={styles.flowLines}>
            <View style={[styles.flowLine, styles.flowLine1]} />
            <View style={[styles.flowLine, styles.flowLine2]} />
            <View style={[styles.flowLine, styles.flowLine3]} />
            <View style={[styles.flowLine, styles.flowLine4]} />
          </View>
          
          {/* Initiales QF */}
          <Text style={[styles.logoText, { fontSize: textSize }]}>QF</Text>
        </LinearGradient>
      </View>
      
      {showText && (
        <Text style={styles.appName}>QueueFlow</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    position: 'relative',
  },
  logoBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  flowLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  flowLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  flowLine1: {
    top: '25%',
    left: '15%',
    right: '15%',
    transform: [{ scaleY: 0.8 }],
  },
  flowLine2: {
    top: '40%',
    left: '10%',
    right: '10%',
  },
  flowLine3: {
    top: '55%',
    left: '15%',
    right: '15%',
    transform: [{ scaleY: 0.8 }],
  },
  flowLine4: {
    top: '70%',
    left: '20%',
    right: '20%',
    transform: [{ scaleY: 0.6 }],
  },
  logoText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  appName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    textAlign: 'center',
  },
});
