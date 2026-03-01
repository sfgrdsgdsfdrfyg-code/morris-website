document.getElementById('newImageButton').addEventListener('click', function() {
    const imgElement = document.getElementById('morrisImage');
    fetch('https://morrisapi.starnumber12046.workers.dev/morris')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data); // Log the entire response data
            if (data && data.imageUrl) {
                imgElement.src = data.imageUrl; // Update image source only if the URL is found
            } else {
                console.error('Image URL not found in response:', data);
            }
        })
        .catch(error => console.error('Error fetching image:', error));
});