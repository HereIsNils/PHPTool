import { Routes } from '@angular/router';
import { PhpToolComponent } from '../feature/php-tool/php-tool.component';

export const AppRoutes: Routes = [
  {
    path: '**',
    component: PhpToolComponent,
  }
];