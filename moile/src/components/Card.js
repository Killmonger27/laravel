import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Shadows, BorderRadius, Spacing } from '../config/theme';

export default function Card({ children, style, elevated = true, padding = 'md', ...props }) {
  const paddingValue = Spacing[padding] || Spacing.md;
  
  return (
    <View 
      style={[
        styles.card,
        elevated && Shadows.medium,
        { padding: paddingValue },
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
