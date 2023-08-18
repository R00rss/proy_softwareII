import { ICON_SORT_TYPE } from "../constants/global"

export interface ListAndCount<T> {
    count: number,
    data: T[]
}

export interface Column {
    name: string
    code: string
    width: number
    icon: typeof ICON_SORT_TYPE[keyof typeof ICON_SORT_TYPE]
}