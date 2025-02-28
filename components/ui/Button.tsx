import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, View } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  textPosition?: 'left' | 'right' | 'center';
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'accent',
  size = 'md',
  className = '',
  icon,
  textPosition = 'center',
  ...props
}) => {
  // Variant'a göre stil belirleme
  const variantStyles = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
  };

  // Boyuta göre stil belirleme
  const sizeStyles = {
    sm: 'px-2 py-2',
    md: 'px-4 py-4',
    lg: 'px-4 py-5',
  };

  // Text boyutları
  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <TouchableOpacity
      className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-md w-full items-center justify-center ${className}`}
      activeOpacity={0.7}
      {...props}
    >
     
      <View className={`flex-row items-center gap-2 ${textPosition === 'left' ? 'justify-start' : textPosition === 'right' ? 'justify-end' : 'justify-center'} w-full`}>
        {icon && <View className='mt-1'>{icon}</View>}
        <Text className={`text-black font-bold ${textSizes[size]}`}>{title}</Text>
      </View>
   
    </TouchableOpacity>
  );
};

export default Button; 