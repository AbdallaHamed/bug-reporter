import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Bug } from '../models/bug';
import { BugsService } from '../services/bugs/bugs.service';


@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss']
})
export class BugDetailsComponent implements OnInit, OnDestroy {
  bugDetails: Bug;
  navigationSub = new Subscription();

  constructor(private _route: ActivatedRoute, private _bugService: BugsService, private _router: Router) {
    this.navigationSub = _router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(() => {
      this.getBugDetails(_route.snapshot.params.id);

    });
  }

  ngOnInit(): void {
  }

  getBugDetails(id: string): void {
    this._bugService.getBug(id).subscribe((bug: Bug) => {
      this.bugDetails = bug;
    });
  }

  getNextStatus(status: string): string {
    switch (status) {
      case "Open":
        return "In progress"
      case "In progress":
        return "Ready for testing";
      case "Ready for testing":
        return "Done";
      case "Done":
        return "Reopen";
      case "Reopen":
        return "Open";
    }
  }

  updateStatus(id: string, status: string): void {
    if (status === 'Reopen') {
      status = "Open";
    }
    this._bugService.updateBugStatus(id, status);
  }

  ngOnDestroy(): void {
    this.navigationSub.unsubscribe();
  }
}
