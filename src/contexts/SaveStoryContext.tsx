import { useState, createContext, ReactNode } from "react";

type StoryType = {
    remedy: number;
    maximumPower: number;
    yourMonsterNumber: number;
    opponentMonsterNumber: number;
    storyNumber: number;
    inGame: boolean;
    score: number
}

type UpdateStoryContextType = {
    storyValue: StoryType
    updateStoryValue: any //@todo corrigir;
}

type StoryContextProviderProps = {
    children: ReactNode;
}

export const SaveStoryContext = createContext({} as UpdateStoryContextType);

export function SaveStoryContextProvider(props: StoryContextProviderProps) {
    const [storyValue, setStoryValue] = useState<StoryType>({
        remedy: 2,
        maximumPower: 2,
        yourMonsterNumber: 0,
        opponentMonsterNumber: 0,
        storyNumber: 0,
        inGame: false,
        score: 0
    });

    function updateStoryValue(value: StoryType) {
        const updateValues = {
            remedy: value.remedy,
            maximumPower: value.maximumPower,
            yourMonsterNumber: value.yourMonsterNumber,
            opponentMonsterNumber: value.opponentMonsterNumber,
            storyNumber: value.storyNumber,
            inGame: value.inGame,
            score: value.score
        };

        setStoryValue(updateValues);
    }

    return (
        <SaveStoryContext.Provider value={{ storyValue, updateStoryValue }}>
            {props.children}
        </SaveStoryContext.Provider>
    );
}