import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBugComponent } from './create-bug/create-bug.component';
import { ViewBugComponent } from './view-bug/view-bug.component';
import { BugDetailsComponent } from './bug-details/bug-details.component';
import { AnalyticsComponent } from './analytics/analytics.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AnalyticsComponent },
  { path: 'create-bug', component: CreateBugComponent },
  {
    path: 'bug', component: ViewBugComponent,
    children: [
      { path: ':id', component: BugDetailsComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
