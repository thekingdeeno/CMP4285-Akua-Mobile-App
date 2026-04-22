import { ScrollView, View, Text } from 'react-native';

export default function DeviceScreen() {
  return (
    <View>
      <ScrollView>
        <View>
          <Text style={{color: 'white'}}>My Device</Text>
          <Text style={{color: 'white'}}>Aqua Device #0193</Text>
        </View>
      </ScrollView>
    </View>
  );
}
