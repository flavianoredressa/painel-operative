import { Model } from '@burand/angular';

export interface WorkflowTemplate extends Model {
  activeVersion: string;
  description: string;
  name: string;
}
