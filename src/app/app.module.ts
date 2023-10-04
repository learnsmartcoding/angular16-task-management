import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksModule } from './module/tasks/tasks.module';
import { TrashIconComponent } from './shared/trash-icon/trash-icon.component';
import { SharedModule } from './shared/shared.module';
import { HttpInterceptorService } from './service/spinner-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FormsModule,
    SharedModule,
    CommonModule,    
    HttpClientModule,    
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
