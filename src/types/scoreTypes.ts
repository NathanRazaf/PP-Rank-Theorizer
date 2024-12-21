
export interface Score {
    accuracy: number;
    score: number;
    beatmapUrl: string;
    title: string;
    id: number;
    artist: string;
    version: string;
    date: string;
    mods: string[];
    pp: number;
    maxCombo: number;
    grade: string;
    weight: number;
    actualPP: number;
}

export interface ScoreResponse {
    accuracy: number;
    score: number;
    id: number;
    beatmap_url: string;
    title: string;
    artist: string;
    version: string;
    date: string;
    mods: string[];
    pp: number;
    max_combo: number;
    grade: string;
    weight: number;
    actual_pp: number;
}

export type GetUserScoresApiResponse = Array<ScoreResponse>