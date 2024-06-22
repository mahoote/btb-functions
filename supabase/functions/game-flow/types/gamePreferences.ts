import { AccessoryEnum, ActivityEnum, DrunkEnum, GameAudienceEnum } from './gameEnum.ts'

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
    accessories: AccessoryEnum[]
    audience?: GameAudienceEnum
}

export type { PlayerPreference, PreferenceAverages, GamePreferences }
