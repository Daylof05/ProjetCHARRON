import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

//Appel des APIs
import { fetchActivite, translateText } from '../services/ApiService';

const Activites: React.FC = () => {
    const [activite, setActivite] = useState<any | null>(null);
    const [translatedActivity, setTranslatedActivity] = useState<string | null>(null);
    const [participants, setParticipants] = useState<string>('');
    const [type, setType] = useState<string>('');

    // Fonction pour récupérer une activité
    const fetchData = async () => {
        const activiteData = await fetchActivite(type, participants);
        setActivite(activiteData);
        setTranslatedActivity(null); // Réinitialisation de la traduction
    };

    // Fonction pour traduire l'activité
    const handleTranslate = async () => {
        if (!activite || !activite.activity) return;
        const translation = await translateText(activite.activity, 'FR');
        setTranslatedActivity(translation);
    };

    useEffect(() => {
        fetchData(); // Appel initial pour charger une activité
    }, []);

    return (
        <View style={styles.container}>
        <Text style={styles.activityText}>
            {activite ? activite.activity : "Chargement de l'activité..."}
        </Text>
        {translatedActivity && <Text style={styles.translationText}>Traduction: {translatedActivity}</Text>}
        <TextInput
            style={styles.textInput}
            placeholder="Nombre de participants"
            keyboardType="numeric"
            value={participants}
            onChangeText={(text) => setParticipants(text.replace(/[^0-9]/g, ''))}
        />
        <TextInput
            style={styles.textInput}
            placeholder="Type d'activité"
            value={type}
            onChangeText={setType}
        />
        <Button
            title='Nouvelle activité'
            onPress={fetchData}
        />
        <View style={{ height: 10 }} />
        {activite && (
            <Button
                title='Traduire'
                onPress={handleTranslate}
            />
        )}
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5', // Un fond légèrement gris pour réduire la fatigue oculaire
    },
    textInput: {
      height: 40,
      width: '100%',
      borderColor: '#cccccc',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
      paddingLeft: 10,
      backgroundColor: 'white', // Fond blanc pour les champs de texte, pour les faire ressortir
    },
    button: {
      marginTop: 20,
      width: '60%', // Réduire la largeur des boutons pour un aspect plus centré et aligné
      borderRadius: 5,
    },
    buttonText: {
      textAlign: 'center',
    },
    activityText: {
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
    },
    translationText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
      color: 'gray', // Couleur grise pour distinguer la traduction
    },
  });

export default Activites;
