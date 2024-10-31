import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, Share } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const educationalArticles = [
    {
        id: '1',
        title: 'Understanding Water Quality',
        summary: 'Water quality is a measure of the physical, chemical, and biological characteristics of water, and how suitable it is for various uses. Its important to understand water quality because it affects human health, the environment, and industrial and domestic use.',
        videoUrl: 'https://www.youtube.com/watch?v=OTerH6SgwO8',
        imageUrl: 'https://sinay.ai/wp-content/uploads/2022/08/shutterstock_795331030.jpg',
        tags: ['Water Quality', 'Basics'],
        quickFacts: ['pH level affects taste.', 'Clear water isn’t always clean.']
    },
    {
        id: '2',
        title: 'The Importance of Clean Water',
        summary: 'Clean water is essential for health and well-being. This UNICEF article discusses the impact of clean water on children’s health and education. For more details, click Read More button to read the full article.',
        articleUrl: 'https://www.unicef.org/water-sanitation-and-hygiene-wash',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/5669c7222399a395a9879dd1/1560369134320-3G59UJQ5CVZ4WARFVT1N/aqua-blurred-background-clear-1536866.jpg?format=2500w',
        tags: ['Health', 'Environment'],
        quickFacts: ['Water makes up 60% of the human body.', 'Contaminated water can cause diseases.']
    },
    {
        id: '3',
        title: 'How to Test Water Quality at Home',
        imageUrl: 'https://www.safewise.com/app/uploads/2021/10/water-test-2-1.jpg', // Thumbnail
        infographicUrl: 'https://www.consumernotice.org/wp-content/uploads/how-to-test-water-quality-at-home-640x0-c-default.png', // New infographic image
        tags: ['DIY', 'Testing'],
        quickFacts: ['Home kits are available online.', 'Regular testing is recommended.']
    },
    {
        id: '4',
        title: 'Common Water Contaminants',
        imageUrl: 'https://nuvoh2o.com/product_images/uploaded_images/the-most-common-water-contaminants-3.jpg', // Thumbnail
        infographicUrl: 'https://nuvoh2o.com/product_images/uploaded_images/m29816-nuvoh2o-the-most-common-water-contaminants-infographic.jpg', // New infographic image
        tags: ['Contaminants', 'Safety'],
        quickFacts: ['Lead can come from pipes.', 'Bacteria can cause illness.']
    },
    {
        id: '5',
        title: 'Protecting Our Water Sources',
        summary: 'The Water Source Protection means protecting from contamination and overuse (at the source), both water quality and quantity we drink and use, thus reducing risks to public health from exposures to contaminated water.',
        videoUrl: 'https://www.youtube.com/watch?v=sYBF5dqCxQo',
        imageUrl: 'https://www.epa.gov/sites/default/files/styles/medium/public/2020-01/istock-1174427075.jpg?itok=-nERcXEX',
        tags: ['Conservation', 'Environment'],
        quickFacts: ['Reduce plastic usage.', 'Participate in local clean-ups.']
    },
];

const EducationalContent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredArticles, setFilteredArticles] = useState(educationalArticles);
    const [expandedArticle, setExpandedArticle] = useState(null);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = educationalArticles.filter(article =>
            article.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredArticles(filtered);
    };

    const shareArticle = async (title) => {
        try {
            await Share.share({
                message: `Check out this article: ${title}`,
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const toggleExpand = (id) => {
        if (expandedArticle === id) {
            setExpandedArticle(null);
        } else {
            setExpandedArticle(id);
        }
    };

    const openLink = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Educational Content</Text>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#007BFF" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                data={filteredArticles}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.articleBlock}>
                            <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
                            <View style={styles.articleInfo}>
                                <Text style={styles.articleTitle}>{item.title}</Text>
                                <TouchableOpacity onPress={() => shareArticle(item.title)}>
                                    <Text style={styles.shareButton}>Share</Text>
                                </TouchableOpacity>
                                <View style={styles.tagsContainer}>
                                    {item.tags.map((tag, index) => (
                                        <Text key={index} style={styles.tag}>{tag}</Text>
                                    ))}
                                </View>
                                <TouchableOpacity style={styles.seeMoreButton} onPress={() => toggleExpand(item.id)}>
                                    <Text style={styles.seeMoreText}>See More</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {expandedArticle === item.id && (
                            <CollapseBody>
                                {item.id === '3' && (
                                    <>
                                        <Image source={{ uri: item.infographicUrl }} style={styles.fullImage} resizeMode="contain" />
                                        <Text style={styles.articleContent}>Simple methods to test water quality using home kits. Check out this image guide.</Text>
                                    </>
                                )}
                                {item.id === '4' && (
                                    <>
                                        <Image source={{ uri: item.infographicUrl }} style={styles.fullImage} resizeMode="contain" />
                                        <Text style={styles.articleContent}>Learn about common water contaminants and their effects. View this infographic for a quick overview.</Text>
                                    </>
                                )}
                                {item.id === '1' && (
                                    <>
                                        <Text style={styles.articleContent}>{item.summary}</Text>
                                        <TouchableOpacity onPress={() => openLink(item.videoUrl)} style={styles.readMoreButton}>
                                            <Text style={styles.readMoreText}>Watch Video</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {item.id === '2' && (
                                    <>
                                        <Text style={styles.articleContent}>{item.summary}</Text>
                                        <TouchableOpacity onPress={() => openLink(item.articleUrl)} style={styles.readMoreButton}>
                                            <Text style={styles.readMoreText}>Read More</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {item.id === '5' && (
                                    <>
                                        <Text style={styles.articleContent}>{item.summary}</Text>
                                        <TouchableOpacity onPress={() => openLink(item.videoUrl)} style={styles.readMoreButton}>
                                            <Text style={styles.readMoreText}>Watch Video</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                <View style={styles.quickFactsContainer}>
                                    <Text style={styles.quickFactsTitle}>Quick Facts:</Text>
                                    {item.quickFacts.map((fact, index) => (
                                        <Text key={index} style={styles.quickFact}>• {fact}</Text>
                                    ))}
                                </View>
                            </CollapseBody>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#e6f2ff', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#003366', 
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#007BFF',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        flex: 1,
    },
    articleBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        marginBottom: 12,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    articleInfo: {
        flex: 1,
        marginLeft: 10,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366', 
    },
    shareButton: {
        color: '#007BFF',
        marginTop: 5,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    tag: {
        backgroundColor: '#cce6ff',
        borderRadius: 5,
        padding: 5,
        margin: 2,
    },
    seeMoreButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    seeMoreText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    fullImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1, 
        marginVertical: 10,
    },
    articleContent: {
        fontSize: 16,
        marginVertical: 10,
        color: '#333',
    },
    quickFactsContainer: {
        marginTop: 10,
        marginBottom:10,
        padding: 10,
        backgroundColor: '#ffe0b2',
        borderRadius: 8,
    },
    quickFactsTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    quickFact: {
        fontSize: 16,
        color: '#555',
    },
    readMoreButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#28a745',
        borderRadius: 5,
        alignItems: 'center',
    },
    readMoreText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default EducationalContent;
