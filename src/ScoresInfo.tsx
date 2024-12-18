import { Score } from "./types.ts";

function ScoreInfo({ score }: { score: Score }) {
    return (
        <div>
            <div>Accuracy: {score.accuracy}%</div>
            <div>Score: {score.score}</div>
            <div>Beatmap ID: {score.beatmapId}</div>
            <div>Mods: {score.mods.join(', ')}</div>
            <div>PP: {score.pp}</div>
            <div>Max Combo: {score.maxCombo}</div>
            <div>Grade: {score.grade}</div>
        </div>
    );
}

function ScoresInfo({ scores }: { scores: Score[] }) {
    return (
        <div>
            <h2>Scores Info</h2>
            {scores.map((score, index) => (
                <ScoreInfo key={index} score={score} />
            ))}
        </div>
    );
}

export { ScoresInfo, ScoreInfo }