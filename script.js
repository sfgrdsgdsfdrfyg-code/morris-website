document.getElementById('newImageButton').addEventListener('click', function() {
    const imgElement = document.getElementById('morrisImage');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const statusDisplay = document.getElementById('statusDisplay');
    
    // Show loading state
    loadingIndicator.classList.add('visible');
    statusDisplay.textContent = '🔄 Fetching new Morris image...';
    
    // Clear current image
    imgElement.src = '';
    imgElement.alt = 'Loading Morris image...';
    
    // Animate image frame
    const frame = imgElement.parentElement.parentElement;
    frame.style.transform = 'scale(0.95)';
    frame.style.filter = 'brightness(0.8)';
    
    setTimeout(() => {
        fetch('https://morrisapi.starnumber12046.workers.dev/morris')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                imgElement.src = url;
                imgElement.alt = '';
                
                // Hide loading indicator
                loadingIndicator.classList.remove('visible');
                statusDisplay.textContent = '✅ Image loaded successfully!';
                
                // Animate frame back
                frame.style.transform = 'scale(1)';
                frame.style.filter = 'brightness(1)';
                
                // Add entrance animation
                imgElement.style.opacity = '0';
                imgElement.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    imgElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    imgElement.style.opacity = '1';
                    imgElement.style.transform = 'translateY(0)';
                }, 100);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                imgElement.alt = `Error: ${error.message}`;
                loadingIndicator.classList.remove('visible');
                statusDisplay.textContent = '❌ Error loading image. Please try again.';
                
                // Animate frame shake
                frame.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    frame.style.animation = '';
                }, 500);
            });
    }, 300);
    
    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});