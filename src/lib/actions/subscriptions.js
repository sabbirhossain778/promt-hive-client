import { serverMutation } from "../core/server";

export const createSubscriptionAPI = async (subscriptionData) => {
    return serverMutation(`/api/subscriptions`, subscriptionData, 'POST');
};