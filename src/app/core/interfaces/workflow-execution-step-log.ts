import { WorkflowExecutionStatus } from '@core/types/workflow-execution-status';

export interface WorkflowExecutionStepLog {
  status: WorkflowExecutionStatus;
  createdAt: Date;
}
