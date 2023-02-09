export function Dayformat (date) {
    return new Date(`${date}`).toLocaleString('en',{day:'2-digit'})
}
export function Monthformat (date) {
    return new Date(`${date}`).toLocaleString('en',{month:'2-digit'})
}
export function Shortmonthformat (date) {
    return new Date(`${date}`).toLocaleString('en',{month:'short'})
}
export function Longmonthformat (date) {
    return new Date(`${date}`).toLocaleString('en',{month:'long'})
}
export function Yearformat (date) {
    return new Date(`${date}`).toLocaleString('en',{year:'numeric'})
}
export function Timeformat (date) {
   return new Date(date).toLocaleString('en', {
        hour12:true,
        hour: '2-digit',
        minute: 'numeric',
    })
}
export function Timeformat24hours (date) {
    return new Date(date).toLocaleString('en', {
        hour12:false,
        hour: '2-digit',
        minute: 'numeric',
    })
}
export const DDMMYYYYTIME = (date) =>{
    return Dayformat(date)+"-"+Monthformat(date)+"-"+Yearformat(date)+" "+ Timeformat(date)
}