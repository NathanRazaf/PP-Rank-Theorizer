import React, { useState } from 'react';
import ModSelector from "@/components/ScoreSimulForm/ModSelector.tsx";
import SearchBeatmapModal from "@/components/BeatmapSearchResults/SearchBeatmapModal.tsx";

interface ScoreSimModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (score: {
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
    }) => void;
}

const ScoreSimForm = ({ onSubmit, onClose }: { onSubmit: (score:
                                                          {
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
                                                          }) => void, onClose: () => void }) => {
    // Form mode state
    const [isScoreIdMode, setIsScoreIdMode] = useState(false);
    const [isClassicMode, setIsClassicMode] = useState(false);

    // Form fields state
    const [scoreId, setScoreId] = useState('');
    const [beatmapId, setBeatmapId] = useState('');
    const [accuracy, setAccuracy] = useState('');
    const [mods, setMods] = useState<string[]>([]);
    const [n100, setN100] = useState('');
    const [n50, setN50] = useState('');
    const [combo, setCombo] = useState('');
    const [nmiss, setNmiss] = useState('');
    const [sliderTailMiss, setSliderTailMiss] = useState('');
    const [largeTickMiss, setLargeTickMiss] = useState('');

    // Error state
    const [error, setError] = useState('');

    // Form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isScoreIdMode && !beatmapId) {
            setError('Beatmap ID is required');
            return;
        }

        // Add CL mod if classic mode is enabled
        let finalMods = [...mods];
        finalMods = finalMods.filter(mod => mod !== 'CL');
        if (isClassicMode) {
            finalMods.push('CL');
        }

        const params = {
            ...(scoreId && {scoreId: scoreId }),
            beatmapId: parseInt(beatmapId),
            mods: finalMods,
            ...(accuracy && { accPercent: parseFloat(accuracy) }),
            ...(n100 && { n100: parseInt(n100) }),
            ...(n50 && { n50: parseInt(n50) }),
            ...(combo && { combo: parseInt(combo) }),
            ...(nmiss && { nmiss: parseInt(nmiss) }),
            ...(!isClassicMode && {
                ...(sliderTailMiss && { sliderTailMiss: parseInt(sliderTailMiss) }),
                ...(largeTickMiss && { largeTickMiss: parseInt(largeTickMiss) }),
            })
        };

        onSubmit(params);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl">
            {/* Mode Toggle */}
            <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Simulation Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer transition-all "
                        checked={isScoreIdMode}
                        onChange={(e) => setIsScoreIdMode(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3">{isScoreIdMode ? 'By Score ID' : 'New Score'}</span>
                </label>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {isScoreIdMode ? (
                <div>
                    <label className="block text-sm font-medium mb-2">Score ID</label>
                    <input
                        type="number"
                        value={scoreId}
                        onChange={(e) => setScoreId(e.target.value)}
                        placeholder="Enter score ID"
                        className="w-full p-2 rounded-xl bg-osu-bg-2"
                    />
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Beatmap ID</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={beatmapId}
                                onChange={(e) => setBeatmapId(e.target.value)}
                                placeholder="Enter beatmap ID"
                                className="flex-1 p-2 rounded-xl bg-osu-bg-2"
                            />
                            <SearchBeatmapModal onSelectBeatmap={(id) => setBeatmapId(id.toString())}/>
                        </div>
                    </div>

                    {/* Classic Mode Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Game Mode</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isClassicMode}
                                onChange={(e) => setIsClassicMode(e.target.checked)}
                            />
                            <div
                                className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ml-3">{isClassicMode ? 'Classic' : 'Normal'}</span>
                        </label>
                    </div>

                    {/* Mods Input */}
                    <div>
                        <label className="flex flex-col items-center justify-center text-sm font-medium mb-2">Mods</label>
                        <ModSelector
                            selectedMods={mods}
                            onModsChange={setMods}
                            isClassicMode={isClassicMode}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Accuracy
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={accuracy}
                                onChange={(e) => setAccuracy(e.target.value)}
                                placeholder="Enter accuracy %"
                                className="w-full p-2 rounded-xl bg-osu-bg-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Combo</label>
                            <input
                                type="number"
                                value={combo}
                                onChange={(e) => setCombo(e.target.value)}
                                placeholder="Enter combo"
                                className="w-full p-2 rounded-xl bg-osu-bg-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Goods</label>
                            <input
                                type="number"
                                value={n100}
                                onChange={(e) => setN100(e.target.value)}
                                placeholder="Enter n100"
                                className="w-full p-2 rounded-xl bg-osu-bg-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Mehs</label>
                            <input
                                type="number"
                                value={n50}
                                onChange={(e) => setN50(e.target.value)}
                                placeholder="Enter n50"
                                className="w-full p-2 rounded-xl bg-osu-bg-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Misses</label>
                            <input
                                type="number"
                                value={nmiss}
                                onChange={(e) => setNmiss(e.target.value)}
                                placeholder="Enter miss count"
                                className="w-full p-2 rounded-xl bg-osu-bg-2"
                            />
                        </div>

                        {!isClassicMode && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Slider Tail Misses</label>
                                    <input
                                        type="number"
                                        value={sliderTailMiss}
                                        onChange={(e) => setSliderTailMiss(e.target.value)}
                                        placeholder="Enter slider tail misses"
                                        className="w-full p-2 rounded-xl bg-osu-bg-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Large Tick Misses</label>
                                    <input
                                        type="number"
                                        value={largeTickMiss}
                                        onChange={(e) => setLargeTickMiss(e.target.value)}
                                        placeholder="Enter large tick misses"
                                        className="w-full p-2 rounded-xl bg-osu-bg-2"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="flex justify-end space-x-4 mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Simulate Score
                </button>
            </div>
        </form>
    );
};

const ScoreSimModal = ({ isOpen, onClose, onSubmit }: ScoreSimModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-score-main-bg rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 rounded-2xl">
                    <h2 className="text-xl font-bold">Simulate Score</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>
                <ScoreSimForm onSubmit={onSubmit} onClose={onClose}/>
            </div>
        </div>
    );
};

export default ScoreSimModal;