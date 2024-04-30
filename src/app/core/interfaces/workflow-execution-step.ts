import { WorkflowExecutionStatus } from '@core/types/workflow-execution-status';
import { WorkflowExecutionStepLog } from './workflow-execution-step-log';

export interface WorkflowExecutionStep {
  completedAt: Date | null;
  trace: string[];
  logs: WorkflowExecutionStepLog[];
  name: string;
  nextStep: string | null;
  parallelSteps: string[];
  startedAt: Date | null;
  status: WorkflowExecutionStatus;
  step: string;
  call: string;
}
