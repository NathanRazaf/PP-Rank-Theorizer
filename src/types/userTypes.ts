import {ScoreResponse} from "@/types/scoreTypes.ts";
import {GameMode} from "@/components/ProfileInfo/GameModeTab.tsx";

export interface User {
    id: number;
    preferredMode: GameMode;
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
    rankedScore: number;
    totalScore: number;
    replaysWatched: number;
    totalHits: number;
    maximumCombo: number;
    playCount: number;
}

export interface UserApiStatistics {
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
    id: number;
    username: string;
    preferred_mode: GameMode;
    avatar_url: string;
    cover_url: string;
    country_code: string;
    play_time: number;
    country_name: string;
    num_medals: number;
    support_level: number;
    statistics: UserApiStatistics;
    rank_history: number[];
    grade_counts: GradeCounts;
    pp: number;
    global_rank: number;
    country_rank: number;
    level: number;
    level_progress: number;
}

export interface GetFullUserResponse {
    profile: GetUserApiResponse
    scores: ScoreResponse[]
}