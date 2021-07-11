import { useContext } from "react";
import { SaveStoryContext } from "../contexts/SaveStoryContext";

export function useSaveStory() {
    const value = useContext(SaveStoryContext);

    return value;
}