document.getElementById('newImageButton').addEventListener('click', function() {
    fetch('https://morrisapi.starnumber12046.workers.dev/morris') 
        .then(response => response.json())
        .then(data => {
            // Assuming the API provides an imageUrl in the response
            document.getElementById('morrisImage').src = data.imageUrl; // Modify according to actual API response structure
        })
        .catch(error => console.error('Error fetching image:', error));
});