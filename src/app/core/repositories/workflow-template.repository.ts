import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAbstract } from '@burand/angular';

import { FirestoreCollecionName } from '@configs/firestore-collection-name';
import { WorkflowTemplate } from '@models/workflow-template';

@Injectable({
  providedIn: 'root'
})
export class WorkflowTemplateRepository extends FirebaseAbstract<WorkflowTemplate> {
  constructor(protected firestore: Firestore) {
    super(firestore, FirestoreCollecionName.WORKFLOW_TEMPLATES);
  }
}
