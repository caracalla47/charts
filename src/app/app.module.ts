import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule as ngRouterModule } from '@angular/router';

import { CoreModule, BootstrapComponent } from '@c8y/ngx-components';
import { NgChartsModule } from 'ng2-charts';

import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    BrowserAnimationsModule,
    ngRouterModule.forRoot(
      [ {path: '', component: ChartsComponent}],
      { enableTracing: false, useHash: true }
    ), 
    CoreModule.forRoot(),
    NgChartsModule
  ],
  bootstrap: [BootstrapComponent]
})
export class AppModule {}