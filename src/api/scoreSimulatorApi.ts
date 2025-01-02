// API call function with all possible parameters
import {API_BASE_URL, ApiError, handleApiResponse, ScoreParams} from "@/api/api.ts";
import {Score} from "@/types/scoreTypes.ts";
import {ScoreResponse} from "@/types/scoreTypes.ts";

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
        const data = await handleApiResponse<ScoreResponse>(response);

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