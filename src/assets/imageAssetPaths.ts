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

enum RankAssetPaths {
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

function getRankAssetPath(rank: string): string {
    return "https://osu.ppy.sh/assets/images/"+RankAssetPaths[rank as keyof typeof RankAssetPaths]
}

function getFlagUrl(countryCode: string) {
    return `https://raw.githubusercontent.com/ppy/osu-resources/refs/heads/master/osu.Game.Resources/Textures/Flags/${countryCode}.png`;
}

export { getModAssetPath, getRankAssetPath, getFlagUrl }