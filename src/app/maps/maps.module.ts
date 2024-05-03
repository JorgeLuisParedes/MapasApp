import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsScreenComponent } from './screens/maps-screen/maps-screen.component';

@NgModule({
	declarations: [MapsScreenComponent],
	imports: [CommonModule],
	exports: [MapsScreenComponent],
})
export class MapsModule {}
