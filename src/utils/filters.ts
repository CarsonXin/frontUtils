export function emptyTextFilter(text:any):string {
    if (text === null || isNaN(text) || text === undefined) {
        return '-'
    }
    else {
        return  text
    }
}
