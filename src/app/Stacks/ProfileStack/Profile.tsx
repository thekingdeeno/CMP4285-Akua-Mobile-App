import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

import styles from './Profile.style';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          <View style={styles.profileAvatar}>
            <Text style={{color: '#3C6EF0', fontSize: 20}}>
              DC
            </Text>
          </View>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Daniel Ceasar</Text>
          <Text style={{color: '#4A5069'}}>danielceasar@gmail.com</Text>
          <Text style={styles.pricePlan}>Free Plan</Text>
        </View>

        
        <View style={styles.account}>
          <Text style={{color: '#4A5069', paddingLeft: 17, paddingTop: 10, paddingBottom: 8}}>ACCOUNT</Text>
          <View style={{...styles.accountOption, borderBottomWidth:1, borderBottomColor: '#1D2635'}}>
            <Feather name="user" size={24} style={styles.accountOptionIcon} />
            <Text style={{color: 'white'}}>Edit Profile</Text>
          </View>
          <View style={styles.accountOption}>
            <Entypo name="star-outlined" size={24} style={styles.accountOptionIcon}/>
            <Text style={{color: 'white'}}>Upgrade Plan</Text>
          </View>
        </View>


          <TouchableOpacity  onPress={()=>null}>
            <Text style={{...styles.bottomButtonStyle, backgroundColor: '#2A1A1A', color: '#B23729'}}>
              Log Out
            </Text>
          </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
}