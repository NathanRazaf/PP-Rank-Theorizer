// App.tsx
import { useState } from 'react';
import { getRankAssetPath, getModAssetPath } from "./assets/imageAssetPaths";
import { ProfileInfo } from "./ProfileInfo";
import { fetchUserData, fetchUserScoresData } from './api';
import { User, Score } from './types';
import { ApiError } from './api';
import { ScoresInfo } from "./ScoresInfo";

const App = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const [scoresData, setScoresData] = useState<Score[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Fetch both user data and scores in parallel
            const [user, scores] = await Promise.all([
                fetchUserData('Yass29'),
                fetchUserScoresData('Yass29')
            ]);

            setUserData(user);
            setScoresData(scores);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center gap-4">
                <div>
                    <a href="https://vite.dev" target="_blank" rel="noopener noreferrer" className="mr-4">
                        <img src={getRankAssetPath("SSH")} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                        <img src={getModAssetPath("TD")} className="logo react" alt="React logo" />
                    </a>
                </div>

                <h1 className="text-2xl font-bold">User Profile Viewer</h1>

                <button
                    onClick={handleFetchData}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Fetch User Data'}
                </button>

                {error && (
                    <div className="text-red-500">
                        Error: {error}
                    </div>
                )}

                <div className="w-full max-w-4xl space-y-8">
                    {userData && <ProfileInfo user={userData} />}
                    {scoresData && <ScoresInfo scores={scoresData} />}
                </div>
            </div>
        </div>
    );
};

export default App;