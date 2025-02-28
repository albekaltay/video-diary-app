import { StatusBar as RNStatusBar, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

interface ScreenContainerProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ 
  children, 
  title = "test", 
  showBackButton = false,
  onBackPress
}) => {
  const statusBarHeight = RNStatusBar.currentHeight || 0;
  
  return (
    <View className="flex-1" style={{ paddingTop: statusBarHeight }}>
      <StatusBar style="dark" backgroundColor="#24293E" />
      {title && (
        <View className="p-4 bg-primary flex-row items-center gap-2">
          {showBackButton && (
            <TouchableOpacity onPress={onBackPress} className="mr-3">
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          )}
          <Text className="text-white text-xl font-bold">{title}</Text>
        </View>
      )}
      <View className="flex-1 p-4">
        {children}
      </View>
    </View>
  );
};

export default ScreenContainer; 