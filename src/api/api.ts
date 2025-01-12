export interface ApiErrorResponse {
    detail: {
        message: string;
        error: string;
    };
}

// Types for the score parameters
export interface ScoreParams {
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

// export const API_BASE_URL = 'http://127.0.0.1:8000';
export const API_BASE_URL = 'https://pp-rank-theorizer-backend-production.up.railway.app';

export async function handleApiResponse<T>(response: Response): Promise<T> {
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


