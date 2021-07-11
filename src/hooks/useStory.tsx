import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSaveStory } from '../hooks/useSaveStory';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import storyStorage from '../storage/Stories';

export function useStory() {
    const history = useHistory();
    const { storyValue, updateStoryValue } = useSaveStory();
    const { user, signInWithGoogle } = useAuth();

    const [text, setText] = useState(String);
    const [numberLetter, setNumberLetter] = useState(0);

    useEffect(() => {
        if (numberLetter < storyStorage[storyValue.storyNumber]['text'].length) { // Escreve o texto pausadamente
            setText(text => text + storyStorage[storyValue.storyNumber]['text'].charAt(numberLetter)); // Adiciona a próxima letra ao texto
            setTimeout(() => {
                setNumberLetter(numberLetter + 1);
            }, 70)
        }
    }, [numberLetter]);

    async function continueStory() {
        if (!user) {
            await signInWithGoogle();
        }

        if (storyStorage[storyValue.storyNumber]['endingGame']) {
            updateStoryValue({...storyValue, inGame: false });
            endGame();
        }
        
        if (String(storyStorage[storyValue.storyNumber]['callBattle']) !== 'undefined') {
            callBattle();
        } else { // Próximo trecho da história
            setText('');
            setNumberLetter(-1); // "-1" Elimina o primeiro caracter quando inicia o texto
            updateStoryValue({...storyValue, storyNumber: storyValue.storyNumber + 1});
        }
    }

    function callBattle() {
        // Se ultima batalha houve derrota, encerra jogo
        if (!storyValue.inGame) {
            endGame();
            return;
        }

        history.push('/story-battle');
    }

    async function endGame() {
        const rankingRef = database.ref(`ranking`);

        await rankingRef.push({
            id: user?.id,
            name: user?.name,
            avatar: user?.avatar,
            score: storyValue.score,
            date: Date()
        });

        history.push('/');
    }

    return { continueStory, callBattle, text, numberLetter, storyStorage, storyValue };
}