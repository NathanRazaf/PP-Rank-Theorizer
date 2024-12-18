import { User, Score, GetUserApiResponse, GetUserScoresApiResponse } from './types';

const API_BASE_URL = 'http://127.0.0.1:8000';

export class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export const fetchUserData = async (username: string): Promise<User> => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${username}`);
        if (!response.ok) {
            throw new ApiError(`Failed to fetch user data: ${response.statusText}`);
        }
        const data: GetUserApiResponse = await response.json();

        return {
            username: data.username,
            avatarUrl: data.avatar_url,
            coverUrl: data.cover_url,
            countryCode: data.country_code,
            pp: data.pp,
            globalRank: data.global_rank,
            countryRank: data.country_rank,
            accuracy: data.accuracy,
            level: data.level,
            levelProgress: data.level_progress
        };
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Failed to fetch user data');
    }
};

export const fetchUserScoresData = async (username: string): Promise<Score[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${username}/scores`);
        if (!response.ok) {
            throw new ApiError(`Failed to fetch user scores data: ${response.statusText}`);
        }
        const data: GetUserScoresApiResponse = await response.json();

        return data.map(score => ({
            accuracy: score.accuracy,
            score: score.score,
            beatmapId: score.beatmap_id,
            mods: score.mods,
            pp: score.pp,
            maxCombo: score.max_combo,
            grade: score.grade
        }));
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Failed to fetch user scores data');
    }
};