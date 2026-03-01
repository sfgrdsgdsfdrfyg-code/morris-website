document.getElementById('newImageButton').addEventListener('click', function() {
    const imgElement = document.getElementById('morrisImage');
    // Clear the current image source to trigger refresh
    imgElement.src = ''; // Clear the image to refresh it
    fetch('https://morrisapi.starnumber12046.workers.dev/morris')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the response to check its structure
            if (data && data.imageUrl) {
                imgElement.src = data.imageUrl; // Update image source
            } else {
                console.error('Image URL not found in response:', data);
            }
        })
        .catch(error => console.error('Error fetching image:', error));
});