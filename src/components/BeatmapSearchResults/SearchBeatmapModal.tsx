import React, { useState } from 'react';
import { Search } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { CompactBeatmapset, searchBeatmapsets } from "@/api/searchApi.ts";
import CompactBeatmapsetItem from "@/components/BeatmapSearchResults/CompactBeatmapsetItem.tsx";

const SearchBeatmapModal = ({ onSelectBeatmap }: { onSelectBeatmap: (id: number) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [beatmapsets, setBeatmapsets] = useState<CompactBeatmapset[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const results = await searchBeatmapsets(searchQuery);
            setBeatmapsets(results);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsSearching(false);
        }
    };


    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-lg bg-osu-bg-3 hover:bg-osu-bg-2 transition-all"
                aria-label="Search beatmaps"
            >
                <Search className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-[140]" />
            )}

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-xl z-[150]">
                    <DialogHeader>
                        <DialogTitle>Search Beatmaps</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search beatmaps..."
                                className="w-full px-4 py-2 rounded-lg !bg-osu-bg-3 focus:outline-none"
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                                disabled={isSearching}
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </form>

                        <div className="max-h-96 overflow-y-auto space-y-1 scrollbar-hide">
                            {isSearching ? (
                                <div className="text-center py-4 text-gray-500">Searching...</div>
                            ) : beatmapsets.length > 0 ? (
                                beatmapsets.map((beatmapset) => (
                                    <div key={beatmapset.beatmapsetId}>
                                        <CompactBeatmapsetItem
                                            beatmapset={beatmapset}
                                            onSelectBeatmap={(beatmapId) => {
                                                onSelectBeatmap(beatmapId);
                                                setIsOpen(false);
                                                setSearchQuery('');
                                                setBeatmapsets([]);
                                            }}
                                        />
                                    </div>
                                ))
                            ) : searchQuery && !isSearching ? (
                                <div className="text-center py-4 text-gray-500">No beatmaps found</div>
                            ) : null}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SearchBeatmapModal;