document.getElementById('newImageButton').addEventListener('click', function() {
    fetch('https://morrisapi.starnumber12046.workers.dev/morris')
        .then(response => response.json())
        .then(data => {
            document.getElementById('morrisImage').src = data.imageUrl; // Adjust based on actual API response
        })
        .catch(error => console.error('Error fetching image:', error));
});