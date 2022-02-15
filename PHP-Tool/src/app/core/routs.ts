import { Routes } from '@angular/router';
import { PHPToolModule } from '../feature/php-tool/php-tool.module';

export const AppRoutes: Routes = [
  {
    path: '**',
    component: PHPToolModule,
  }
];