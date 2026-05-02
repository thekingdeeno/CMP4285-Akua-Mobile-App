import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 20,
        paddingTop: 60,
        backgroundColor: '#0D1116',
        flex: 1,
    },


    topSection:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    profileAvatar: {
        backgroundColor: '#1A2540',
        width: 80,
        height: 80,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },

    pricePlan: {
        color: '#3C6EF0', 
        backgroundColor: '#1A2540', 
        padding: 5, 
        paddingHorizontal: 15, 
        borderRadius: 15, 
        margin: 10, 
        fontSize: 10
    },



    account: {
        backgroundColor: '#161B26',
        // paddingVertical: 20,
        marginVertical: 10,
        borderRadius: 20,
    },

    accountOption:{
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    accountOptionIcon:{
        backgroundColor:'#1A2540',
        color:"#3C6EF0",
        padding: 10,
        marginRight: 13,
        borderRadius: 10
    },

    bottomButtonStyle: {
        borderRadius: 15,
        textAlign:'center', padding: 20, fontSize: 15, fontWeight: 'bold'
    }
})

export default styles