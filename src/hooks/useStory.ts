import { useContext } from "react";
import { StoryContext } from "../contexts/StoryContext";

export function useStory() {
    const value = useContext(StoryContext);

    return value;
}