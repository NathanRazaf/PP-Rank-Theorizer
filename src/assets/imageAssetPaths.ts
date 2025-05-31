enum ModAssetPaths {
    EZ = "mod_easy@2x.png",
    CL = "mod_classic@2x.png",
    HR = "mod_hard-rock@2x.png",
    HD = "mod_hidden@2x.png",
    DT = "mod_double-time@2x.png",
    HT = "mod_half@2x.png",
    NF = "mod_no-fail@2x.png",
    PF = "mod_perfect@2x.png",
    NC = "mod_nightcore@2x.png",
    SD = "mod_sudden-death@2x.png",
    FL = "mod_flashlight@2x.png",
    SO = "mod_spun-out@2x.png",
    TD = "mod_touchdevice@2x.png",
    FI = "mod_fader@2x.png",
    AP = "mod_autopilot@2x.png",
    "1K" = "mod_1K@2x.png",
    "2K" = "mod_2K@2x.png",
    "3K" = "mod_3K@2x.png",
    "4K" = "mod_4K@2x.png",
    "5K" = "mod_5K@2x.png",
    "6K" = "mod_6K@2x.png",
    "7K" = "mod_7K@2x.png",
    "8K" = "mod_8K@2x.png",
    "9K" = "mod_9K@2x.png",
    CP = "mod_coop@2x.png",
    MR = "mod_mirror@2x.png",
    RD = "mod_random@2x.png",
    AT = "mod_auto@2x.png",
    CM = "mod_cinema@2x.png",
    SV2 = "mod_v2@2x.png",
    TP = "mod_target-practice@2x.png"
}

enum ModNames {
    EZ = "Easy",
    CL = "Classic",
    HR = "Hard Rock",
    HD = "Hidden",
    DT = "Double Time",
    HT = "Half Time",
    NF = "No Fail",
    PF = "Perfect",
    NC = "Nightcore",
    SD = "Sudden Death",
    FL = "Flashlight",
    SO = "Spun Out",
    TD = "Touch Device",
    FI = "Fade In",
    AP = "Autopilot",
    "1K" = "One Key",
    "2K" = "Two Keys",
    "3K" = "Three Keys",
    "4K" = "Four Keys",
    "5K" = "Five Keys",
    "6K" = "Six Keys",
    "7K" = "Seven Keys",
    "8K" = "Eight Keys",
    "9K" = "Nine Keys",
    CP = "Cooperative",
    MR = "Mirror",
    RD = "Random",
    AT = "Auto",
    CM = "Cinema",
    SV2 = "V2",
    TP = "Target Practice"
}

enum GradeAssetPaths {
    SSH = 'GradeSmall-SS-Silver.svg',
    SS = 'GradeSmall-SS.svg',
    SH = 'GradeSmall-S-Silver.svg',
    S = 'GradeSmall-S.svg',
    A = 'GradeSmall-A.svg',
    B = 'GradeSmall-B.svg',
    C = 'GradeSmall-C.svg',
    D = 'GradeSmall-D.svg'
}

function getModAssetPath(mod: string) : string {
    return "/assets/mods/"+ModAssetPaths[mod as keyof typeof ModAssetPaths];
}

function getModName(mod: string) : string {
    return ModNames[mod as keyof typeof ModNames];
}

function getGradeAssetPath(Grade: string): string {
    return "/assets/grades/"+GradeAssetPaths[Grade as keyof typeof GradeAssetPaths]
}

function getFlagUrl(countryCode: string) {
    const baseFileName = countryCode
        .split('')
        .map((c) => (c.charCodeAt(0) + 127397).toString(16))
        .join('-');

    return `https://osu.ppy.sh/assets/images/flags/${baseFileName}.svg`;
}


function getDiffColour(rating: number) {
    if (rating < 0.1) return '#AAAAAA';  // Gray for extremely low difficulty
    if (rating >= 9) return '#000000';   // Black for extremely high difficulty

    // Define the breakpoints and their corresponding colors
    const colorStops = [
        { rating: 0.1, color: '#4290FB' },  // Light blue
        { rating: 1.25, color: '#4FC0FF' }, // Cyan
        { rating: 2.0, color: '#4FFFD5' },  // Mint
        { rating: 2.5, color: '#7CFF4F' },  // Light green
        { rating: 3.3, color: '#F6F05C' },  // Yellow
        { rating: 4.2, color: '#FF8068' },  // Light red
        { rating: 4.9, color: '#FF4E6F' },  // Pink
        { rating: 5.8, color: '#C645B8' },  // Purple
        { rating: 6.7, color: '#6563DE' },  // Blue
        { rating: 7.7, color: '#18158E' },  // Dark blue
        { rating: 9.0, color: '#000000' }   // Black
    ];

    // Find the two color stops we should interpolate between
    for (let i = 0; i < colorStops.length - 1; i++) {
        if (rating >= colorStops[i].rating && rating < colorStops[i + 1].rating) {
            const lower = colorStops[i];
            const upper = colorStops[i + 1];

            // Calculate how far between the two stops we are (0-1)
            const progress = (rating - lower.rating) / (upper.rating - lower.rating);

            // Convert hex to RGB, interpolate, then convert back to hex
            const lowerRGB = hexToRGB(lower.color);
            const upperRGB = hexToRGB(upper.color);

            const interpolatedRGB = {
                r: Math.round(lowerRGB.r + (upperRGB.r - lowerRGB.r) * progress),
                g: Math.round(lowerRGB.g + (upperRGB.g - lowerRGB.g) * progress),
                b: Math.round(lowerRGB.b + (upperRGB.b - lowerRGB.b) * progress)
            };

            return rgbToHex(interpolatedRGB);
        }
    }

    return '#000000'; // Fallback
}

// Helper function to convert hex color to RGB
function hexToRGB(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

// Helper function to convert RGB to hex
function rgbToHex({ r, g, b }: { r: number, g: number, b: number }) {
    return '#' + [r, g, b]
        .map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0'))
        .join('');
}

export { getModAssetPath, getGradeAssetPath, getFlagUrl, getModName, getDiffColour }