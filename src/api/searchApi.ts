import {API_BASE_URL, handleApiResponse} from "@/api/api.ts";

export interface CompactUserResponse {
    username: string;
    avatar_url: string;
    osu_id: number;
    country_code: string;
}

export interface CompactUser {
    username: string;
    avatarUrl: string;
    osuId: number;
    countryCode: string;
}

export interface CompactBeatmapResponse {
    beatmap_id: number;
    version: string;
    stars: number;
}

export interface CompactBeatmapsetResponse {
    beatmapset_id: number;
    artist: string;
    title: string;
    creator: string;
    cover: string;
    beatmaps: CompactBeatmapResponse[];
}

export interface CompactBeatmap {
    beatmapId: number;
    version: string;
    stars: number;
}

export interface CompactBeatmapset {
    beatmapsetId: number;
    artist: string;
    title: string;
    creator: string;
    cover: string;
    beatmaps: CompactBeatmap[];
}

export async function searchUsers(query: string): Promise<CompactUser[]> {
    const response = await fetch(`${API_BASE_URL}/search/user?query=${encodeURIComponent(query)}`);
    const r = await handleApiResponse<CompactUserResponse[]>(response);
    return r.map((user) => ({
        username: user.username,
        avatarUrl: user.avatar_url,
        osuId: user.osu_id,
        countryCode: user.country_code
    }));
}

export async function searchBeatmapsets(query: string, mode: number): Promise<CompactBeatmapset[]> {
    const response = await fetch(`${API_BASE_URL}/search/beatmap?query=${encodeURIComponent(query)}&mode=${mode}`);
    const r = await handleApiResponse<CompactBeatmapsetResponse[]>(response);
    return r.map((beatmapset) => ({
        beatmapsetId: beatmapset.beatmapset_id,
        artist: beatmapset.artist,
        title: beatmapset.title,
        cover: beatmapset.cover,
        creator: beatmapset.creator,
        beatmaps: beatmapset.beatmaps.map((beatmap) => ({
            beatmapId: beatmap.beatmap_id,
            version: beatmap.version,
            stars: beatmap.stars
        })).sort((a, b) => a.stars - b.stars)
    }));
}