const icons = {
	custom: {
		name: "cuztom",
		icon: "http://maps.google.com/mapfiles/kml/pal4/icon49.png"
	}
};

const cities = [
	{ title: "Brussels", latitude: 50.8371, longitude: 4.3676, type: "custom" },
	{ title: "Copenhagen", latitude: 55.6763, longitude: 12.5681, type: "custom" },
	{ title: "Kyiv", latitude: 50.4547, longitude: 30.5238, type: "custom" },
	{ title: "London", latitude: 51.5074, longitude: 0.1278, type: "custom" },
	{ title: "Warsaw", latitude: 52.2297, longitude: 21.0122, type: "custom" },
	{ title: "Berlin", latitude: 52.5200, longitude: 13.4050, type: "custom" },
	{ title: "Lejpzig", latitude: 51.3397, longitude: 12.3731, type: "custom" },
];

let map, mapProp, marker, pins;

function loadScript() {
	let script = document.createElement("script");
	script.src = "https://maps.googleapis.com/maps/api/js?key=" + API_TOKEN + "&callback=myMap";
	script.async = true;
	script.defer = true;
	document.body.appendChild(script);
}

function myMap() {
	mapProp = {
		center: new google.maps.LatLng(52.229675, 21.012230),
		zoom: 5.25,
		mapTypeId: google.maps.MapTypeId.HYBRID,
		styles: [{}]
	};

	map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
	createMarkers();

}

function createMarkers() {
	for (const element of cities) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(element.latitude, element.longitude),
			map: map,
			icon: icons[element.type].icon,
			content: element.title,
			animation: google.maps.Animation.DROP,
			title: "Click for buy tickets to/from " + element.title,
			styles: [{}]
		});
		marker.addListener("mouseover", toggleAnimation);
	}
}

function toggleAnimation() {
	pins.forEach(image => {
		if (image.textContent === this.content) {
			if (this.getAnimation() !== null) {
				this.setAnimation(null);
				image.style.animationPlayState = "running";
			} else {
				this.setAnimation(google.maps.Animation.BOUNCE);
				image.style.animationPlayState = "paused";
			}
		}
	});
}

globalThis.addEventListener('load', () => {
	setTimeout(() => {
		let i = 0;
		pins = document.querySelectorAll('img[src*="icon49"]');
		pins.forEach(image => {
			i++;
			image.textContent = cities[i - 1].title;
			if (image.classList.contains('custom-icon') === false) {
				image.classList.toggle('custom-icon');
			}
		});
	}, 1000);
});


console.log(API_TOKEN);
globalThis.onload = loadScript;

myMap();


