import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BugDetailsComponent } from './bug-details/bug-details.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateBugComponent, SuccessfulCreationDialog } from './create-bug/create-bug.component';
import { ViewBugComponent } from './view-bug/view-bug.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateBugComponent,
    HeaderComponent,
    ViewBugComponent,
    BugDetailsComponent,
    SuccessfulCreationDialog,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
