import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import Checkbox from 'expo-checkbox';

const WaterQualityFeedback = () => {
    const [feedback, setFeedback] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [conditions, setConditions] = useState({
        algae: false,
        odor: false,
        cloudy: false,
        trash: false,
    });
    const [manualAddress, setManualAddress] = useState('');
    const [useManualAddress, setUseManualAddress] = useState(false);

    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!feedback || (!location && !manualAddress) || rating <= 0) {
            Alert.alert("All fields are required!");
            return;
        }
        Alert.alert("Feedback submitted successfully!");
    };

    const handleConditionChange = (condition) => {
        setConditions((prev) => ({ ...prev, [condition]: !prev[condition] }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>
                <Ionicons name="chatbubbles" size={24} color="#64b5f6" /> Water Quality Feedback
            </Text>

            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 3.1652, // coordinates for lake garden kl
                        longitude: 101.6869,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 3.1652, longitude: 101.6869 }}
                        title="Lake Gardens"
                        description="Taman Tasik Perdana"
                    />
                </MapView>
            </View>

            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Enter address manually</Text>
                <Checkbox
                    value={useManualAddress}
                    onValueChange={setUseManualAddress}
                    color={useManualAddress ? '#64b5f6' : undefined}
                />
            </View>

            {useManualAddress ? (
                <TextInput
                    style={styles.input}
                    placeholder="Enter location"
                    value={manualAddress}
                    onChangeText={setManualAddress}
                />
            ) : (
                <Text style={styles.placeholder}>Location: Taman Tasik Perdana</Text>
            )}

            <Text style={styles.label}>Rating:</Text>
            <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <Ionicons
                            name={star <= rating ? 'star' : 'star-outline'}
                            size={32}
                            color="#64b5f6"
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Water Conditions:</Text>
            {Object.keys(conditions).map((condition) => (
                <View key={condition} style={styles.checkboxContainer}>
                    <Checkbox
                        value={conditions[condition]}
                        onValueChange={() => handleConditionChange(condition)}
                        color={conditions[condition] ? '#64b5f6' : undefined}
                    />
                    <Text style={styles.checkboxLabel}>{condition.charAt(0).toUpperCase() + condition.slice(1)}</Text>
                </View>
            ))}

            {}
            <View style={styles.spacer} />

            <TextInput
                style={styles.input}
                placeholder="Your feedback"
                value={feedback}
                onChangeText={setFeedback}
                multiline
            />

            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

            <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
                <Text style={styles.uploadText}><Ionicons name="camera" size={18} /> Upload Image</Text>
            </TouchableOpacity>

            <Button title="Submit Feedback" onPress={handleSubmit} color="#2196F3" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { 
        padding: 20, 
        backgroundColor: '#e3f2fd', 
        borderRadius: 15, 
        marginVertical: 10, 
        elevation: 3 
    },
    header: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        marginBottom: 15, 
        textAlign: 'center', 
        color: '#0d47a1' 
    },
    mapContainer: { 
        height: 200, 
        marginVertical: 10, 
        borderRadius: 15, 
        overflow: 'hidden' 
    },
    map: { 
        width: '100%', 
        height: '100%' 
    },
    switchContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 10 
    },
    switchLabel: { 
        fontSize: 16, 
        color: '#555', 
        marginRight: 10 
    },
    input: { 
        height: 40, 
        borderColor: '#64b5f6', 
        borderWidth: 2, 
        marginBottom: 10, 
        paddingHorizontal: 10, 
        borderRadius: 10, 
        backgroundColor: '#fff' 
    },
    placeholder: { 
        fontSize: 16, 
        color: '#888', 
        marginVertical: 10, 
        textAlign: 'center' 
    },
    label: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 5, 
        color: '#0d47a1' 
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-around',
    },
    checkboxContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: 5 
    },
    checkboxLabel: { 
        marginLeft: 8, 
        fontSize: 16, 
        color: '#555' 
    },
    uploadButton: { 
        alignItems: 'center', 
        padding: 10, 
        backgroundColor: '#bbdefb', 
        borderRadius: 10, 
        marginVertical: 10 
    },
    uploadText: { 
        color: '#0d47a1', 
        fontSize: 16 
    },
    image: { 
        width: '100%', 
        height: 150, 
        borderRadius: 10, 
        marginVertical: 10 
    },
    spacer: {
        marginVertical: 20, 
    },
});

export default WaterQualityFeedback;
