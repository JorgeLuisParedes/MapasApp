import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl';
Mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZ2VwYXJlZGVzIiwiYSI6ImNsdjVpcXZtbjAzNTAya256N21jMTI4anoifQ.EYFEbi5LFINPVyC38vAJzw';

if (!navigator.geolocation) {
	alert('Navegador no soporta la Geolocation');
	throw new Error('Navegador no soporta la Geolocation');
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
