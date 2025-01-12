import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingOverlay from '@/components/LoadingOverlay';
import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import ScoresInfo from "@/components/ScoresInfo/ScoresInfo.tsx";
import SearchUserModal from '@/components/UserSearchResults/SearchUserModal';
import { fetchUserData, fetchUserScoresData } from "@/api/fetchUserDataApi.ts";
import { simulateScore } from "@/api/scoreSimulatorApi.ts";
import {deleteFakeScore, FullUserUpdateParams, updateProfileWithScores} from "@/api/userUpdaterApi.ts";
import { User } from '../types/userTypes';
import { Score } from '../types/scoreTypes';
import { ApiError } from '../api/api';
import ScoreSimModal from "@/components/ScoreSimulForm/ScoreSimulModal.tsx";

export const UserPage = () => {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [userData, setUserData] = useState<User | null>(null);
    const [scoresData, setScoresData] = useState<Score[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (username: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const [user, scores] = await Promise.all([
                fetchUserData(username),
                fetchUserScoresData(username)
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
            fetchData(username).then(() => console.log("Data fetched"));
        }
    }, [username]);

    const handleSearch = (newUsername: string) => {
        navigate(`/users/${newUsername}`);
    };

    const handleScoreSubmit = async (params: {
        scoreId?: string;
        beatmapId: number;
        mods: string[];
        accPercent?: number;
        n50?: number;
        n100?: number;
        combo?: number;
        nmiss?: number;
        sliderTailMiss?: number;
        largeTickMiss?: number
    }) => {
        try {
            setIsLoading(true);
            setError(null);
            const newScore = await simulateScore(params);
            const response = await updateProfileWithScores({
                profile: userData,
                scores: scoresData,
                newScore: newScore
            } as FullUserUpdateParams);

            setUserData(response.profile);
            setScoresData(response.scores);
            setIsModalOpen(false);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-4xl flex items-center justify-between px-1">
                    <h1 className="text-2xl font-bold">osu! Profile Viewer</h1>
                    <SearchUserModal onSelectUser={handleSearch} />
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Score
                </button>

                <ScoreSimModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleScoreSubmit}
                />

                {error && (
                    <div className="text-red-500">
                        Error: {error}
                    </div>
                )}

                <div className="space-y-8">
                    {userData && <ProfileInfo user={userData} />}
                    {scoresData && <ScoresInfo
                        scores={scoresData}
                        onDeleteFakeScore={async (scoreId: number) => {
                            try {
                                setIsLoading(true);
                                setError(null);
                                const response = await deleteFakeScore({
                                    profile: userData!,
                                    scores: scoresData,
                                    scoreId
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
                    />}
                </div>
            </div>
        </>
    );
};