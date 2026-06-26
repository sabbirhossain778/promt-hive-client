import { serverMutation } from "../core/server";

export const deleteUserAPI = async (id) => {
    return serverMutation(`/api/users/${id}`, null, 'DELETE');
};


export const updateUserRoleAPI = async (id, role) => {
    return serverMutation(`/api/users/${id}/role`, { role }, 'PATCH');
}