import { View, Text, ScrollView } from 'react-native';
import styles from './Dashboard.style';

const sampleMetrics = [
    { name: 'pH Level', value: '7.2', status: 'Safe' },
    { name: 'Turbidity', value: '5 NTU', status: 'Safe' },
    { name: 'Temperature', value: '22°C', status: 'Safe' },
    { name: 'TDS', value: '300', status: 'Safe' },
];

const sampleIndex = [
    {name: 'Ph', percent: 55, value: 7.2},
    {name: 'TDS', percent: 67, value: 310},
    {name: 'Turbidity', percent: 35, value: 3.5},
]

export default function DashboardScreen() {
    return (
    <View style={styles.container}>
    <ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
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

        <View style={styles.statusContainer}>
            <View style={styles.statusCard}>
                <Text style={{
                    fontSize: 23,
                    fontWeight: 'bold',
                    color: '#0ab424',
                }}>
                    Water is safe ✅
                </Text>
            </View>
        </View>


        <View style={styles.metricsContainer}>
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white',
                paddingBottom: 20,
                paddingLeft: 10,
            }}>Live Readings</Text>
            <View style={styles.metricsList}>
                {sampleMetrics.map((metric, index) => (
                    <View key={index} style={styles.metricCard}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'white',
                        }}>{metric.name}</Text>
                        <Text style={{
                            fontSize: 30,
                            color: 'white',
                            fontWeight: 'bold',
                        }}>{metric.value}</Text>
                        <Text style={{
                            fontSize: 17,
                            color: metric.status === 'Safe' ? '#0ab424' : '#ab2400',
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
            }}>Qaulity Index</Text>
            {sampleIndex.map((index, i) => (
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
                        // 
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
        <View style={{
            paddingVertical: 80,
        }}>

        </View>
    </ScrollView>
    </View>

  );
}
