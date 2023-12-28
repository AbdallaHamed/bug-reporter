import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { bugs } from '../services/bugs-data';

@Component({
  selector: 'app-view-bug',
  templateUrl: './view-bug.component.html',
  styleUrls: ['./view-bug.component.scss']
})
export class ViewBugComponent implements OnInit {
  isBugSelected = false;
  statusColors = {
    "Open": 'status-open',
    "In progress": 'status-in-progress',
    "Ready for testing": 'status-ready',
    "Done": 'status-done',
  };
  bugsList = bugs;
  page = 1;
  pageSize = 10;

  constructor(private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.isBugSelected = !!this._route.children.length;
  }

  selectBug(id: string) {
    this.isBugSelected = true;
    this._router.navigate(['/bug', id]);
  }

  loadMore() {
    this.page++;
  }
}
