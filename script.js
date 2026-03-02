document.getElementById('newImageButton').addEventListener('click', function() {
    const imgElement = document.getElementById('morrisImage');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const statusDisplay = document.getElementById('statusDisplay');
    const frame = document.querySelector('.image-frame');
    
    console.log('Button clicked. Refreshing Morris...');

    // 1. UI Feedback: Show loading
    loadingIndicator.style.display = 'block';
    loadingIndicator.style.opacity = '1';
    statusDisplay.textContent = '🔄 Loading new Morris...';
    
    if (frame) {
        frame.style.transform = 'scale(0.98)';
        frame.style.opacity = '0.7';
    }

    // 2. The Direct Approach:
    // Instead of fetch(), we just update the src with a timestamp.
    // This avoids CORS issues because <img> tags aren't restricted by CORS, 
    // unlike fetch() or XHR.
    const newUrl = 'https://morrisapi.starnumber12046.workers.dev/morris?t=' + Date.now();
    
    // Set up handlers before changing src
    imgElement.onload = function() {
        console.log('Morris loaded successfully!');
        loadingIndicator.style.display = 'none';
        statusDisplay.textContent = '✅ Morris Refreshed!';
        if (frame) {
            frame.style.transform = 'scale(1)';
            frame.style.opacity = '1';
        }
        imgElement.style.filter = 'none';
    };

    imgElement.onerror = function() {
        console.error('Failed to load Morris image.');
        loadingIndicator.style.display = 'none';
        statusDisplay.textContent = '❌ Failed to load image. Check connection.';
        if (frame) {
            frame.style.transform = 'scale(1)';
            frame.style.opacity = '1';
        }
    };

    // Trigger the reload
    imgElement.src = newUrl;
});
