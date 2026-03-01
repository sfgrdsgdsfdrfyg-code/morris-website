document.getElementById('newImageButton').addEventListener('click', function() {
    fetch('https://morrisapi.starnumber12046.workers.dev/morris')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the response to check its structure
            if (data && data.imageUrl) {
                document.getElementById('morrisImage').src = data.imageUrl;
            } else {
                console.error('Image URL not found in response:', data);
            }
        })
        .catch(error => console.error('Error fetching image:', error));
});