import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: screenWidth } = Dimensions.get('window');

const WaterQualityAlerts = () => {
    const [measure, setMeasure] = useState("bod5");
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [numColumns, setNumColumns] = useState(1); 

    const today = new Date().toISOString().split('T')[0];

    const fetchPredictions = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://192.168.1.133:5000/predict', {
                date: today,
                measure: measure
            });
            setPredictions(response.data.predictions);
        } catch (error) {
            console.error("Error fetching predictions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPredictions();
    }, [measure]);

    const measuresInfo = [
        {
            title: "BOD5",
            description: "Biochemical Oxygen Demand, an indicator of organic matter in water.",
            imageUrl: "https://www.middlesusquehannariverkeeper.org/uploads/7/8/8/1/78814684/foam_orig.jpg",
            icon: "tint",
        },
        {
            title: "TSS",
            description: "Total Suspended Solids, indicating water clarity and pollution.",
            imageUrl: "https://cdn.britannica.com/81/156681-050-64B6C301/bottles-garbage-lake.jpg",
            icon: "eye",
        },
        {
            title: "pH",
            description: "Measure of acidity or alkalinity, affecting aquatic life.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Rio_tinto_river_CarolStoker_NASA_Ames_Research_Center.jpg",
            icon: "flask",
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Icon name={item.icon} size={40} color="#003366" />
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
    );

    const renderPrediction = ({ item }) => (
        <View style={styles.alertBox}>
            <Text style={styles.alertText}>
                {item.values[0][2]}
            </Text>
        </View>
    );

    const renderSeparator = () => <View style={styles.separator} />;

    const data = [
        { type: 'instruction', content: "Select a water quality measure and click 'Get Predictions' to see our water body general forecast for today!" },
        { type: 'line', content: null },
        { type: 'date', content: `Today's Date: ${today}` },
        { type: 'location', content: 'Location: Malaysia' },
        { type: 'measurePicker', content: null },
        { type: 'getPredictionsButton', content: null },
        { type: 'predictions', content: predictions },
        { type: 'note', content: 'Note on Water Quality Measures:' },
        { type: 'measures', content: measuresInfo }
    ];

    const renderItemInFlatList = ({ item }) => {
        switch (item.type) {
            case 'instruction':
                return <Text style={styles.instruction}>{item.content}</Text>;
            case 'line':
                return <View style={styles.line} />;
            case 'date':
                return <Text style={styles.date}>{item.content}</Text>;
            case 'location':
                return <Text style={styles.location}>{item.content}</Text>;
            case 'measurePicker':
                return (
                    <>
                        <Text style={styles.label}>Select Measure:</Text>
                        <Picker
                            selectedValue={measure}
                            onValueChange={(itemValue) => setMeasure(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="BOD5" value="bod5" />
                            <Picker.Item label="TSS" value="tss" />
                            <Picker.Item label="pH" value="ph" />
                        </Picker>
                    </>
                );
            case 'getPredictionsButton':
                return (
                    <Button title="Get Predictions" onPress={fetchPredictions} color="#2196F3" />
                );
            case 'predictions':
                return loading ? (
                    <Text style={styles.loading}>Loading...</Text>
                ) : (
                    predictions.length > 0 ? (
                        predictions.map((prediction, index) => (
                            <View key={index} style={styles.alertBox}>
                                <Text style={styles.alertText}>
                                    {prediction.values[0][0]}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.loading}>No predictions available.</Text>
                    )
                );
            case 'note':
                return <Text style={styles.noteTitle}>{item.content}</Text>;
            case 'measures':
                return (
                    <FlatList
                        data={item.content}
                        renderItem={renderItem}
                        keyExtractor={(measure) => measure.title}
                        numColumns={numColumns} 
                        contentContainerStyle={styles.gridContainer}
                        key={`${numColumns}`}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItemInFlatList}
            keyExtractor={(item) => item.type}
            ItemSeparatorComponent={renderSeparator}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#e3f2fd',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 5,
    },
    instruction: {
        fontSize: 18,
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#003366',
    },
    line: {
        height: 1,
        backgroundColor: '#2196F3',
        marginVertical: 10,
        width: '100%',
    },
    date: {
        fontSize: 16,
        marginBottom: 5,
        color: '#455a64',
        textAlign: 'center',
    },
    location: {
        fontSize: 16,
        marginBottom: 15,
        color: '#455a64',
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        marginVertical: 10,
        fontWeight: 'bold',
        color: '#003366',
    },
    loading: {
        fontSize: 16,
        color: '#2196F3',
        textAlign: 'center',
        marginVertical: 10,
    },
    alertBox: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    alertText: {
        fontSize: 24,
        color: '#2196F3',
        fontWeight: 'bold',
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center',
        color: '#003366',
    },
    card: {
        backgroundColor: '#ffe0b2',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginVertical: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: '100%',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#d84315',
    },
    cardDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        color: '#455a64',
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginTop: 10,
    },
    gridContainer: {
        justifyContent: 'space-between',
    },
    separator: {
        height: 15,
    },
});

export default WaterQualityAlerts;

