import { customFetchAuth } from '../index.jsx';
import { ENDPOINTS } from './constants.jsx';

export const getSubscriptions = async () => {
    return await customFetchAuth('GET', ENDPOINTS.subscriptions);
};

export const createSubscription = async (data) => {
    return customFetchAuth('POST', ENDPOINTS.subscriptions, data);
};

export const getSubscription = async (id) => {
    const updatedUrl = `${ENDPOINTS.subscriptions}/${id}`;
    return await customFetchAuth('GET', updatedUrl);
};

export const updateSubscription = async (id, data) => {
    const updatedUrl = `${ENDPOINTS.subscriptions}/${id}`;
    return await customFetchAuth('PUT', updatedUrl, data);
};

export const deleteSubscription = async (id) => {
    const updatedUrl = `${ENDPOINTS.subscriptions}/${id}`;
    return await customFetchAuth('DELETE', updatedUrl);
};
