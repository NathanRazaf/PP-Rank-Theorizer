import {GetFullUserResponse, User} from "@/types/userTypes.ts";
import {Score} from "@/types/scoreTypes.ts";
import {API_BASE_URL, ApiError, handleApiResponse} from "@/api/api.ts";

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
