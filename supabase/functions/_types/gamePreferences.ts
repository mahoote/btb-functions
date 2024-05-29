import { ActivityEnum, DrunkEnum } from '../_enums/preferencesEnum.ts'

type PlayerPreference = {
    player_id: string
    drunk: DrunkEnum
    activity: ActivityEnum
}

type PreferenceAverages = {
    avgDrunk: number
    avgActivity: number
    drunkAvgMargin?: number
    activityAvgMargin?: number
}

type GamePreferences = {
    playerPreferences: PlayerPreference[]
    isPlayerCreative: boolean
    gameMinutes: number
}

export type { PlayerPreference, PreferenceAverages, GamePreferences }
