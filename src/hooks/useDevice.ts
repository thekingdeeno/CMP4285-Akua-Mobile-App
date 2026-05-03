import { useState } from 'react';
import { httpClient } from '../api/http';
import { localStorage } from '@/utils/localstorage';
import { Alert } from 'react-native';

const useDevice = () => {
    const [readings, setReadings] = useState<{name: string, value: string, status: string, color?:string}[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [metricsIndex, setMetricsIndex] = useState<{name: string, percent: number, value: number}[]>([]);

    // const bleManager = new BleManager();

    const getLastSavedReadings = async (deviceId: string | number) => {
        try {
            setIsLoading(true);
            const {data} = await httpClient.get(`/hardware/fetch-readings/${deviceId}`);
            
            if (data.status === true) {
                const metric = data.data;
                // metric.ph = 7;
                // metric.turb = 6;
                // metric.tds = 309;
                const metrics = [
                    { name: 'pH Level', value: metric.ph, status: 
                        metric.ph < 6.5 && 'Acidic' || 
                        metric.ph > 8.5 && 'Alkaline' || 
                        'Safe',
                        color: metric.ph < 6.5 || metric.ph > 8.5 ? 'red' : 'green'
                    },
                    { name: 'Turbidity', value: `${metric.turb} NTU`, status: 
                        metric.turb <= 1 && 'Perfect' ||
                        metric.turb > 1 && metric.turb <= 3  && 'Clean' ||
                        metric.turb > 3 && metric.turb <= 5 && ' Cloudy' || 
                        'Risky',
                        color: metric.turb > 5 ? 'red' : 'green'
                     },
                     { name: 'TDS', value: metric.tds, status:
                        metric.tds <= 50 && 'Demineralised' || 
                        metric.tds > 50 && metric.tds <= 150 && 'Ideal' ||
                        metric.tds > 300 && metric.tds <= 600 && 'Fair' ||
                        metric.tds > 600 && metric.tds <= 900 && 'Poor' ||
                        metric.tds > 900 && metric.tds <= 1200 && 'Unacceptable' ||
                         'Unsafe',
                        color: metric.tds > 600 ? 'red' : 'green'
                     },
                    { name: 'Temperature', value: metric.temp, status: '' },
                ];

                setMetricsIndex([
                    {name: 'Ph', percent: (metrics[0].value / 14) * 100 , value: metrics[0].value},
                    {name: 'TDS', percent: (metrics[2].value / 900) * 100, value: metrics[2].value},
                    {name: 'Turbidity', percent: (metrics[1].value[0] / 7) * 100, value: metrics[1].value[0]},
                ]);
                setReadings(metrics);
            }
        } catch (error) {
            console.log('Error fetching last saved readings:', error);
            Alert.alert('Error', 'Failed to fetch last saved readings.');
        } finally {
            setIsLoading(false);
        }
    }

    return {
        getLastSavedReadings,
        readings,
        isLoading,
        metricsIndex
    }
}

export default useDevice;