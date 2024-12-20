import { useState } from 'react';

interface SearchContainerProps {
    onSearch: (username: string) => void;
    isLoading: boolean;
}

export const SearchContainer = ({ onSearch, isLoading }: SearchContainerProps) => {
    const [username, setUsername] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            onSearch(username.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                disabled={isLoading}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                disabled={isLoading || !username.trim()}
            >
                {isLoading ? 'Loading...' : 'Search'}
            </button>
        </form>
    );
};

export default SearchContainer;