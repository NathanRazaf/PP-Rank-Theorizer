import { Score } from "./types.ts";
import {getModAssetPath, getGradeAssetPath} from "./assets/imageAssetPaths.ts";
import { getModName } from "./assets/imageAssetPaths.ts";

function ModsArray({ mods }: { mods: string[] }) {
    return (
        <div className="flex gap-1">
            {mods.map((mod, index) => (
                <div
                    key={index}
                    className="relative group"
                >
                    <img
                        src={getModAssetPath(mod)}
                        alt={mod}
                        className="w-8 h-8 hover:scale-110 transition-transform"
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {getModName(mod)}
                    </div>
                </div>
            ))}
        </div>
    );
}

function ScoreInfo({ score }: { score: Score }) {
    return (
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="grid gap-2">
                <div>Accuracy: {score.accuracy.toFixed(2)}%</div>
                <div>Score: {score.score.toLocaleString()}</div>
                <a href={score.beatmapUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                    {score.title} - {score.artist} [{score.version}]
                </a>
                <ModsArray mods={score.mods} />
                <div>PP: {score.pp.toFixed(2)}</div>
                <div>Max Combo: {score.maxCombo.toLocaleString()}</div>
                <div>Grade: <img src={getGradeAssetPath(score.grade)} alt={"Grade"}/></div>
            </div>
        </div>
    );
}

function ScoresInfo({ scores }: { scores: Score[] }) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Scores Info</h2>
            <div className="grid gap-4">
                {scores.map((score, index) => (
                    <ScoreInfo key={index} score={score} />
                ))}
            </div>
        </div>
    );
}

export { ScoresInfo, ScoreInfo }