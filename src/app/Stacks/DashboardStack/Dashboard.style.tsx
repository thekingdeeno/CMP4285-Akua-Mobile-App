import { StyleSheet } from "react-native";
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingTop: 60,
        backgroundColor: '#0D1116',
        flex: 1,
        // height: '110%'
    },

    // SCREEN HEAD
    screenHead: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 30,
    },

    screenHead_Left: {
        rowGap: 5,
    },
    screenHead_Right: {

    },
    userIcon: {
        backgroundColor: 'grey',
        borderRadius: 50,
        padding: 10,
    },

    // STATUS 

    statusContainer: {
        // backgroundColor:'#0ab424',
    },
    statusCard: {
        backgroundColor: '#161B26',
        width: '60%',
        padding: 15,
        borderRadius: 25,
    },


    
    // METRICS

    metricsContainer: {
        marginTop: 30,
        backgroundColor: '#161B26',
        padding: 20,
        borderRadius: 25,
    },
    metricsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 30,
    },
    metricCard: {
        backgroundColor: '#202838',
        padding: 20,
        width: '45%',
        borderRadius: 25,
    },



    // QUALITY INDEX

    indexContainer: {
        marginVertical: 20,
        padding: 20,
        backgroundColor: '#161B26',
        borderRadius: 25
    },

    indexItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },




});

export default styles;