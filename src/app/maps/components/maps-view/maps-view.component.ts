import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
	selector: 'app-maps-view',
	templateUrl: './maps-view.component.html',
	styleUrl: './maps-view.component.css',
})
export class MapsViewComponent implements AfterViewInit {
	@ViewChild('mapDiv') mapDivElement!: ElementRef;

	constructor(private placesSevices: PlacesService) {}
	ngAfterViewInit(): void {
		if (!this.placesSevices) throw Error('No hay placesService.userLocation');
		const map = new Map({
			container: this.mapDivElement.nativeElement,
			style: 'mapbox://styles/mapbox/light-v11',
			center: this.placesSevices.useLocation,
			zoom: 14,
		});

		const popup = new Popup().setHTML(`
			<h6>Aquí estoy</h6>
			<span>Estoy en este lugar del mundo</span>
		`);

		new Marker({ color: 'red' }).setLngLat(this.placesSevices.useLocation).setPopup(popup).addTo(map);
	}
}
