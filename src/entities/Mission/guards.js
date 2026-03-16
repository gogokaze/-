import { WORKFLOW_STATES, TERMINAL_STATES } from './constants.js';

export const hasMissionMeta = (mission) => Boolean(mission.name && mission.vehicleType);
export const hasPath = (mission) => Boolean(mission.path && mission.path.waypoints?.length);
export const hasAutonomyConfig = (mission) => Boolean(Object.keys(mission.autonomy ?? {}).length);
export const hasVehicleConfig = (mission) => Boolean(Object.keys(mission.vehicleControl ?? {}).length);

export const isReadyToValidate = (mission) =>
  hasMissionMeta(mission) && hasPath(mission) && hasAutonomyConfig(mission) && hasVehicleConfig(mission);

export const canStartExecution = (mission) =>
  mission.workflowState === WORKFLOW_STATES.READY_TO_EXECUTE && mission.execution.armed;

export const canTransition = (mission, nextState) => {
  if (TERMINAL_STATES.has(mission.workflowState)) return false;
  if (nextState === WORKFLOW_STATES.EXECUTING) return canStartExecution(mission);
  return true;
};
