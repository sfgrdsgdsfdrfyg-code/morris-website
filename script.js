document.getElementById('newImageButton').addEventListener('click', function() {
    const imgElement = document.getElementById('morrisImage');
    const apiUrl = 'https://morrisapi.starnumber12046.workers.dev/morris';
    imgElement.src = ''; // Clear the current image

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Log the response data
            imgElement.src = data; // Directly use the response as the image URL
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            imgElement.alt = 'Error: Unable to fetch image'; // Set alt text on error
        });
});