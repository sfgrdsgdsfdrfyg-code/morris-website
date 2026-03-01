document.getElementById('newImageButton').addEventListener('click', function() {
    const imgElement = document.getElementById('morrisImage');
    const apiUrl = 'https://morrisapi.starnumber12046.workers.dev/morris';
    imgElement.src = ''; // Clear the current image

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data); // Log the response data
            if (data && data.imageUrl) {
                imgElement.src = data.imageUrl; // Update image source if URL found
            } else {
                console.error('Image URL not found in response:', data);
                imgElement.alt = 'Error: Image not found'; // Optional: Set alt text for error
            }
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            imgElement.alt = 'Error: Unable to fetch image'; // Set alt text on error
        });
});