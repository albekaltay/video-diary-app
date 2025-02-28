import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-primary items-center justify-center p-4">
        <Text className="text-2xl font-bold text-primary">
          Thank you for using my app!
        </Text>
        <Text className="text-xl font-bold text-primary">
          Made with ❤️ by Albek
        </Text>
      </SafeAreaView>
    </View>
  );
}
