import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

@Component({
	selector: 'app-search-results',
	templateUrl: './search-results.component.html',
	styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
	public selectedId: string = '';
	constructor(private placesService: PlacesService, private mapService: MapService) {}

	get isLoadingPlaces(): boolean {
		return this.placesService.isLoadingPlaces;
	}

	get places(): Feature[] {
		return this.placesService.places;
	}

	flyTo(place: Feature) {
		this.selectedId = place.id;
		const longitude = place.properties.coordinates.longitude;
		const latitude = place.properties.coordinates.latitude;
		this.mapService.flyTo([longitude, latitude]);
	}

	getDirections(place: Feature) {
		if (!this.placesService.useLocation) throw Error('No hay userLocation');

		const start = this.placesService.useLocation;
		const longitude = place.properties.coordinates.longitude;
		const latitude = place.properties.coordinates.latitude;

		this.mapService.getRouteBetweenPoints(start, [longitude, latitude]);
	}
}
