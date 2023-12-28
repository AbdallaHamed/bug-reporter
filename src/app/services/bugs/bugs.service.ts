import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bug } from 'src/app/models/bug';
import { bugs } from '../bugs-data';

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  addBug(bugDetails: Bug): Observable<{ id: string }> {
    bugDetails.id = String(bugs.length + 1);
    bugDetails.status = "Open";
    bugs.push(bugDetails);
    return of({ id: bugDetails.id });
  }

  getBug(id: string): Observable<Bug> {
    return of(bugs.find((bug: Bug) => bug.id === id));
  }

  updateBugStatus(id: string, status: string): Observable<{}> {
    bugs.find((bug: Bug) => bug.id === id).status = status;
    return of({});
  }
}
