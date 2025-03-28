import {$host} from './index.js';

export const getType1 = async () => {
    const {data} = await $host.get('/getServicesType1')
    return data
}
export const getType2 = async () => {
    const {data} = await $host.get('/getServicesType2')
    return data
}
export const getType3 = async () => {
    const {data} = await $host.get('/getServicesType3')
    return data
}