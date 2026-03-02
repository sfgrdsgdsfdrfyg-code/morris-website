document.getElementById('newImageButton').addEventListener('click', function() {
    const imgElement = document.getElementById('morrisImage');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const statusDisplay = document.getElementById('statusDisplay');
    
    // Show loading state
    loadingIndicator.classList.add('visible');
    statusDisplay.textContent = '🔄 Fetching new Morris image...';
    
    // Clear current image src to force a reload event
    imgElement.src = '';
    imgElement.alt = 'Loading Morris image...';
    
    // Animate image frame
    const frame = document.querySelector('.image-frame');
    if (frame) {
        frame.style.transform = 'scale(0.95)';
        frame.style.filter = 'brightness(0.8)';
    }
    
    // Note: If you get a CORS/Network error, it's likely because the worker endpoint
    // does not allow requests from your current domain or has rate limits.
    // We append a timestamp to bypass browser caching.
    const apiUrl = 'https://morrisapi.starnumber12046.workers.dev/morris?t=' + Date.now();

    fetch(apiUrl, { mode: 'cors' })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            
            // Set up the load event before updating the src
            imgElement.onload = function() {
                loadingIndicator.classList.remove('visible');
                statusDisplay.textContent = '✅ Image loaded successfully!';
                
                if (frame) {
                    frame.style.transform = 'scale(1)';
                    frame.style.filter = 'brightness(1)';
                }
                
                // Add entrance animation
                imgElement.style.opacity = '0';
                imgElement.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    imgElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    imgElement.style.opacity = '1';
                    imgElement.style.transform = 'translateY(0)';
                }, 50);
                
                // Clean up the object URL to avoid memory leaks
                imgElement.onload = null;
            };

            imgElement.src = url;
            imgElement.alt = 'Morris';
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            // Check for common network error causes
            let errorMsg = error.message;
            if (errorMsg === 'Failed to fetch') {
                errorMsg = 'Network Error (likely CORS or API downtime)';
            }
            
            imgElement.alt = `Error: ${errorMsg}`;
            loadingIndicator.classList.remove('visible');
            statusDisplay.textContent = `❌ ${errorMsg}`;
            
            if (frame) {
                frame.style.transform = 'scale(1)';
                frame.style.filter = 'brightness(1)';
                frame.style.animation = 'shake 0.5s';
                setTimeout(() => { frame.style.animation = ''; }, 500);
            }
        });
});

// Add shake animation if not present
if (!document.getElementById('retro-animations')) {
    const style = document.createElement('style');
    style.id = 'retro-animations';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}
