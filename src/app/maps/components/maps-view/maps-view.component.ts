import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
	selector: 'app-maps-view',
	templateUrl: './maps-view.component.html',
	styleUrl: './maps-view.component.css',
})
export class MapsViewComponent implements OnInit {
	constructor(private placesSevices: PlacesService) {}
	ngOnInit(): void {
		console.log(this.placesSevices.useLocation);
	}
}
