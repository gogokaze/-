import { WORKFLOW_STATES } from './constants.js';

export const createMission = ({
  id,
  name = '',
  vehicleType = 'unknown',
  path = null,
  autonomy = {},
  vehicleControl = {},
  execution = { armed: false, startedAt: null, endedAt: null },
  telemetry = [],
} = {}) => {
  const now = new Date().toISOString();

  return {
    id: id ?? globalThis.crypto?.randomUUID?.() ?? `mission-${Date.now()}`,
    name,
    vehicleType,
    path,
    autonomy,
    vehicleControl,
    execution,
    telemetry,
    workflowState: WORKFLOW_STATES.DRAFT,
    timestamps: {
      createdAt: now,
      updatedAt: now,
    },
  };
};
