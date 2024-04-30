import { Model } from '@burand/angular';

import { WorkflowExecutionStep } from '../interfaces/workflow-execution-step';
import { WorkflowExecutionStatus } from '../types/workflow-execution-status';

export interface WorkflowExecution<T = unknown> extends Model {
  completedAt: Date | null;
  payload: T;
  startedAt: Date | null;
  status: WorkflowExecutionStatus;
  steps: WorkflowExecutionStep[];
  version: string;
  templateId: string;
}
