import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions';

@Injectable({
	providedIn: 'root',
})
export class MapService {
	private map?: Map;
	private markers: Marker[] = [];

	get isMapReady() {
		return !!this.map;
	}

	constructor(private directionsApi: DirectionsApiClient) {}

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

	getRouteBetweenPoints(start: [number, number], end: [number, number]) {
		this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`).subscribe((resp) => this.drawPolyline(resp.routes[0]));
	}

	private drawPolyline(route: Route) {
		console.log({ kms: route.distance / 1000, duration: route.duration / 60 });

		if (!this.map) throw Error('Mapa no inicializado');
		const coords = route.geometry.coordinates;
		const bounds = new LngLatBounds();

		coords.forEach(([lng, lat]) => {
			bounds.extend({ lng, lat });
		});
		this.map?.fitBounds(bounds, {
			padding: 200,
		});

		const sourceData: AnySourceData = {
			type: 'geojson',
			data: {
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates: coords,
				},
			},
		};

		// TODO: limpiar ruta previa

		if (this.map.getLayer('RoutesString')) {
			this.map.removeLayer('RoutesString');
			this.map.removeSource('RoutesString');
		}

		this.map.addSource('RoutesString', sourceData);

		this.map.addLayer({
			id: 'RoutesString',
			type: 'line',
			source: 'RoutesString',
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-color': 'black',
				'line-width': 3,
			},
		});
	}
}
