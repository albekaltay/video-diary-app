import { View, Text } from "react-native";
import Button from "../ui/Button";

interface HomeStep1Props {
  pickVideo: () => Promise<void>;
}
const HomeStep1: React.FC<HomeStep1Props> = ({ pickVideo }) => {
  return (
    <View className="flex-1 bg-primary rounded-lg p-4 gap-2">      
      <Text className="text-primary text-2xl">Geting Started 🚀</Text>
      <Text className="text-primary text-xl">
        Choose video from library and edit it.
      </Text>

      <View className="flex flex-row items-center my-4">
        <View className="flex-1 h-[1px] bg-gray-700" />
      </View>
      <Text className="text-primary text-2xl mb-4">Choose Source</Text>
      <View className="space-y-4 gap-3">
        <Button
          title="Choose from Library"
          variant="accent"
          size="md"
          onPress={pickVideo}
        />
        <Button title="Record New" variant="accent" size="md" />
      </View>
    </View>
  );
};

export default HomeStep1;
