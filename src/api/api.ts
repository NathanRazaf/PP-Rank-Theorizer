import {User, GetUserApiResponse, GetFullUserResponse} from '../types/userTypes';
import { Score, GetUserScoresApiResponse } from '../types/scoreTypes';


export interface ApiErrorResponse {
    detail: {
        message: string;
        error: string;
    };
}

// Types for the score parameters
interface ScoreParams {
    scoreId?: string;
    beatmapId?: number;
    mods: string[];
    accPercent?: number;
    n50?: number;
    n100?: number;
    combo?: number;
    nmiss?: number;
    sliderTailMiss?: number;
    largeTickMiss?: number;
}

interface GetReturnedScoreApiResponse {
    is_true_score: boolean;
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
}

export class ApiError extends Error {
    public statusCode?: number;
    public serverMessage?: string;

    constructor(message: string, statusCode?: number, serverMessage?: string) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.serverMessage = serverMessage;
    }
}


const API_BASE_URL = 'https://osu-pp-theorizer-backend-production.up.railway.app';

// API call function with all possible parameters
export const simulateScore = async ({
                                        scoreId,
                                        beatmapId,
                                        mods = [],
                                        accPercent,
                                        n50,
                                        n100,
                                        combo,
                                        nmiss,
                                        sliderTailMiss = 0,
                                        largeTickMiss = 0,
                                    }: ScoreParams): Promise<Score> => {
    try {
        const response = await fetch(`${API_BASE_URL}/pp/simulate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                scoreId,
                beatmapId,
                mods,
                accPercent,
                n50,
                n100,
                combo,
                nmiss,
                sliderTailMiss,
                largeTickMiss,
            }),
        });

        // Use the existing handleApiResponse function for consistent error handling
        const data = await handleApiResponse<GetReturnedScoreApiResponse>(response);

        return {
            isTrueScore: data.is_true_score,
            accuracy: data.accuracy,
            score: data.score,
            id: data.id,
            beatmapUrl: data.beatmap_url,
            title: data.title,
            artist: data.artist,
            version: data.version,
            date: data.date,
            mods: data.mods,
            pp: data.pp,
            maxCombo: data.max_combo,
            grade: data.grade,
            weight: 0,
            actualPP: 0,
        };

    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Handle unexpected errors (network issues, etc.)
        throw new ApiError(
            'Failed to simulate score: Network or connectivity issue',
            500
        );
    }
};


async function handleApiResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        let errorMessage = `HTTP Error ${response.status}`;
        let serverMessage: string | undefined;

        try {
            const errorData: ApiErrorResponse = await response.json();
            errorMessage = errorData.detail.message;
            serverMessage = errorData.detail.error;
        } catch {
            // If parsing fails, use the status text
            errorMessage = response.statusText || errorMessage;
        }

        throw new ApiError(errorMessage, response.status, serverMessage);
    }

    return response.json();
}

export const fetchUserData = async (username: string): Promise<User> => {
    try {
        const data = await handleApiResponse<GetUserApiResponse>(
            await fetch(`${API_BASE_URL}/user/${username}`)
        );

        return {
            username: data.username,
            avatarUrl: data.avatar_url,
            coverUrl: data.cover_url,
            countryCode: data.country_code,
            countryName: data.country_name,
            supportLevel: data.support_level,
            playTime: data.play_time,
            rankHistory: data.rank_history,
            gradeCounts: data.grade_counts,
            pp: data.pp,
            globalRank: data.global_rank,
            numMedals: data.num_medals,
            countryRank: data.country_rank,
            statistics: {
                accuracy: data.statistics.accuracy,
                rankedScore: data.statistics.ranked_score,
                totalScore: data.statistics.total_score,
                replaysWatched: data.statistics.replays_watched,
                totalHits: data.statistics.total_hits,
                maximumCombo: data.statistics.maximum_combo,
                playCount: data.statistics.play_count
            },
            level: data.level,
            levelProgress: data.level_progress
        };
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Handle unexpected errors (network issues, etc.)
        throw new ApiError(
            'Failed to fetch user data: Network or connectivity issue',
            500
        );
    }
};

export const fetchUserScoresData = async (username: string): Promise<Score[]> => {
    try {
        const data = await handleApiResponse<GetUserScoresApiResponse>(
            await fetch(`${API_BASE_URL}/user/${username}/scores`)
        );

        return data.map(score => ({
            isTrueScore: score.is_true_score,
            accuracy: score.accuracy,
            score: score.score,
            beatmapUrl: score.beatmap_url,
            title: score.title,
            artist: score.artist,
            id: score.id,
            date: score.date,
            version: score.version,
            mods: score.mods,
            pp: score.pp,
            maxCombo: score.max_combo,
            grade: score.grade,
            weight: score.weight,
            actualPP: score.actual_pp
        }));
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Handle unexpected errors (network issues, etc.)
        throw new ApiError(
            'Failed to fetch user scores: Network or connectivity issue',
            500
        );
    }
};

export interface FullUserUpdateParams {
    profile: User
    scores: Score[]
    newScore: Score
}

export const updateProfileWithScores = async ({profile, scores, newScore}: FullUserUpdateParams): Promise<{
    profile: User,
    scores: Score[]
}> => {
    try {
        const response = await fetch(`${API_BASE_URL}/score/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profile: {
                    username: profile.username,
                    avatar_url: profile.avatarUrl,
                    cover_url: profile.coverUrl,
                    country_code: profile.countryCode,
                    country_name: profile.countryName,
                    support_level: profile.supportLevel,
                    play_time: profile.playTime,
                    num_medals: profile.numMedals,
                    statistics: {
                        accuracy: profile.statistics.accuracy,
                        ranked_score: profile.statistics.rankedScore,
                        total_score: profile.statistics.totalScore,
                        replays_watched: profile.statistics.replaysWatched,
                        total_hits: profile.statistics.totalHits,
                        maximum_combo: profile.statistics.maximumCombo,
                        play_count: profile.statistics.playCount
                    },
                    rank_history: profile.rankHistory,
                    grade_counts: profile.gradeCounts,
                    pp: profile.pp,
                    global_rank: profile.globalRank,
                    country_rank: profile.countryRank,
                    level: profile.level,
                    level_progress: profile.levelProgress
                },
                scores: scores.map(score => {
                    return {
                        is_true_score: score.isTrueScore,
                        accuracy: score.accuracy,
                        score: score.score,
                        beatmap_url: score.beatmapUrl,
                        title: score.title,
                        artist: score.artist,
                        id: score.id,
                        date: score.date,
                        version: score.version,
                        mods: score.mods,
                        pp: score.pp,
                        max_combo: score.maxCombo,
                        grade: score.grade,
                        weight: score.weight,
                        actual_pp: score.actualPP
                    }
                }),
                new_score: {
                    is_true_score: newScore.isTrueScore,
                    accuracy: newScore.accuracy,
                    score: newScore.score,
                    id: newScore.id,
                    beatmap_url: newScore.beatmapUrl,
                    title: newScore.title,
                    artist: newScore.artist,
                    version: newScore.version,
                    date: newScore.date,
                    mods: newScore.mods,
                    pp: newScore.pp,
                    max_combo: newScore.maxCombo,
                    grade: newScore.grade,
                    weight: newScore.weight,
                    actual_pp: newScore.actualPP
                }
            })
        });

        const data = await handleApiResponse<GetFullUserResponse>(response);
        return {
            profile: {
                username: data.profile.username,
                avatarUrl: data.profile.avatar_url,
                coverUrl: data.profile.cover_url,
                countryCode: data.profile.country_code,
                countryName: data.profile.country_name,
                supportLevel: data.profile.support_level,
                playTime: data.profile.play_time,
                numMedals: data.profile.num_medals,
                statistics: {
                    accuracy: data.profile.statistics.accuracy,
                    rankedScore: data.profile.statistics.ranked_score,
                    totalScore: data.profile.statistics.total_score,
                    replaysWatched: data.profile.statistics.replays_watched,
                    totalHits: data.profile.statistics.total_hits,
                    maximumCombo: data.profile.statistics.maximum_combo,
                    playCount: data.profile.statistics.play_count
                },
                rankHistory: data.profile.rank_history,
                gradeCounts: data.profile.grade_counts,
                pp: data.profile.pp,
                globalRank: data.profile.global_rank,
                countryRank: data.profile.country_rank,
                level: data.profile.level,
                levelProgress: data.profile.level_progress
            },
            scores: data.scores.map(score => ({
                isTrueScore: score.is_true_score,
                accuracy: score.accuracy,
                score: score.score,
                beatmapUrl: score.beatmap_url,
                title: score.title,
                artist: score.artist,
                id: score.id,
                date: score.date,
                version: score.version,
                mods: score.mods,
                pp: score.pp,
                maxCombo: score.max_combo,
                grade: score.grade,
                weight: score.weight,
                actualPP: score.actual_pp
            }))
        }
    } catch (error) {
        console.log(error);
        if (error instanceof ApiError) {
            throw error;
        }
        // Handle unexpected errors (network issues, etc.)
        throw new ApiError(
            'Failed to update user data: Network or connectivity issue',
            500
        );
    }
}
