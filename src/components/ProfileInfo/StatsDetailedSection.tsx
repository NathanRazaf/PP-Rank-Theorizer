import {UserStatistics} from "@/types/userTypes.ts";

function StatsDetailedSection(props: {statistics : UserStatistics}) {
    const stats = [
        { key: 'ranked_score', label: 'Ranked Score', value: props.statistics.rankedScore.toLocaleString() },
        { key: 'hit_accuracy', label: 'Hit Accuracy', value: props.statistics.accuracy.toFixed(2) + '%' },
        { key: 'play_count', label: 'Play Count', value: props.statistics.playCount.toLocaleString() },
        { key: 'total_score', label: 'Total Score', value: props.statistics.totalScore.toLocaleString() },
        { key: 'total_hits', label: 'Total Hits', value: props.statistics.totalHits.toLocaleString() },
        { key: 'maximum_combo', label: 'Maximum Combo', value: props.statistics.maximumCombo.toLocaleString() },
        { key: 'replays_watched', label: 'Replays Watched by Others', value: props.statistics.replaysWatched.toLocaleString() }
    ];

    return (
        <div className="grid gap-1 text-xs font-normal">
            {stats.map(stat => (
                <dl key={stat.key} className="grid grid-cols-11 gap-3">
                    <dt className="text-start col-start-1 col-end-8">{stat.label}</dt>
                    <dd className="text-start col-start-9 col-end-11">{stat.value}</dd>
                </dl>
            ))}
        </div>
    );
}

export default StatsDetailedSection