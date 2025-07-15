import type { IMood } from "./moodInterface";
import type { IPause } from "./pauseInterface";

export interface IGlobalState {
    mood: IMood
    likedPauses: IPause[]
    userStats: any,
    userJournal: any
}