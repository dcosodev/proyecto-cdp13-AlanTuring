

// Uso las librerias de express, node-fetch y cors para crear un servidor que se conecte a la 
// API de Musixmatch y devuelva los resultados de las busquedas de letras de canciones.



import path from 'path';
import express from 'express';
import fetch from 'node-fetch'; 
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express(); // Creo una instancia de express.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Puerto en el que se ejecutará el servidor.

app.use(express.static(path.join(__dirname, '..', '..', '/')));

app.use(cors());

app.all('/searchLyrics', async (req, res) => { // Ruta para buscar letras de canciones a través del proxy.
    const { lyrics } = req.query;
    const apiKey = process.env.MUSIXMATCH_API_KEY;
    // URL de la API de Musixmatch para buscar letras de canciones.
    const url = `https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=${encodeURIComponent(lyrics)}&apikey=${apiKey}&page_size=10&page=1&s_track_rating=desc`; 

    try { // Intento hacer la petición a la API y devolver los resultados.
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();
        res.json(data);
    } catch (error) {
        console.error('API request error:', error);
        res.status(500).send('Server error');
    }
});

app.all('/fetchLyrics', async (req, res) => { // Ruta para buscar las letras de una canción a través del proxy.
    const { track_id } = req.query;
    const apiKey = process.env.MUSIXMATCH_API_KEY;
    // URL de la API de Musixmatch para buscar las letras de una canción.
    const url = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=${apiKey}`;

    try {
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();
        res.json(data);
    } catch (error) {
        console.error('API request error:', error);
        res.status(500).send('Server error');
    }
});



