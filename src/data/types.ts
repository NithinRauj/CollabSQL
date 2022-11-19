export type QueryResult = {
    msg: string
    err?: boolean
    affectedRows?: number
    rows?: [
        { [key: string]: number | string | boolean }
    ]
}

export type ServerRes = {
    err: boolean
    msg: string
}

export type ServerResSuccess = ServerRes & {
    result: {
        affectedRows: number,
        [key: string]: string | number
    }
}

export type ServerResSuccessWithRows = ServerRes & {
    result: [
        { [key: string]: number | string | boolean }
    ]
}
export type ServerResError = ServerRes & {
    desc: {
        code: string,
        sqlMessage: string
        [key: string]: string | number | boolean
    }
}