import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DocumentNotFoundError, FirebaseAbstract } from '@burand/angular';

import { FirestoreCollecionName } from '@configs/firestore-collection-name';
import { WorkflowTemplateVersion } from '@models/workflow-template-version';

@Injectable({
  providedIn: 'root'
})
export class WorkflowTemplateVersionRepository extends FirebaseAbstract<WorkflowTemplateVersion> {
  constructor(protected firestore: Firestore) {
    super(firestore, FirestoreCollecionName.WORKFLOW_TEMPLATE_VERSIONS);
  }

  async getByVersion(templateId: string, version: string): Promise<WorkflowTemplateVersion> {
    const find = await this.getOneWhereMany([
      ['templateId', '==', templateId],
      ['version', '==', version]
    ]);

    if (!find) {
      throw new DocumentNotFoundError(templateId);
    }

    return find;
  }
}
