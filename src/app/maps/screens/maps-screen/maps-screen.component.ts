import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
	selector: 'app-maps-screen',
	templateUrl: './maps-screen.component.html',
	styleUrl: './maps-screen.component.css',
})
export class MapsScreenComponent implements OnInit {
	constructor(private placeService: PlacesService) {}
	ngOnInit(): void {}
}
