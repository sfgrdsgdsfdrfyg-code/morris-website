document.getElementById('newImageButton').addEventListener('click', function() {
    const imgElement = document.getElementById('morrisImage');
    const apiUrl = 'https://morrisapi.starnumber12046.workers.dev/morris';
    imgElement.src = ''; // Clear current image
    imgElement.alt = 'Loading...';

    // Play a brief animation before loading
    imgElement.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => {
        imgElement.style.animation = '';
        imgElement.onload = () => {}
        fetch(apiUrl)
            .then(data => data.arrayBuffer())
            .then(buffer => {
                const blob = new Blob([buffer], {type: 'image/jpeg'});
                const url = URL.createObjectURL(blob);
                imgElement.src = url
                imgElement.alt = ''
                addGridEffects(imgElement)
            })
            .catch(error => {
                console.error('Error fetching image:', error)
                imgElement.alt = 'Error: Image failed to load. Please try again later.'
            });
    }, 250);

    function addGridEffects(element) {
        element.style.gridTemplateColumns = 'repeat(1, minmax(300px, 1fr))'
        element.style.gridGap = '8px'
        element.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)'
        element.style.border = '4px solid #fff'
        element.style.borderRadius = '40px'
        element.style.transition = 'transform 0.4s ease-in-out, box-shadow 0.3s';
    }
});