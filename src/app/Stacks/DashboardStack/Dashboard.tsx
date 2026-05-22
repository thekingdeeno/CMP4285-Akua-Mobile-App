import useDevice from '@/hooks/useDevice';
import { Fragment, useEffect, useState } from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import styles from './Dashboard.style';
import { mmkvStorage } from '@/utils/mmkv-storage';
mmkvStorage

export default function DashboardScreen() {
    const { getReadings_db, getReadings_bt, BTdevice, readings, isLoading , metricsIndex, attemptRecconnect } = useDevice();
    const pairedDevice = mmkvStorage.getString('pairedDevice')
    const [refreshing, setRefreshing] = useState<boolean>(false)

    // mmkvStorage.remove('pairedDevice')

    function LoadPage(){
        if (BTdevice) {
            console.log("BTDEICE FOUND", BTdevice);
            getReadings_bt()
            
        } else {
            console.log("NO cBTDEEVICE");
            if (pairedDevice) {
                console.log("has pair");
                
            }else {
                console.log("No pair")
            }
            attemptRecconnect().then((reconnect)=>{
                if (reconnect && reconnect.status === false) {
                    console.log("Unable to reconnect device");
                    getReadings_db(1);
                }
            });
        }
    }

    useEffect(() => {
        LoadPage()
    }, [BTdevice, refreshing]);

    return (
    <View style={styles.container}>
    <ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    refreshControl={
        <RefreshControl 
            refreshing={refreshing} 
            onRefresh={()=>{
                LoadPage()
            }} 
            // Optional: Customize colors
            tintColor="#007AFF" // iOS spinner color
            colors={['#007AFF']} // Android spinner colors
        />
    }
    >
        <View
            style={styles.screenHead}
        >
            <View style={styles.screenHead_Left}>
                <Text style={{
                    fontSize: 15,
                    color: 'white',
                }}>Hello, Good Morning 👋</Text>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',

                }}>Akua Monitor</Text>
            </View>
            <View style={styles.screenHead_Right}>
                <View style={styles.userIcon}>
                    <Text style={styles.userIconText}>NI</Text>
                </View>
            </View>
        </View>

        {!readings &&
            <View style={{
                backgroundColor: '#161B26',
                padding: 20,
                borderRadius: 15,
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 15,
                }}>
                    No device connected. Please connect a device on the device page to view readings.
                </Text>
            </View>
        }

        {readings &&
        
            <Fragment>

            <View style={styles.statusContainer}>
                <View style={styles.statusCard}>
                    <Text style={{
                        fontSize: 20,
                        lineHeight: 20,
                        color: '#0ab424',
                    }}>
                        Water is safe              
                    </Text>
                            <View style={{
                                borderRadius: '50%',
                                height: 13,
                                width: 13,
                                backgroundColor: '#0ab424'
                            }}/>
                </View>
            </View>
            
            <View style={styles.metricsContainer}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                paddingBottom: 20,
                paddingLeft: 10,
            }}>Live Readings</Text>
            <View style={styles.metricsList}>
                {readings.map((metric, index) => (
                    <View key={index} style={styles.metricCard}>
                        <Text style={{
                            fontSize: 12,
                            color: 'white',
                        }}>{metric.name}</Text>
                        <Text style={{
                            fontSize: 20,
                            color: 'white',
                            fontWeight: 'bold',
                        }}>{metric.value}</Text>
                        <Text style={{
                            fontSize: 15,
                            color: metric.color
                        }}>{metric.status}</Text>
                    </View>
                ))}
            </View>
        </View>


        <View style={styles.indexContainer}>
            <Text style={{
                color: 'white',
                marginBottom: 10,
                fontSize: 15,
                fontWeight: 'bold'
            }}>Quality Index</Text>
            {metricsIndex.map((index, i) => (
                <View key={i} style={styles.indexItem}>
                    <Text style={{
                        fontSize: 14,
                        color: 'white',
                        width: '20%',
                    }}>{index.name}</Text>
                    <View style={{
                        backgroundColor: '#202838',
                        width: '60%',
                        height: 10,
                        borderRadius: 10,
                        overflow: 'hidden',
                    }}>
                        <View style={{
                            backgroundColor: index.percent < 50 ? '#3A6EF0' : '#0ab424',
                            width: `${index.percent}%`,
                            height: '100%',
                        }} />
                    </View>
                    <Text style={{
                        fontSize: 13,
                        color: index.percent < 50 ? '#7799f0' : '#0ab424',
                        width: '10%',
                    }}>{index.value}</Text>
                </View>
            ))}
        </View>
            </Fragment>

        }

        <View style={{
            paddingVertical: 80,
        }}>

        </View>
    </ScrollView>
    </View>

  );
}
