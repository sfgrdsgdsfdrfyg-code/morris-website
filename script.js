document.getElementById('newImageButton').addEventListener('click', function() {
    const imgElement = document.getElementById('morrisImage');
    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = 'Loading new image...';
    document.body.appendChild(loadingMessage);

    fetch('https://morrisapi.starnumber12046.workers.dev/morris')
        .then(response => response.json())
        .then(data => {
            document.body.removeChild(loadingMessage);
            console.log('Fetched data:', data); // Log the entire response data
            if (data && data.imageUrl) {
                imgElement.src = data.imageUrl; // Update image source if URL found
            } else {
                console.error('Image URL not found in response:', data);
                imgElement.alt = 'Error: Image not found'; // Optional: Set alt text for error
            }
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            document.body.removeChild(loadingMessage);
            imgElement.alt = 'Error: Unable to fetch image'; // Set alt text on error
        });
});