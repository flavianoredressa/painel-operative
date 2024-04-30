import { Injectable } from '@angular/core';
import { Firestore, collectionChanges, limit, orderBy } from '@angular/fire/firestore';
import { FirebaseAbstract, ofFirestore } from '@burand/angular';
import { map } from 'rxjs';

import { FirestoreCollecionName } from '@configs/firestore-collection-name';
import { WorkflowExecution } from '@models/workflow-execution';

@Injectable({
  providedIn: 'root'
})
export class WorkflowExecutionRepository extends FirebaseAbstract<WorkflowExecution<unknown>> {
  constructor(protected firestore: Firestore) {
    super(firestore, FirestoreCollecionName.WORKFLOW_EXECUTIONS);
  }

  getLatestExecutions<U extends WorkflowExecution<unknown> = WorkflowExecution<unknown>>() {
    const filter = this.query(orderBy('createdAt', 'desc'), limit(10));

    return collectionChanges(filter).pipe(
      map(data => {
        return data.map(({ type, doc }) => {
          return {
            type,
            document: ofFirestore<U>(doc, true)
          };
        });
      })
    );
  }
}
