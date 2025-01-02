import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
    isLoading: boolean;
}

const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
    if (!isLoading) return null;

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
            aria-busy="true"
            aria-label="Loading content"
        >
            <div className="bg-white/10 rounded-lg p-4">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
        </div>
    );
};

export default LoadingOverlay;