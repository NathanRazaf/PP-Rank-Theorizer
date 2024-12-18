export interface User {
    username: string;
    avatarUrl: string;
    coverUrl: string;
    countryCode: string;
    pp: number;
    globalRank: number;
    countryRank: number;
    accuracy: number;
    level: number;
    levelProgress: number;
}

export interface GetUserApiResponse {
    username: string;
    avatar_url: string;
    cover_url: string;
    country_code: string;
    pp: number;
    global_rank: number;
    country_rank: number;
    accuracy: number;
    level: number;
    level_progress: number;
}

export interface Score {
    accuracy: number;
    score: number;
    beatmapUrl: string;
    title: string;
    artist: string;
    version: string;
    mods: string[];
    pp: number;
    maxCombo: number;
    grade: string;
}

export interface ScoreResponse {
    accuracy: number;
    score: number;
    beatmap_url: string;
    title: string;
    artist: string;
    version: string;
    mods: string[];
    pp: number;
    max_combo: number;
    grade: string;
}

export type GetUserScoresApiResponse = Array<ScoreResponse>