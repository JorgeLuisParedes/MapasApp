import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places';

@Injectable({
	providedIn: 'root',
})
export class PlacesService {
	public useLocation!: [number, number];
	public isLoadingPlaces: boolean = false;
	public places: Feature[] = [];

	get isUserLocationReady(): boolean {
		return !!this.useLocation;
	}

	constructor(private http: HttpClient) {
		this.getUserLocation();
	}

	public async getUserLocation(): Promise<[number, number]> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				({ coords }) => {
					this.useLocation = [coords.longitude, coords.latitude];
					resolve(this.useLocation);
				},
				(err) => {
					alert('No se pudo obtener la geolocalización');
					console.log(err);
					reject();
				}
			);
		});
	}

	getPlacesByQuery(query: string = '') {
		// TODO: evaluar cuando el query es nulo

		this.isLoadingPlaces = true;

		this.http
			.get<PlacesResponse>(
				`https://api.mapbox.com/search/geocode/v6/forward?q=${query}&limit=5&proximity=-5.843373156754296%2C43.35199690720651&language=es&access_token=pk.eyJ1Ijoiam9yZ2VwYXJlZGVzIiwiYSI6ImNsdjVpcXZtbjAzNTAya256N21jMTI4anoifQ.EYFEbi5LFINPVyC38vAJzw`
			)
			.subscribe((resp) => {
				console.log(resp.features);
				this.isLoadingPlaces = false;
				this.places = resp.features;
			});
	}
}
