import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CallViewerComponent} from "./call-viewer/call-viewer.component";
import {OnlineUsersComponent} from "./core/components/online-users/online-users.component";
import {QuadGridComponent} from "./core/components/quad-grid/quad-grid.component";


const routes: Routes = [
  {
    path: '',
    component: OnlineUsersComponent,
  },
  {
    path: 'quad-grid',
    component: QuadGridComponent,
  },
  {
    path: 'call-viewer',
    component: CallViewerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
