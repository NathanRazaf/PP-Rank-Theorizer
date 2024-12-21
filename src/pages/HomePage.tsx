import { useNavigate } from 'react-router-dom';
import SearchContainer from '../components/SearchContainer';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleSearch = (username: string) => {
        navigate(`/users/${username}`);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <h1 className="text-2xl font-bold">osu! Profile Viewer</h1>
            <SearchContainer onSearch={handleSearch} isLoading={false} />
        </div>
    );
};