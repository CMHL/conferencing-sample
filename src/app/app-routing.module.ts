import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CallViewerComponent} from "./call-viewer/call-viewer.component";
import {OnlineUsersComponent} from "./core/components/online-users/online-users.component";

const routes: Routes = [
  {
    path: '',
    component: OnlineUsersComponent,
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
