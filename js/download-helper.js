// Download helper function - deferred loading
function downloadImage(imagePath, fileName) {
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export для module использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { downloadImage };
}
