import { ActivityEnum, DrunkEnum } from '../_enums/preferencesEnum.ts'

type PlayerPreference = {
    drunk: DrunkEnum
    activity: ActivityEnum
}

type PreferenceAverages = {
    avgDrunk: number
    avgActivity: number
    drunkAvgMargin?: number
    activityAvgMargin?: number
}

export type { PlayerPreference, PreferenceAverages }
