import { Component } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Severity } from '../models/bug';
import { BugsService } from '../services/bugs/bugs.service';

@Component({
  selector: 'app-create-bug',
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.scss']
})
export class CreateBugComponent {
  linkValidation = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  bugForm = this._fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    severity: ['', [Validators.required]],
    release: ['', [Validators.required]],
    link: ['', Validators.pattern(this.linkValidation)],
    links: [[], [Validators.required, Validators.minLength(1)]],
  });
  severities: string[] = [Severity.Low, Severity.Minor, Severity.Major, Severity.Critical];

  constructor(private _fb: FormBuilder, private _bugsService: BugsService, private _dialog: MatDialog, private _router: Router) { }

  addLink(): void {
    if (this.bugForm.get('link').valid) {
      this.bugForm.get('links').setValue([...this.bugForm.get('links').value, this.bugForm.get('link').value]);
      this.bugForm.get('link').reset();
    }
  }

  deleteLink(index: number): void {
    this.bugForm.get('links').setValue(this.bugForm.get('links').value.filter((link: string, i: number) => i !== index));
  }

  submit(form: FormGroupDirective): void {
    const bugDetails = this.bugForm.value;
    delete bugDetails.link;
    this._bugsService.addBug(bugDetails).subscribe(({ id }: { id: string }) => {
      const dialogRef = this._dialog.open(SuccessfulCreationDialog, {
        disableClose: true
      });

      dialogRef.afterClosed().subscribe((result: string) => {
        if (result === 'create') {
          form.resetForm();
        } else if (result === 'view') {
          this._router.navigate(['/bug', id])
        }
      });
    });
  }
}

@Component({
  templateUrl: './successful-creation-dialog.html',
})
export class SuccessfulCreationDialog { }
