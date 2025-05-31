import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingOverlay from '@/components/LoadingOverlay';
import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import ScoresInfo from "@/components/ScoresInfo/ScoresInfo.tsx";
import SearchUserModal from '@/components/UserSearchResults/SearchUserModal';
import { fetchUserData, fetchUserScoresData } from "@/api/fetchUserDataApi.ts";
import {
    simulateOsuScore,
    simulateTaikoScore,
    simulateCatchScore,
    simulateManiaScore,
    GameMode
} from "@/api/scoreSimulatorApi.ts";
import { deleteFakeScore, updateProfileWithScores } from "@/api/userUpdaterApi.ts";
import { User } from '../types/userTypes';
import { Score } from '../types/scoreTypes';
import { ApiError } from '../api/api';
import ScoreSimModal from "@/components/ScoreSimulForm/ScoreSimulModal.tsx";
import ScorePreviewDialog from "@/components/ScoreSimulForm/ScorePreviewDialog.tsx";
import ColorNumberDropdown from "@/components/ColorPickerDropdown.tsx";
import { GameMode as ProfileGameMode } from '@/components/ProfileInfo/GameModeTab';
import { Footer } from "@/components/Footer.tsx";
import type {
    OsuScoreParams,
    TaikoScoreParams,
    CatchScoreParams,
    ManiaScoreParams
} from '@/api/scoreSimulatorApi';

export const UserPage = () => {
    const { username, mode } = useParams<{ username: string; mode?: string }>();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewScore, setPreviewScore] = useState<Score | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // Use the mode from URL, or default to "osu"
    const currentMode = (mode || "osu") as ProfileGameMode;

    const [userData, setUserData] = useState<User | null>(null);
    const [scoresData, setScoresData] = useState<Score[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Convert ProfileGameMode to API GameMode
    const getApiGameMode = (profileMode: ProfileGameMode): GameMode => {
        switch (profileMode) {
            case 'osu': return GameMode.OSU;
            case 'taiko': return GameMode.TAIKO;
            case 'catch': return GameMode.CATCH;
            case 'mania': return GameMode.MANIA;
            default: return GameMode.OSU;
        }
    };

    const modeInt = (profileMode: ProfileGameMode): number => {
        switch (profileMode) {
            case 'osu': return 0;
            case 'taiko': return 1;
            case 'catch': return 2;
            case 'mania': return 3;
            default: return 0; // Default to osu! if mode is invalid
        }
    }

    const fetchData = async (username: string, gameMode: ProfileGameMode) => {
        setIsLoading(true);
        setError(null);

        try {
            const [user, scores] = await Promise.all([
                fetchUserData(username, gameMode),
                fetchUserScoresData(username, gameMode)
            ]);

            setUserData(user);
            setScoresData(scores);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (username) {
            fetchData(username, currentMode).then(() => console.log(`Data fetched for ${currentMode} mode`));
        }
    }, [username, currentMode]);

    const handleSearch = (newUsername: string) => {
        navigate(`/users/${newUsername}/${currentMode}`);
    };

    const handleModeChange = (newMode: ProfileGameMode) => {
        // Mode change is handled by the GameModeTab component through navigation
        console.log(`Mode changed to ${newMode}`);
    };

    // Updated handleScoreSubmit with mode-specific simulation
    const handleScoreSubmit = async (params: OsuScoreParams | TaikoScoreParams | CatchScoreParams | ManiaScoreParams) => {
        try {
            setIsLoading(true);
            setError(null);

            let newScore: Score;
            const apiMode = getApiGameMode(currentMode);

            // Call the appropriate simulation function based on the current mode
            switch (apiMode) {
                case GameMode.OSU:
                    newScore = await simulateOsuScore(params as OsuScoreParams);
                    break;
                case GameMode.TAIKO:
                    newScore = await simulateTaikoScore(params as TaikoScoreParams);
                    break;
                case GameMode.CATCH:
                    newScore = await simulateCatchScore(params as CatchScoreParams);
                    break;
                case GameMode.MANIA:
                    newScore = await simulateManiaScore(params as ManiaScoreParams);
                    break;
                default:
                    throw new Error('Invalid game mode');
            }

            setPreviewScore(newScore);
            console.log(newScore);
            setIsModalOpen(false);
            setIsPreviewOpen(true);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            <ColorNumberDropdown />
            <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-4xl flex items-center justify-between px-1">
                    <h1 className="text-2xl font-bold">osu! Profile Viewer</h1>
                    <SearchUserModal onSelectUser={handleSearch} />
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="floating-button"
                >
                    Add Score
                </button>

                <ScoreSimModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleScoreSubmit}
                    mode={getApiGameMode(currentMode)}
                />

                {previewScore && userData && scoresData && (
                    <ScorePreviewDialog
                        isOpen={isPreviewOpen}
                        onClose={() => setIsPreviewOpen(false)}
                        score={previewScore}
                        onConfirm={async () => {
                            try {
                                setIsLoading(true);
                                const response = await updateProfileWithScores({
                                    profile: userData,
                                    scores: scoresData,
                                    newScore: previewScore,
                                    mode: modeInt(currentMode)
                                });
                                setUserData(response.profile);
                                setScoresData(response.scores);
                            } catch (err) {
                                console.error('Error updating profile with scores:', err);
                            } finally {
                                setIsLoading(false);
                                setIsPreviewOpen(false);
                            }
                        }}
                        isLoading={isLoading}
                    />
                )}

                {error && (
                    <div className="text-red-500">
                        Error: {error}
                    </div>
                )}

                <div className="space-y-8">
                    {userData && (
                        <ProfileInfo
                            user={userData}
                            activeMode={currentMode}
                            onModeChange={handleModeChange}
                        />
                    )}
                    {scoresData && (
                        <ScoresInfo
                            scores={scoresData}
                            onDeleteFakeScore={async (scoreId: number) => {
                                try {
                                    setIsLoading(true);
                                    setError(null);
                                    const response = await deleteFakeScore({
                                        profile: userData!,
                                        scores: scoresData,
                                        scoreId,
                                        mode: modeInt(currentMode)
                                    });
                                    setUserData(response.profile);
                                    setScoresData(response.scores);
                                } catch (err) {
                                    console.log(err)
                                    setError(err instanceof ApiError ? err.message : 'An unexpected error occurred');
                                } finally {
                                    setIsLoading(false);
                                }
                            }}
                        />
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
};