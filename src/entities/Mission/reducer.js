import { MISSION_EVENTS, WORKFLOW_STATES } from './constants.js';
import { canStartExecution, isReadyToValidate } from './guards.js';
import { createMission } from './model.js';

const withUpdatedAt = (mission) => ({
  ...mission,
  timestamps: {
    ...mission.timestamps,
    updatedAt: new Date().toISOString(),
  },
});

export const missionReducer = (mission, event) => {
  switch (event.type) {
    case MISSION_EVENTS.CREATE_MISSION:
      return createMission(event.payload);

    case MISSION_EVENTS.SET_MISSION_META:
      return withUpdatedAt({
        ...mission,
        ...event.payload,
        workflowState: WORKFLOW_STATES.MISSION_PLANNING,
      });

    case MISSION_EVENTS.DEFINE_PATH:
      return withUpdatedAt({
        ...mission,
        path: event.payload.path,
        workflowState: WORKFLOW_STATES.PATH_DEFINED,
      });

    case MISSION_EVENTS.CONFIGURE_AUTONOMY:
      return withUpdatedAt({
        ...mission,
        autonomy: event.payload.autonomy,
        workflowState: WORKFLOW_STATES.AUTONOMY_CONFIGURED,
      });

    case MISSION_EVENTS.CONFIGURE_VEHICLE:
      return withUpdatedAt({
        ...mission,
        vehicleControl: event.payload.vehicleControl,
        workflowState: WORKFLOW_STATES.VEHICLE_CONFIGURED,
      });

    case MISSION_EVENTS.VALIDATE_MISSION:
      return withUpdatedAt({
        ...mission,
        workflowState: isReadyToValidate(mission)
          ? WORKFLOW_STATES.READY_TO_EXECUTE
          : WORKFLOW_STATES.ERROR,
      });

    case MISSION_EVENTS.ARM_EXECUTION:
      return withUpdatedAt({
        ...mission,
        execution: {
          ...mission.execution,
          armed: true,
        },
      });

    case MISSION_EVENTS.START_EXECUTION:
      if (!canStartExecution(mission)) return mission;
      return withUpdatedAt({
        ...mission,
        workflowState: WORKFLOW_STATES.EXECUTING,
        execution: {
          ...mission.execution,
          startedAt: new Date().toISOString(),
        },
      });

    case MISSION_EVENTS.PAUSE_EXECUTION:
      return withUpdatedAt({
        ...mission,
        workflowState: WORKFLOW_STATES.PAUSED,
      });

    case MISSION_EVENTS.RESUME_EXECUTION:
      return withUpdatedAt({
        ...mission,
        workflowState: WORKFLOW_STATES.EXECUTING,
      });

    case MISSION_EVENTS.ABORT_MISSION:
      return withUpdatedAt({
        ...mission,
        workflowState: WORKFLOW_STATES.ABORTED,
        execution: {
          ...mission.execution,
          endedAt: new Date().toISOString(),
        },
      });

    case MISSION_EVENTS.APPEND_TELEMETRY:
      return withUpdatedAt({
        ...mission,
        telemetry: [...mission.telemetry, event.payload],
      });

    case MISSION_EVENTS.COMPLETE_MISSION:
      return withUpdatedAt({
        ...mission,
        workflowState: WORKFLOW_STATES.COMPLETED,
        execution: {
          ...mission.execution,
          endedAt: new Date().toISOString(),
        },
      });

    default:
      return mission;
  }
};
