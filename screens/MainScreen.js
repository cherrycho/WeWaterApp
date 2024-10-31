import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Linking, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainScreen = ({ navigation }) => {
  const [isDayMode, setIsDayMode] = useState(true);

  const waterQualityCards = [
    { title: "Water Quality Alerts", icon: "bell", navigateTo: "Water Quality Alerts" },
    { title: "Provide Feedback", icon: "edit", navigateTo: "Water Quality Feedback" },
    { title: "Educational Content", icon: "book", navigateTo: "Educational Content" },
    { title: "Interactive Map", icon: "map", navigateTo: "Interactive Map" },
  ];

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => item.navigateTo === "Interactive Map" ? handleMapPress() : navigation.navigate(item.navigateTo)}
    >
      <Icon name={item.icon} size={30} color="#fff" style={styles.icon} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleMapPress = () => {
    Linking.openURL('https://rqims.doe.gov.my/rqims_conti/home_conti.html');
  };

  const toggleTheme = () => {
    setIsDayMode(prevMode => !prevMode);
  };

  const showAboutInfo = () => {
    Alert.alert(
      "About WeWater",
      "WeWater is an application designed to help users track and provide feedback on water quality. Users can view alerts, submit feedback, and access educational resources to promote awareness and environmental responsibility.",
      [{ text: "OK" }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDayMode ? '#e3f2fd' : '#424242' }]}>
      <Image 
        source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/024/984/032/small_2x/hand-holding-water-droplets-water-reduction-concept-for-the-planet-3d-illustration-png.png' }}
        style={styles.logo} 
      />
      <Text style={[styles.title, { color: isDayMode ? '#003366' : '#fff' }]}>Welcome to WeWater!</Text>
      <Text style={[styles.description, { color: isDayMode ? '#555' : '#ccc' }]}>
        Discover the quality of water around you, provide feedback, and access educational resources.
      </Text>
      <FlatList
        data={waterQualityCards}
        renderItem={renderCard}
        keyExtractor={(item) => item.title}
        numColumns={2} 
        contentContainerStyle={styles.gridContainer}
      />
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolButton} onPress={toggleTheme}>
          <Icon name={isDayMode ? "sun-o" : "moon-o"} size={20} color="#fff" />
          <Text style={styles.toolText}>{isDayMode ? "Day Mode" : "Night Mode"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} onPress={showAboutInfo}>
          <Icon name="info-circle" size={20} color="#fff" />
          <Text style={styles.toolText}>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '44%', 
    height: 120,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#0056b3',
  },
  icon: {
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  gridContainer: {
    paddingBottom: 20,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  toolButton: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  toolText: {
    color: '#fff',
  },
});

export default MainScreen;
