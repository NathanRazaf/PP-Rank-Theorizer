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

function getRankAssetPath(rank: string): string {
    return "https://osu.ppy.sh/assets/images/"+RankAssetPaths[rank as keyof typeof RankAssetPaths]
}

export { RankAssetPaths, getRankAssetPath }