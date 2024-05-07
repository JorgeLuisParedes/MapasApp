import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsScreenComponent } from './screens/maps-screen/maps-screen.component';
import { MapsViewComponent } from './components/maps-view/maps-view.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
	declarations: [MapsScreenComponent, MapsViewComponent, LoadingComponent],
	imports: [CommonModule],
	exports: [MapsScreenComponent],
})
export class MapsModule {}
