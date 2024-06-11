const cacheName = 'versionone';


const urlsToCache = ['/static/js/bundle.js', '/static/js/main/chunk.js', '/static/js/0.chunk.js', '/index.html', '/', '/about','/contact','/service','/product','/deal','/payment','/cart'];


{/* <Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/service" element={<Service />} />
<Route path="/product" element={<Product />} />
<Route path="/deal" element={<Deal />} />
<Route path="/payment" element={<Payment/>} />
<Route path="/cart" element={<Cart  */}
const self = this;

self.addEventListener('install', (event) => {
    console.log('event:', event)
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    )
});
// listening to respnse 
self.addEventListener('fetch',(event)=>{
    if(!navigator.onLine){
        event.respondWith(
            caches.match(event.request).then((result)=>{
                if(result){
                    return result;
                }
            })
        );
    }
})

// Activate th sw
self.addEventListener('activate',(event)=>{
    const cacaheWhiteList = []
    cacaheWhiteList.push(cacheName);
    event.waitUntil(
        caches.keys().then((cacheNames)=>{
            Promise.all(
                cacheNames.map((cacheName)=>{
                    if(!cacaheWhiteList.includes(cacheName)){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})