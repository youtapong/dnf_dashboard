import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'nodelist', loadChildren: './nodelist/nodelist.module#NodelistPageModule' },
  { path: 'report', loadChildren: './report/report.module#ReportPageModule' },
  { path: 'report-port', loadChildren: './report-port/report-port.module#ReportPortPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'admin-dashboard', loadChildren: './admin-dashboard/admin-dashboard.module#AdminDashboardPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
