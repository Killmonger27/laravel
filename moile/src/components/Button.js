import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Typography, Spacing } from '../config/theme';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
  ...props 
}) {
  const isGradient = variant === 'primary';
  const isOutline = variant === 'outline';
  
  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator 
          size={size === 'large' ? 'small' : 'small'} 
          color={isGradient || variant === 'primary' ? Colors.textInverse : Colors.primary} 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <MaterialIcons 
              name={icon} 
              size={size === 'large' ? 24 : 20} 
              color={isGradient || variant === 'primary' ? Colors.textInverse : Colors.primary}
              style={styles.iconLeft}
            />
          )}
          <Text style={[
            styles.text,
            styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}`],
            isGradient || variant === 'primary' ? styles.textPrimary : styles.textSecondary,
            textStyle
          ]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <MaterialIcons 
              name={icon} 
              size={size === 'large' ? 24 : 20} 
              color={isGradient || variant === 'primary' ? Colors.textInverse : Colors.primary}
              style={styles.iconRight}
            />
          )}
        </>
      )}
    </>
  );

  const buttonStyle = [
    styles.button,
    styles[size],
    isOutline && styles.outline,
    (disabled || loading) && styles.disabled,
    style
  ];

  if (isGradient && !disabled && !loading) {
    return (
      <TouchableOpacity 
        style={[buttonStyle, styles.gradientButton]} 
        onPress={onPress}
        disabled={disabled || loading}
        {...props}
      >
        <LinearGradient
          colors={Colors.gradientPrimary}
          style={styles.gradient}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={[
        buttonStyle,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
      ]} 
      onPress={onPress}
      disabled={disabled || loading}
      {...props}
    >
      {buttonContent}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.large,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  small: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  medium: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  large: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderColor: Colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
  },
  gradientButton: {
    borderWidth: 0,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  textPrimary: {
    color: Colors.textInverse,
  },
  textSecondary: {
    color: Colors.primary,
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});
