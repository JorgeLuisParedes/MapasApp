import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsScreenComponent } from './screens/maps-screen/maps-screen.component';
import { MapsViewComponent } from './components/maps-view/maps-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

@NgModule({
	declarations: [MapsScreenComponent, MapsViewComponent, LoadingComponent, BtnMyLocationComponent, AngularLogoComponent, SearchBarComponent, SearchResultsComponent],
	imports: [CommonModule],
	exports: [MapsScreenComponent],
})
export class MapsModule {}
