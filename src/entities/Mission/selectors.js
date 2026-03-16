import { WORKFLOW_STATES } from './constants.js';

export const selectMissionSummary = (missions) => ({
  total: missions.length,
  active: missions.filter((m) => m.workflowState === WORKFLOW_STATES.EXECUTING).length,
  ready: missions.filter((m) => m.workflowState === WORKFLOW_STATES.READY_TO_EXECUTE).length,
  completed: missions.filter((m) => m.workflowState === WORKFLOW_STATES.COMPLETED).length,
});

export const selectLatestTelemetry = (mission) => mission.telemetry.at(-1) ?? null;

export const selectStepState = (mission) => ({
  state: mission.workflowState,
  isExecuting: mission.workflowState === WORKFLOW_STATES.EXECUTING,
  canReviewTelemetry:
    mission.workflowState === WORKFLOW_STATES.TELEMETRY_REVIEW ||
    mission.workflowState === WORKFLOW_STATES.COMPLETED,
});
