import { getFlagUrl } from "./assets/imageAssetPaths.ts";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {User} from "./types.ts";

function ProfileInfo(props: { user: User }) {
    return (
        <div>
        <h2>Profile Info</h2>
        <img src={props.user.avatarUrl} alt="Avatar" />
        <img src={props.user.coverUrl} alt="Cover" />
        <img src={getFlagUrl(props.user.countryCode)} alt="Flag" />
        <p>PP: {props.user.pp}</p>
        <p>Global Rank: {props.user.globalRank}</p>
            <RankHistory rankHistory={props.user.rankHistory} />
        <p>Country Rank: {props.user.countryRank}</p>
        <p>Accuracy: {props.user.accuracy}</p>
        <p>Level: {props.user.level}</p>
        <p>Level Progress: {props.user.levelProgress}</p>
        <p>Username: {props.user.username}</p>
        </div>
    );
}

function RankHistory(props: { rankHistory: number[] }) {
    // Transform ranks into data points with days ago
    const data = props.rankHistory.map((rank, index) => ({
        rank,
        daysAgo: props.rankHistory.length - 1 - index
    })).reverse(); // Reverse to show oldest first
    console.log(data);

    // Custom tooltip content
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const rank = Number(payload[0].payload.rank);
            const daysAgo = payload[0].payload.daysAgo;
            return (
                <div className="bg-white p-2 border rounded shadow-lg">
                    <p className="text-gray-600">#{rank.toLocaleString()}</p>
                    <p className="text-pink-500">
                        {daysAgo === 0
                            ? 'now'
                            : daysAgo === 1
                                ? '1 day ago'
                                : `${daysAgo} days ago`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-32">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 20, bottom: 5, left: 40 }}
                >
                    <XAxis
                        dataKey="daysAgo"
                        reversed
                        hide
                    />
                    <YAxis
                        reversed
                        domain={['auto', 'auto']}
                        hide
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: '#666', strokeWidth: 1 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="rank"
                        stroke="#ff66ab"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export { ProfileInfo }