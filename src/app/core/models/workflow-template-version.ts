import { Model } from '@burand/angular';

import { WorkflowTemplateStep } from '../interfaces/workflow-template-step';

export interface WorkflowTemplateVersion extends Model {
  steps: WorkflowTemplateStep[];
  version: string;
  templateId: string;
}
