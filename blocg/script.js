

const cloudName = ''; // replace with your own cloud name
const uploadPreset = ''; // replace with your own upload preset


function openUploadWidget(category) {
    cloudinary.openUploadWidget(
        {
            clouddName: cloudName,
            uploadPreset: uploadPreset,
            folder: category,
            source: ['local', 'url', 'camera'],
            multiple: true,
            cropping: false
        }, 
        (error, result) => {
            if (!error && result && result.event == "success") {
                const imageUrl = result.info.secure_url;
                const targetDiv = document.getElementById(`${category}-gallery`);
                const img = document.createElement("img");
                img.src = imageUrl;
                targetDiv.prepend(img);
            }
        }
    )
}


function loadImagesByTag(tag, containerId) {
    const gallery = document.getElementById(containerId);
    const baseurl = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;

    fetch(baseurl)
    .then(res => res.json())
    .then(data => {
        data.resouces.forEach(item => {
            const img = document.createElement('img');
            img.src = `https://res.cloudinary.com/${cloudName}/image/upload/${item.public_id}.${item.format}`;
            gallery.appendChild(img);
        });
    })
    .catch(err => {
        console.warn(`Could not load ${tag} images.`, err);
    });
}

window.onload = () => {
    loadImagesByTag('life', 'life-gallery');
    loadImagesByTag('tech', 'tech-gallery');
}



// Remove the comments from the code below to add
// additional functionality.
// Note that these are only a few examples, to see
// the full list of possible parameters that you
// can add see:
//   https://cloudinary.com/documentation/upload_widget_reference

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    sources: ['local', 'url'], // restrict the upload sources to URL and local files
    multiple: true,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log('Done! Here is the image info: ', result.info);
      document
        .getElementById('uploadedimage')
        .setAttribute('src', result.info.secure_url);
    }
  }
);

document.getElementById('upload_widget').addEventListener(
  'click',
  function () {
    myWidget.open();
  },
  false
);
