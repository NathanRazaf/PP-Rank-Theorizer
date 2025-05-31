import { getModAssetPath, getModName } from '@/assets/imageAssetPaths';
import {Tooltip} from "react-tooltip";
import {GameMode} from "@/api/scoreSimulatorApi.ts";

interface ModSelectorProps {
    selectedMods: string[];
    onModsChange: (mods: string[]) => void;
    isClassicMode: boolean;
    mode: GameMode;
}

const BASE_MODS = ['EZ', 'NF', 'HT', 'HR', 'SD', 'PF', 'DT', 'NC', 'HD', 'FL', 'AT', 'CM', 'SV2'];
const OSU_AVAILABLE_MODS = BASE_MODS.concat(['RL', 'AP', 'SO', 'TP']);
const TAIKO_AVAILABLE_MODS = BASE_MODS.concat(['RL']);
const CTB_AVAILABLE_MODS = BASE_MODS.concat(['RL']);
const MANIA_AVAILABLE_MODS = BASE_MODS.concat('FI', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', 'CP', 'MR', 'RD');

const ModSelector = ({ selectedMods, onModsChange, mode }: ModSelectorProps) => {
    const AVAILABLE_MODS = (() => {
        switch (mode) {
            case GameMode.OSU:
                return OSU_AVAILABLE_MODS;
            case GameMode.TAIKO:
                return TAIKO_AVAILABLE_MODS;
            case GameMode.CATCH:
                return CTB_AVAILABLE_MODS;
            case GameMode.MANIA:
                return MANIA_AVAILABLE_MODS;
            default:
                return BASE_MODS; // Fallback to base mods if mode is unknown
        }
    })();

    const handleModToggle = (mod: string) => {
        if (mod === 'CL') return; // CL is handled by the classic mode toggle

        // Handle mutually exclusive mods
        let newMods = [...selectedMods];

        if (selectedMods.includes(mod)) {
            // Remove the mod if it's already selected
            newMods = newMods.filter(m => m !== mod);
        } else {
            // Handle special cases when adding mods
            switch (mod) {
                case 'DT':
                    newMods = newMods.filter(m => m !== 'HT' && m !== 'NC');
                    break;
                case 'HT':
                    newMods = newMods.filter(m => m !== 'DT' && m !== 'NC');
                    break;
                case 'NC':
                    newMods = newMods.filter(m => m !== 'DT' && m !== 'HT');
                    break;
                case 'PF':
                    newMods = newMods.filter(m => m !== 'SD' && m !== 'NF');
                    break;
                case 'SD':
                    newMods = newMods.filter(m => m !== 'PF' && m !== 'NF');
                    break;
                case 'NF':
                    newMods = newMods.filter(m => m !== 'SD' && m !== 'PF');
                    break;
                case 'EZ':
                    newMods = newMods.filter(m => m !== 'HR');
                    break;
                case 'HR':
                    newMods = newMods.filter(m => m !== 'EZ');
                    break;
            }
            newMods.push(mod);
        }

        onModsChange(newMods);
    };

    return (
        <div className="flex flex-row items-center justify-center">
            {AVAILABLE_MODS.map((mod) => (
                <button
                    key={mod}
                    type="button"
                    onClick={() => handleModToggle(mod)}
                    className="flex flex-row items-center justify-center group rounded-lg transition-all"
                    data-tooltip-id={`mod-tooltip-${getModAssetPath(mod)}`}
                    data-tooltip-content={getModName(mod)}
                >
                    <img
                        src={getModAssetPath(mod)}
                        alt={getModName(mod)}
                        className={`w-10 h-8 object-contain transition-opacity ${
                            selectedMods.includes(mod)
                                ? 'opacity-100'
                                : 'opacity-30'
                        }`}
                    />
                    <Tooltip
                        id={`mod-tooltip-${getModAssetPath(mod)}`}
                        opacity={1}
                        className="z-50"
                        style={{
                            backgroundColor: "var(--dropdown-bg)",
                            padding: "5px 20px 5px 20px",
                            fontSize: "12px"
                        }}
                    />
                </button>

            ))}
        </div>
    );
};

export default ModSelector;