import { ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';
import styles from './Device.style';
import { Octicons, Feather } from '@expo/vector-icons'
import { localStorage } from '@/utils/localstorage';
import { Fragment } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function DeviceScreen() {

  const navigation = useNavigation<any>();
  const pairedDevice = localStorage.getString('pairedDevice');

  return (
    <View style={styles.container}>
      <ScrollView style={{minHeight: '100%'}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      >

        {!pairedDevice ?

        <Fragment>
          <View style={styles.pageHead}>
            <View style={styles.headText}>
              <Text style={{color: '#585F7C', fontSize: 15}}>My Device </Text>
              <Text style={{color: 'white', fontSize: 25, fontWeight:'bold'}}>
                {pairedDevice ? 'AKUASENSE v1' : 'No Linked Device'}
              </Text>
            </View>
            <View style={{...styles.statusDot, backgroundColor: `${pairedDevice ? 'green':'red'}`}}>
            </View>
          </View>

          <TouchableOpacity onPress={()=>navigation.navigate('DeviceConnect')}>
            <Text style={{...styles.bottomButtonStyle ,backgroundColor: '#1A2540', color: '#3D72FA'}}>
              Connect An Akua Sensor
            </Text>
          </TouchableOpacity>
        </Fragment>

        :

        <Fragment>
        <View style={styles.deviceDetails}>
          <View style={styles.detailsHead}>
            <View>
              <Octicons name="devices" size={24} color="#3C71F6" 
              style={{backgroundColor:'#1A2540', padding: 20, borderRadius: 15}} 
              />
            </View>
            <View style={{padding: 20}}>
              <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>AKUA-0042</Text>
              <Text style={{color:'#585F7C', fontSize: 15}}>ESP32 DevKit v1</Text>
            </View>
          </View>

          <View style={styles.espStat}>
            <Text style={styles.espKey}>Status</Text>
            <Text style={{...styles.espKeyValue, color:'green'}}>Online</Text>
          </View>

          <View style={styles.espStat}>
            <Text style={styles.espKey}>Last Sync</Text>
            <Text style={styles.espKeyValue}>Just now</Text>
          </View>

          <View style={styles.espStat}>
            <Text style={styles.espKey}>Firmware</Text>
            <Text style={{color:'white', fontSize: 15}}>v1.0.0</Text>
          </View>

          <View style={{...styles.espStat, borderBottomColor: 'transparent'}}>
            <Text style={styles.espKey}>Status</Text>
            <Text style={styles.espKeyValue}>Tank A</Text>
          </View>
        </View>

        <View style={{...styles.detailsHead, backgroundColor: '#1A2540', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10}}>
          <View>
            <Feather name="alert-triangle" size={24} color="#1B7F45" 
            style={{backgroundColor:'#1F3A2A', padding: 20, borderRadius: 15}} 
            />
          </View>
          <View style={{padding: 20}}>
            <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>All sensors are normal</Text>
            <Text style={{color:'#585F7C', fontSize: 15}}>No alert in the last 24h</Text>
          </View>
        </View>

        <View style={{...styles.bottomButtons, marginVertical: 30, gap: 15}}>
          <TouchableOpacity onPress={()=>null}>
            <Text style={{...styles.bottomButtonStyle ,backgroundColor: '#1A2540', color: '#3D72FA'}}>
              Send Command
            </Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=>null}>
            <Text style={{...styles.bottomButtonStyle, backgroundColor: '#2A1A1A', color: '#B23729'}}>
              Unlink Device
            </Text>
          </TouchableOpacity>
        </View>
        </Fragment>
        }
      </ScrollView>
    </View>
  );
}
