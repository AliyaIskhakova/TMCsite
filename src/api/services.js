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

export const searchRefillServices = async (query) => {
    const {data} = await $host.get('api/CartridgeCalculator/search-services', {
        params: { query }
    });
    return data;
}

export const getRefillServices = async () => {
    const {data} = await $host.get('api/CartridgeCalculator/refill-services');
    return data;
}

export const createRefillOrder = async (orderData) => {
    const {data} = await $host.post('api/CartridgeCalculator/create-order', orderData);
    return data;
}