'use server'

import { serverMutation } from "../core/server"

export const submitReport = async (data) => {
    return serverMutation('/api/reports', data)
}

export const adminReportAction = async (reportId, data) => {
    return serverMutation(`/api/admin/report/${reportId}`, data, 'PATCH');
};
