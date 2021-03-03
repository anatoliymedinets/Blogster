import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header.component';
import { AuthService } from '@/shared/services/auth.service';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
