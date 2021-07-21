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
    const [speedText, setSpeedText] = useState(false);

    useEffect(() => {
        // Escreve o texto pausadamente
        if (numberLetter < storyStorage[storyValue.storyNumber]['text'].length) {
            // Adiciona a próxima letra ao texto
            setText(text => text + storyStorage[storyValue.storyNumber]['text'].charAt(numberLetter));
            setTimeout(() => {
                setNumberLetter(numberLetter + 1);
            }, speedText === true ? 1 : 70)
        }
    }, [numberLetter]);

    function speedTextStory() {
        setSpeedText(!speedText);
    }

    async function continueStory() {
        if (!user) {
            await signInWithGoogle();
        }

        if (storyStorage[storyValue.storyNumber]['endingGame']) {
            updateStoryValue({...storyValue, inGame: false });
            endGame();
            return;
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
        if (!storyValue.inGame) { // Garante não entrar em nova batalha após fim de jogo
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

    return {
        continueStory,
        callBattle,
        text,
        speedTextStory,
        speedText,
        numberLetter,
        storyStorage,
        storyValue
    };
}