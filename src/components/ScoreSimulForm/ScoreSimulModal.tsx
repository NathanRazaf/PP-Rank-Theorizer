import React, { useState } from 'react';
import ModSelector from "@/components/ScoreSimulForm/ModSelector.tsx";
import SearchBeatmapModal from "@/components/BeatmapSearchResults/SearchBeatmapModal.tsx";
import { GameMode } from '@/api/scoreSimulatorApi';
import type {
    OsuScoreParams,
    TaikoScoreParams,
    CatchScoreParams,
    ManiaScoreParams,
    BaseScoreParams
} from '@/api/scoreSimulatorApi';

// Union type for all possible score parameters
type ScoreParams = OsuScoreParams | TaikoScoreParams | CatchScoreParams | ManiaScoreParams;

interface ScoreSimModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: GameMode;
    onSubmit: (score: ScoreParams) => void;
}

const ScoreSimForm = ({
                          onSubmit,
                          onClose,
                          mode
                      }: {
    onSubmit: (score: ScoreParams) => void;
    onClose: () => void;
    mode: GameMode;
}) => {
    // Form mode state
    const [isScoreIdMode, setIsScoreIdMode] = useState(false);
    const [isClassicMode, setIsClassicMode] = useState(false);

    // Form fields state
    const [scoreId, setScoreId] = useState('');
    const [beatmapId, setBeatmapId] = useState('');
    const [accuracy, setAccuracy] = useState('');
    const [mods, setMods] = useState<string[]>([]);
    const [combo, setCombo] = useState('');
    const [nmiss, setNmiss] = useState('');

    // osu! standard specific fields
    const [n100, setN100] = useState('');
    const [n50, setN50] = useState('');
    const [sliderTailMiss, setSliderTailMiss] = useState('');
    const [largeTickMiss, setLargeTickMiss] = useState('');

    // Taiko specific fields (reuses n100)

    // Catch specific fields
    const [droplets, setDroplets] = useState('');
    const [tinyDroplets, setTinyDroplets] = useState('');

    // Mania specific fields
    const [n300, setN300] = useState('');
    // n100 and n50 are reused from osu! fields

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

        // Base parameters common to all modes
        const baseParams: BaseScoreParams = {
            ...(scoreId && { scoreId: scoreId }),
            beatmapId: parseInt(beatmapId),
            mods: finalMods,
            ...(accuracy && { accPercent: parseFloat(accuracy) }),
            ...(combo && { combo: parseInt(combo) }),
            ...(nmiss && { nmiss: parseInt(nmiss) }),
        };

        // Mode-specific parameters
        let params: ScoreParams;

        switch (mode) {
            case GameMode.OSU:
                params = {
                    ...baseParams,
                    ...(n100 && { n100: parseInt(n100) }),
                    ...(n50 && { n50: parseInt(n50) }),
                    ...(!isClassicMode && {
                        ...(sliderTailMiss && { sliderTailMiss: parseInt(sliderTailMiss) }),
                        ...(largeTickMiss && { largeTickMiss: parseInt(largeTickMiss) }),
                    })
                } as OsuScoreParams;
                break;

            case GameMode.TAIKO:
                params = {
                    ...baseParams,
                    ...(n100 && { n100: parseInt(n100) }),
                } as TaikoScoreParams;
                break;

            case GameMode.CATCH:
                params = {
                    ...baseParams,
                    ...(droplets && { droplets: parseInt(droplets) }),
                    ...(tinyDroplets && { tinyDroplets: parseInt(tinyDroplets) }),
                } as CatchScoreParams;
                break;

            case GameMode.MANIA:
                params = {
                    ...baseParams,
                    ...(n300 && { n300: parseInt(n300) }),
                    ...(n100 && { n100: parseInt(n100) }),
                    ...(n50 && { n50: parseInt(n50) }),
                } as ManiaScoreParams;
                break;

            default:
                setError('Invalid game mode selected');
                return;
        }

        onSubmit(params);
    };

    // Render mode-specific fields
    const renderModeSpecificFields = () => {
        switch (mode) {
            case GameMode.OSU:
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Goods (100s)</label>
                            <input
                                type="number"
                                value={n100}
                                onChange={(e) => setN100(e.target.value)}
                                placeholder="Enter n100"
                                className="w-full p-2 rounded-xl add-score-dialog-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Mehs (50s)</label>
                            <input
                                type="number"
                                value={n50}
                                onChange={(e) => setN50(e.target.value)}
                                placeholder="Enter n50"
                                className="w-full p-2 rounded-xl add-score-dialog-input"
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
                                        className="w-full p-2 rounded-xl add-score-dialog-input"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Large Tick Misses</label>
                                    <input
                                        type="number"
                                        value={largeTickMiss}
                                        onChange={(e) => setLargeTickMiss(e.target.value)}
                                        placeholder="Enter large tick misses"
                                        className="w-full p-2 rounded-xl add-score-dialog-input"
                                    />
                                </div>
                            </>
                        )}
                    </>
                );

            case GameMode.TAIKO:
                return (
                    <div>
                        <label className="block text-sm font-medium mb-2">Number of Goods (100s)</label>
                        <input
                            type="number"
                            value={n100}
                            onChange={(e) => setN100(e.target.value)}
                            placeholder="Enter n100"
                            className="w-full p-2 rounded-xl add-score-dialog-input"
                        />
                    </div>
                );

            case GameMode.CATCH:
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium mb-2">Droplets</label>
                            <input
                                type="number"
                                value={droplets}
                                onChange={(e) => setDroplets(e.target.value)}
                                placeholder="Enter droplets"
                                className="w-full p-2 rounded-xl add-score-dialog-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Tiny Droplets</label>
                            <input
                                type="number"
                                value={tinyDroplets}
                                onChange={(e) => setTinyDroplets(e.target.value)}
                                placeholder="Enter tiny droplets"
                                className="w-full p-2 rounded-xl add-score-dialog-input"
                            />
                        </div>
                    </>
                );

            case GameMode.MANIA:
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Perfects (300s)</label>
                            <input
                                type="number"
                                value={n300}
                                onChange={(e) => setN300(e.target.value)}
                                placeholder="Enter n300"
                                className="w-full p-2 rounded-xl add-score-dialog-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Goods (100s)</label>
                            <input
                                type="number"
                                value={n100}
                                onChange={(e) => setN100(e.target.value)}
                                placeholder="Enter n100"
                                className="w-full p-2 rounded-xl add-score-dialog-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Mehs (50s)</label>
                            <input
                                type="number"
                                value={n50}
                                onChange={(e) => setN50(e.target.value)}
                                placeholder="Enter n50"
                                className="w-full p-2 rounded-xl add-score-dialog-input"
                            />
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl">
            {/* Mode Toggle */}
            <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Simulation Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer transition-all"
                        checked={isScoreIdMode}
                        onChange={(e) => setIsScoreIdMode(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
                        className="w-full p-2 rounded-xl add-score-dialog-input"
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
                                className="flex-1 p-2 rounded-xl add-score-dialog-input"
                            />
                            <SearchBeatmapModal
                                onSelectBeatmap={(id) => setBeatmapId(id.toString())}
                                mode={mode}
                            />
                        </div>
                    </div>


                    <div className="flex items-center justify-between">
                        <span className="font-medium">Game Mode</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isClassicMode}
                                onChange={(e) => setIsClassicMode(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
                            mode={mode}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Accuracy (%)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={accuracy}
                                onChange={(e) => setAccuracy(e.target.value)}
                                placeholder="Enter accuracy %"
                                className="w-full p-2 rounded-xl add-score-dialog-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Combo</label>
                            <input
                                type="number"
                                value={combo}
                                onChange={(e) => setCombo(e.target.value)}
                                placeholder="Enter combo"
                                className="w-full p-2 rounded-xl add-score-dialog-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Misses</label>
                            <input
                                type="number"
                                value={nmiss}
                                onChange={(e) => setNmiss(e.target.value)}
                                placeholder="Enter miss count"
                                className="w-full p-2 rounded-xl add-score-dialog-input"
                            />
                        </div>

                        {/* Mode-specific fields */}
                        {renderModeSpecificFields()}
                    </div>
                </div>
            )}

            <div className="flex justify-end space-x-4 mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-600"
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

const ScoreSimModal = ({ isOpen, onClose, onSubmit, mode }: ScoreSimModalProps) => {
    if (!isOpen) return null;
    const getModeDisplayName = (mode: GameMode): string => {
        switch (mode) {
            case GameMode.OSU: return 'osu!';
            case GameMode.TAIKO: return 'Taiko';
            case GameMode.CATCH: return 'Catch';
            case GameMode.MANIA: return 'Mania';
            default: return 'Unknown';
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="add-score-dialog rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-center mb-4 rounded-2xl">
                    <h2 className="text-xl font-bold">Simulate {getModeDisplayName(mode)} Score</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ×
                    </button>
                </div>
                <ScoreSimForm onSubmit={onSubmit} onClose={onClose} mode={mode} />
            </div>
        </div>
    );
};

export default ScoreSimModal;