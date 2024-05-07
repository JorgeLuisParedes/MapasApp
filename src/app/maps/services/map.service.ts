import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
	providedIn: 'root',
})
export class MapService {
	private map?: Map;
	private markers: Marker[] = [];

	get isMapReady() {
		return !!this.map;
	}

	setMap(map: Map) {
		this.map = map;
	}

	flyTo(coords: LngLatLike) {
		if (!this.isMapReady) throw Error('El mapa no esta inicializado');

		this.map?.flyTo({
			zoom: 14,
			center: coords,
		});
	}

	createMarkersFromPlaces(places: Feature[], useLocation: [number, number]) {
		if (!this.map) throw Error('Mapa no inicializado');

		this.markers.forEach((marker) => marker.remove());
		const newMarkers = [];

		for (const place of places) {
			const longitude = place.properties.coordinates.longitude;
			const latitude = place.properties.coordinates.latitude;

			const popup = new Popup().setHTML(`
			<h6>${place.properties.name}</h6>
			<span>${place.properties.full_address}</span>
			`);

			const newMarker = new Marker().setLngLat([longitude, latitude]).setPopup(popup).addTo(this.map);

			newMarkers.push(newMarker);
		}

		this.markers = newMarkers;
		if (places.length === 0) return;

		const bounds = new LngLatBounds();
		newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));
		bounds.extend(useLocation);
		this.map.fitBounds(bounds, {
			padding: 200,
		});
	}
}
