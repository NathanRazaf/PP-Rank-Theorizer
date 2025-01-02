import {GetUserApiResponse, User} from "@/types/userTypes.ts";
import {GetUserScoresApiResponse, Score} from "@/types/scoreTypes.ts";
import {API_BASE_URL, ApiError, handleApiResponse} from "@/api/api.ts";

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
