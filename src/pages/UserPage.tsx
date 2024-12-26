import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";
import ScoresInfo from "../components/ScoresInfo/ScoresInfo.tsx";
import SearchContainer from '../components/SearchContainer';
import {
    fetchUserData,
    fetchUserScoresData,
    FullUserUpdateParams,
    simulateScore,
    updateProfileWithScores
} from '../api/api';
import { User } from '../types/userTypes';
import { Score } from '../types/scoreTypes';
import { ApiError } from '../api/api';

export const UserPage = () => {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();

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

    const handleAddScore = async () => {
        try {
            const newScore = await simulateScore(
                {
                    beatmapId: 2245774,
                    mods: ['HD', 'DT', 'HR'],
                    accPercent: 100,
                    nmiss: 0,
                    combo: 192
                }
            );

            const response = await updateProfileWithScores({
                profile: userData,
                scores: scoresData,
                newScore: newScore
            } as FullUserUpdateParams);

            setUserData(response.profile);
            setScoresData(response.scores);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'An unexpected error occurred');
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 py-4">
            <h1 className="text-2xl font-bold">osu! Profile Viewer</h1>

            <SearchContainer
                onSearch={handleSearch}
                isLoading={isLoading}
            />

            <button onClick={handleAddScore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Score</button>

            {error && (
                <div className="text-red-500">
                    Error: {error}
                </div>
            )}

            <div className="space-y-8">
                {userData && <ProfileInfo user={userData} />}
                {scoresData && <ScoresInfo scores={scoresData} />}
            </div>
        </div>
    );
};