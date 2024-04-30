import { DatePipe, NgFor } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';

import { environment } from '@environment';
import { WorkflowExecution } from '@models/workflow-execution';
import { WorkflowTemplate } from '@models/workflow-template';
import { WorkflowTemplateVersion } from '@models/workflow-template-version';
import { WorkflowExecutionRepository } from '@repositories/workflow-execution.repository';
import { WorkflowTemplateVersionRepository } from '@repositories/workflow-template-version.repository';
import { WorkflowTemplateRepository } from '@repositories/workflow-template.repository';

interface WorkflowExecutionInPreview extends WorkflowExecution {
  template: WorkflowTemplate;
  templateVersion: WorkflowTemplateVersion;
}

hljs.registerLanguage('json', json);

@Component({
  selector: 'app-modal-content',
  standalone: true,
  template: `
    @if (execution) {
      <div class="modal-header">
        <h4 class="modal-title">{{ execution.template.name }}</h4>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          (click)="activeModal.dismiss('Cross click')"
        ></button>
      </div>
      <div class="modal-body">
        <pre><code class="hljs rounded" [innerHTML]="payload"></code></pre>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close()">Fechar</button>
      </div>
    }
  `
})
export class NgbdModalComponent {
  activeModal = inject(NgbActiveModal);

  @Input() execution: WorkflowExecutionInPreview;

  get payload() {
    return hljs.highlight(JSON.stringify(this.execution.payload, null, 2), { language: 'json' }).value;
  }
}

@Component({
  standalone: true,
  selector: 'app-workflows',
  templateUrl: './workflows.page.html',
  imports: [NgFor, DatePipe, NgbTooltip, LucideAngularModule]
})
export class WorkflowsPage implements OnInit, OnDestroy {
  loading = false;

  executions: WorkflowExecutionInPreview[] = [];
  versions: WorkflowTemplateVersion[];
  templates: WorkflowTemplate[];

  urlWorkflowApi = environment.urlWorkflowApi;
  disposable: Subscription;

  constructor(
    private modalService: NgbModal,
    private workflowExecutionRepository: WorkflowExecutionRepository,
    private workflowTemplateVersionRepository: WorkflowTemplateVersionRepository,
    private workflowTemplateRepository: WorkflowTemplateRepository
  ) {}

  async ngOnInit() {
    this.loading = true;

    this.versions = await this.workflowTemplateVersionRepository.getAll();
    this.templates = await this.workflowTemplateRepository.getAll();

    this.disposable = this.workflowExecutionRepository
      .getLatestExecutions<WorkflowExecutionInPreview>()
      .subscribe(executions => {
        for (const { type, document } of executions) {
          if (type === 'removed') {
            const index = this.executions.findIndex(({ id }) => id === document.id);
            if (index > -1) {
              this.executions.splice(index, 1);
            }
            continue;
          }

          const template = this.getTemplate(document.templateId);
          const templateVersion = this.getTemplateVersion(document.templateId, document.version);

          document.template = template;
          document.templateVersion = templateVersion;

          if (type === 'added') {
            this.executions.push(document);
            continue;
          }

          if (type === 'modified') {
            const index = this.executions.findIndex(({ id }) => id === document.id);
            if (index > -1) {
              this.executions[index] = document;
            }
          }
        }

        this.executions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      });

    this.loading = false;
  }

  ngOnDestroy() {
    this.disposable?.unsubscribe();
  }

  getTemplate(templateId: string) {
    return this.templates.find(template => template.id === templateId);
  }

  getTemplateVersion(templateId: string, version: string) {
    return this.versions.find(v => v.templateId === templateId && v.version === version);
  }

  getStepName(templateVersion: WorkflowTemplateVersion, step: string) {
    const versionedStep = templateVersion.steps.find(versionStep => versionStep.step === step);
    return versionedStep.name;
  }

  getStepDescription(templateVersion: WorkflowTemplateVersion, step: string) {
    const versionedStep = templateVersion.steps.find(versionStep => versionStep.step === step);
    return versionedStep.description;
  }

  handleViewLogs(execution: WorkflowExecutionInPreview) {
    const modalRef = this.modalService.open(NgbdModalComponent, {
      scrollable: true,
      size: 'xl'
    });
    modalRef.componentInstance.execution = execution;
  }
}
