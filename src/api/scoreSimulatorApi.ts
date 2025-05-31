// API call functions for all game modes
import {API_BASE_URL, ApiError, handleApiResponse} from "@/api/api.ts";
import {Score} from "@/types/scoreTypes.ts";
import {ScoreResponse} from "@/types/scoreTypes.ts";

// Game modes enum
export enum GameMode {
    OSU = "osu",
    TAIKO = "taiko",
    CATCH = "catch",
    MANIA = "mania"
}

// Base interface for all score parameters
export interface BaseScoreParams {
    scoreId?: string;
    beatmapId?: number;
    mods?: string[];
    accPercent?: number;
    combo?: number;
    nmiss?: number;
}

// osu! standard specific parameters
export interface OsuScoreParams extends BaseScoreParams {
    n50?: number;
    n100?: number;
    sliderTailMiss?: number;
    largeTickMiss?: number;
}

// Taiko specific parameters
export interface TaikoScoreParams extends BaseScoreParams {
    n100?: number;
}

// Catch specific parameters
export interface CatchScoreParams extends BaseScoreParams {
    droplets?: number;
    tinyDroplets?: number;
}

// Mania specific parameters
export interface ManiaScoreParams extends BaseScoreParams {
    n300?: number;
    n100?: number;
    n50?: number;
}

// Generic score simulation function
export const simulateScore = async <T extends BaseScoreParams>(
    mode: GameMode,
    params: T
): Promise<Score> => {
    try {
        const response = await fetch(`${API_BASE_URL}/score/simulate/${mode}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...params,
                mods: params.mods || [],
            }),
        });

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
        throw new ApiError(
            `Failed to simulate ${mode} score: Network or connectivity issue`,
            500
        );
    }
};

// Mode-specific wrapper functions with proper typing
export const simulateOsuScore = (params: OsuScoreParams): Promise<Score> => {
    return simulateScore(GameMode.OSU, params);
};

export const simulateTaikoScore = (params: TaikoScoreParams): Promise<Score> => {
    return simulateScore(GameMode.TAIKO, params);
};

export const simulateCatchScore = (params: CatchScoreParams): Promise<Score> => {
    return simulateScore(GameMode.CATCH, params);
};

export const simulateManiaScore = (params: ManiaScoreParams): Promise<Score> => {
    return simulateScore(GameMode.MANIA, params);
};