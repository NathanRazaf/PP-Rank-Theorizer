import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UserPage } from './pages/UserPage';

const App = () => {
    return (
        <BrowserRouter>
            <div className="osu-page mx-auto bg-osu-bg-2">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/users/:username" element={<UserPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;