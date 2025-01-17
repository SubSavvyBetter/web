import { customFetchAuth } from '../index.jsx';
import { ENDPOINTS } from './constants.jsx';

export const getFamilies = async () => {
    return await customFetchAuth('GET', ENDPOINTS.families);
};

export const createFamily = async (data) => {
    return await customFetchAuth('POST', ENDPOINTS.families, data);
};

export const updateFamily = async (id, data) => {
    const updatedUrl = `${ENDPOINTS.families}/${id}`;
    return await customFetchAuth('PUT', updatedUrl, data);
};

export const getFamily = async (id) => {
    const updatedUrl = `${ENDPOINTS.families}/${id}`;
    return await customFetchAuth('GET', updatedUrl);
};

export const deleteFamily = async (id) => {
    const updatedUrl = `${ENDPOINTS.families}/${id}`;
    return await customFetchAuth('DELETE', updatedUrl);
};
