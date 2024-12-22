import { User, GetUserApiResponse } from '../types/userTypes';
import { Score, GetUserScoresApiResponse } from '../types/scoreTypes';


export interface ApiErrorResponse {
    detail: {
        message: string;
        error: string;
    };
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
            statistics: data.statistics,
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
