import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

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
                <div className="bg-osu-bg-1 p-2  rounded-2xl ">
                    <p className="text-white"><span className="font-bold">Global Ranking</span> #{rank.toLocaleString()}
                    </p>
                    <p className="text-osu-small-text">
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
        <div className="w-full h-24">
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
                        cursor={{ stroke: '#fed700', strokeWidth: 2 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="rank"
                        stroke="#fed700"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 8, strokeWidth: 4, stroke: '#fed700', fill: 'var(--osu-bg-2)' }}

                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export { RankHistory }