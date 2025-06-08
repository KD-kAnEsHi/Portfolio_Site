const cloudName = 'dgazqsk1o'; 
const uploadPreset = 'blog_upload'; 

function openUploadWidget(category) {
    cloudinary.openUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            sources: ['local', 'url', 'camera'],
            multiple: false,
            cropping: false,
            tags: [category]
        },
        (error, result) => {
            console.log("Widget callback:", error, result);
            if (!error && result && result.event === "success") {
                const imageUrl = result.info.secure_url;
                const targetDiv = document.getElementById(`${category}-gallery`);
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "Uploaded image";
                img.className = "uploaded-image";
                targetDiv.prepend(img);
            } else if (error) {
                console.error("Upload failed:", error);
            }
        }
    );
}

function loadImagesByTag(tag, containerId) {
    const gallery = document.getElementById(containerId);
    const url = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.resources.forEach(item => {
                const img = document.createElement("img");
                img.src = `https://res.cloudinary.com/${cloudName}/image/upload/${item.public_id}.${item.format}`;
                img.alt = "Gallery image";
                img.className = "uploaded-image";
                gallery.appendChild(img);
            });
        })
        .catch(error => {
            console.warn(`Could not load ${tag} images:`, error);
        });
}

window.onload = () => {
    loadImagesByTag('life', 'life-gallery');
    loadImagesByTag('tech', 'tech-gallery');
};
