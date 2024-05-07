import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
	selector: 'app-maps-screen',
	templateUrl: './maps-screen.component.html',
	styleUrl: './maps-screen.component.css',
})
export class MapsScreenComponent {
	constructor(private placeService: PlacesService) {}

	get isUserLocationReady() {
		return this.placeService.isUserLocationReady;
	}
}
