import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { InformationComponent } from './information/information.component';

const routes: Routes = [
  { path: 'all', component:ListComponent },
  { path: ':id/information', component:InformationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
