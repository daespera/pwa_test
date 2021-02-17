const cacheName = 'static-asset-v2'
/*const cacheAssets = [
	'/',
	'offline.html',
	'style.css',
	'scripts.js'
]*/
const cacheAssets = [
	'/pwa_test/offline.html'
]

self.addEventListener('install', event => {
	console.log('Service Worker Install');
	event.waitUntil(
		caches
		.open(cacheName)
		.then(cache => {
			console.log("cache files")
			cache.addAll(cacheAssets)
		})
		.then( ()=> self.skipWaiting())
	);
});
 
self.addEventListener('activate', event => {
	console.log('Service Worker Activate');
	event.waitUntil(
		caches
		.keys()
		.then(
			keys => {
				return Promise.all(
					keys.map(
						key =>{
							if (key !== cacheName){
								caches.delete(key)
							}
						}
					)
				)
			}
		)
	);
});
//fetch with cached assets
/*self.addEventListener('fetch', event => {
	console.log('Service Worker Fetch');
	let url = new URL(event.request.url);
	event.respondWith(
		caches
		.match(url)
		.then(
			response =>{
				return response || fetch(event.request)
				.catch(
					() => caches.match('offline.html')
				)
			}
		)
	);
});*/

//cache as you go
/*self.addEventListener('fetch', event => {
	let url = new URL(event.request.url);
	event.respondWith(
		fetch(event.request)
		.then(
			response => {
				const responseClone = response.clone();
				caches
				.open(cacheName)
				.then(
					cache => {
						cache.put(event.request, responseClone)
					}
				)
				return response;
			}
		)
		.catch(
			error => caches.match(event.request).then(response => response)
		)
	)
});*/

//combination of 2 implementation
self.addEventListener('fetch', event => {
	let url = new URL(event.request.url);
	event.respondWith(
		fetch(event.request)
		.then(
			response => {
				const responseClone = response.clone();
				caches
				.open(cacheName)
				.then(
					cache => {
						cache.put(event.request, responseClone)
					}
				)

				console.log(response);
				return response;
			}
		)
		.catch(
			error => caches.match(event.request).then(response => {
				if (response == undefined)
					return caches.match('offline.html');
				return response;})
		)
	)
});
