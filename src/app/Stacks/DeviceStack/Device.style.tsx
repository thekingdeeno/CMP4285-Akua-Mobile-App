import { StyleSheet } from "react-native";
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 60,
        backgroundColor: '#0D1116',
        flex: 1,
    },

    pageHead:{
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        padding: 7
    },
    headText: {
    
    },
    statusDot: {
        borderRadius: 10,
        height: 13,
        width: 13,
        backgroundColor: 'red'
    },


    // Device

    deviceDetails:{
        backgroundColor: '#161B26',
        paddingHorizontal: 20,
        borderRadius: 20,
        paddingBottom: 10,
        marginBottom: 15,
    },

    detailsHead:{
        display: 'flex',
        alignItems: 'center',
        // justifyContent:'flex-start',
        flexDirection: 'row'
    },

    espStat: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#1E2737',
    },

    espKey: {
        color:'#585F7C', 
        fontSize: 15
    },

    espKeyValue: {
        color:'white', 
        fontSize: 15
    },

    bottomButtons:{
        marginTop: 100
    },

    bottomButtonStyle: {
        borderRadius: 15,
        textAlign:'center', padding: 20, fontSize: 15, fontWeight: 'bold'
    }
});

export default styles;