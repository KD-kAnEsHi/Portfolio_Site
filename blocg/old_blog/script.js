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
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch images");
            return response.json();
        })
        .then(data => {
            if (!data.resources || !Array.isArray(data.resources)) {
                throw new Error("Invalid image data");
            }

            // limit to first 20 images max 
            const safeImages = data.resources.slice(0, 20);

            safeImages.forEach(item => {
                const { public_id, format } = item;

                // validate format: only allow common image types
                const allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
                if (!allowedFormats.includes(format)) return;

                if (!/^[\w-]+$/.test(public_id)) return;

                const img = document.createElement("img");
                img.src = `https://res.cloudinary.com/${cloudName}/image/upload/${public_id}.${format}`;
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
