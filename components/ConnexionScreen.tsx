import { auth } from '../services/Firebase'
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const ConnexionScreen: React.FC = () => {
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');

    // Inscription
    const registerUser = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Utilisateur inscrit');
        } catch (error) {
            console.error(error);
        }
    };
    // Connexion
    const loginUser = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Utilisateur connecté');
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Adresse mail'
                value={email}
                onChangeText={setMail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder='Mot de passe'
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title='Inscription'
                    onPress={() => registerUser(email, password)}
                />
                <Button
                    title='Connexion'
                    onPress={() => loginUser(email, password)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
});

export default ConnexionScreen;