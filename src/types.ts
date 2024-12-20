export interface User {
    username: string;
    avatarUrl: string;
    coverUrl: string;
    countryCode: string;
    playTime: number;
    numMedals: number;
    countryName: string;
    supportLevel: number;
    statistics: UserStatistics;
    rankHistory: number[];
    gradeCounts: GradeCounts;
    pp: number;
    globalRank: number;
    countryRank: number;
    level: number;
    levelProgress: number;
}

export interface UserStatistics {
    accuracy: number;
    ranked_score: number;
    total_score: number;
    replays_watched: number;
    total_hits: number;
    maximum_combo: number;
    play_count: number;
}

export interface GradeCounts {
    SSH: number;
    SS: number;
    SH: number;
    S: number;
    A: number;
}

export interface GetUserApiResponse {
    username: string;
    avatar_url: string;
    cover_url: string;
    country_code: string;
    play_time: number;
    country_name: string;
    num_medals: number;
    support_level: number;
    statistics: UserStatistics;
    rank_history: number[];
    grade_counts: GradeCounts;
    pp: number;
    global_rank: number;
    country_rank: number;
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
