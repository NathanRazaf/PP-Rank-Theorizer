enum ModAssetPaths {
    EZ = "mod_easy.076c7e8c.png",
    CL = "mod_classic.b979d28c.png",
    HR = "mod_hard-rock.52c35a3a.png",
    HD = "mod_hidden.cfc32448.png",
    DT = "mod_double-time.348a64d3.png",
    HT = "mod_half.3e707fd4.png",
    NF = "mod_no-fail.ca1a6374.png",
    PF = "mod_perfect.460b6e49.png",
    NC = "mod_nightcore.240c22f2.png",
    SD = "mod_sudden-death.d0df65c7.png",
    FL = "mod_flashlight.be8ff220.png",
    SO = "mod_spun-out.989be71e.png",
    TD = "mod_touchdevice.e5fa4271.png"
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
    TD = "Touch Device"
}

enum GradeAssetPaths {
    SSH = 'GradeSmall-SS-Silver.6681366c.svg',
    SS = 'GradeSmall-SS.a21de890.svg',
    SH = 'GradeSmall-S-Silver.811ae28c.svg',
    S = 'GradeSmall-S.3b4498a9.svg',
    A = 'GradeSmall-A.d785e824.svg',
    B = 'GradeSmall-B.e19fc91b.svg',
    C = 'GradeSmall-C.6bb75adc.svg',
    D = 'GradeSmall-D.6b170c4c.svg'
}

function getModAssetPath(mod: string) : string {
    return "https://osu.ppy.sh/assets/images/"+ModAssetPaths[mod as keyof typeof ModAssetPaths];
}

function getModName(mod: string) : string {
    return ModNames[mod as keyof typeof ModNames];
}

function getGradeAssetPath(Grade: string): string {
    return "https://osu.ppy.sh/assets/images/"+GradeAssetPaths[Grade as keyof typeof GradeAssetPaths]
}

function getFlagUrl(countryCode: string) {
    return `https://raw.githubusercontent.com/ppy/osu-resources/refs/heads/master/osu.Game.Resources/Textures/Flags/${countryCode}.png`;
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