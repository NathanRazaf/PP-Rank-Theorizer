import {User} from "@/types/userTypes.ts";
import { getFlagUrl } from "@/assets/imageAssetPaths.ts";
import { Tooltip } from 'react-tooltip'

function ProfileHeader(props: { user: User }) {
    return (
        <div className="flex flex-col m-0 bg-osu-bg-3 profile-header">
            <Tooltip id="osu-supporter-tooltip" opacity={1} className="z-50" style={{ backgroundColor: "#1d1619", padding: "5px 20px 5px 20px"}} />
            <Tooltip id="country-name-tooltip" opacity={1} className="z-50" style={{ backgroundColor: "#1d1619", padding: "5px 20px 5px 20px"}} />
            <img
                src={props.user.coverUrl}
                alt="Cover"
                className="w-full object-cover object-center relative md:h-64 h-24"
            />
            <div className="flex flex-row items-center px-12 gap-4">
                <img src={props.user.avatarUrl} alt="Avatar" className="user-avatar"/>
                <div className="flex flex-col">
                    <span className="text-2xl px-2 mb-0.5 gap-2 flex flex-row items-center">
                        {props.user.username}
                        <SupporterContainer numHearts={props.user.supportLevel}/>
                    </span>
                    <a href={`https://osu.ppy.sh/rankings/osu/performance?country=${props.user.countryCode}`}
                       className="flex flex-row items-center gap-2 px-2"
                    >
                        <img
                            data-tooltip-id="country-name-tooltip"
                            data-tooltip-content={props.user.countryName}
                            data-tooltip-place="top"
                            src={getFlagUrl(props.user.countryCode)} alt="Flag" className="flag-country z-0"/>
                        <span className="font-normal text-white">{props.user.countryName}</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

function SupporterContainer(props : {numHearts: number}) {
    // Create an array of hearts
     return (
        <a
            data-tooltip-id="osu-supporter-tooltip"
            data-tooltip-content="osu!supporter"
            data-tooltip-place="top"
            className="flex flex-row -space-x-1 supporter-container" href={"https://osu.ppy.sh/home/support"}>
            {[...Array(props.numHearts)].map((_, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="transparent"
                     className="size-4 fill-white m-0 p-0">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                </svg>
            ))}
        </a>
     )
}

export default ProfileHeader