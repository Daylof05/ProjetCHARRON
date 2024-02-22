// Fonction pour récupérer une activité depuis l'API Bored
const fetchActivite = async (type: string, participants: string): Promise<any> => {
    try {
        const url = `http://www.boredapi.com/api/activity/?type=${type}&participants=${participants}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur lors de la récupération de l\'activité');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Fonction pour traduire du texte via l'API DeepL
const translateText = async (text: string, targetLang: string = 'FR'): Promise<string | null> => {
    try {
        const apiKey = '659fe892-15db-4d2b-9d17-fe0c9908ce5f:fx';
        const url = `https://api-free.deepl.com/v2/translate`;
        const params = new URLSearchParams();
        params.append('auth_key', apiKey);
        params.append('text', text);
        params.append('target_lang', targetLang);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });

        if (!response.ok) throw new Error('Erreur de traduction');
        const data = await response.json();
        return data.translations[0].text;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { fetchActivite, translateText };
