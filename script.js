const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



// Unsplash API
const count = 30;
const apiKey = '7ULtoR08Bakj6wD9UkMGegPL9Qlpe90mVq9tkgWFTz4' // set for a specific application by Unsplash API
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; //adding random&count so we can generate a specific num of random imgs
//check if all img were loaded;
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true; 
    }
}


//helper function to set att on DOM el.
function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}


// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //for each object in photosArray
    photosArray.forEach((photo)=> {
        //create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target','_blank'); //opens in a new tab
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        //event listener, check when each is finish loading
        img.addEventListener('load',imageLoaded)

        //Put <img> inside <a>, then put both inside the imageContainer el.
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



// Get photos from Unsplash API
async function getPhotos() {
try {
    const response = await fetch(apiUrl);
    photosArray = await response.json(); 
   displayPhotos()
}catch(error){
    //Catch error here
}
}

//Check to see if scrolling near bottom of page, Load More photos
window.addEventListener('scroll',()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()
       
    }
})


//On load
getPhotos()
