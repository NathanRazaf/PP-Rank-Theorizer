import { getModAssetPath, getModName } from '@/assets/imageAssetPaths';
import {Tooltip} from "react-tooltip";

interface ModSelectorProps {
    selectedMods: string[];
    onModsChange: (mods: string[]) => void;
    isClassicMode: boolean;
}

const AVAILABLE_MODS = ['EZ', 'NF', 'HT', 'HR', 'SD', 'PF', 'DT', 'NC', 'HD', 'FL', 'SO', 'TD'];

const ModSelector = ({ selectedMods, onModsChange }: ModSelectorProps) => {
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
                            backgroundColor: "#1d1619",
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