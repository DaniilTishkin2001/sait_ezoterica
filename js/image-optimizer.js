// Responsive Image Generator with WebP/AVIF Support
class ResponsiveImageOptimizer {
    constructor() {
        this.breakpoints = {
            mobile: 480,
            tablet: 768,
            desktop: 1024,
            large: 1440
        };
        this.init();
    }

    init() {
        this.optimizeCarouselImages();
        this.setupImageLoading();
        this.generateResponsiveImages();
    }

    optimizeCarouselImages() {
        const carouselImages = document.querySelectorAll('.special-card__image');
        
        carouselImages.forEach((image, index) => {
            const bgStyle = image.style.backgroundImage;
            const urlMatch = bgStyle.match(/url\(['"]?([^'"]+)['"]?\)/);
            
            if (urlMatch) {
                const originalUrl = urlMatch[1];
                const imageName = originalUrl.split('/').pop();
                
                // Add dimensions to prevent CLS
                this.addImageDimensions(image, originalUrl);
                
                // Create responsive picture element
                this.createResponsivePicture(image, originalUrl, index);
                
                // Setup lazy loading
                this.setupLazyLoading(image, originalUrl, index);
            }
        });
    }

    addImageDimensions(imageElement, imageUrl) {
        // Pre-calculate aspect ratios to prevent CLS
        const aspectRatios = {
            '5296603349773916465.jpg': 16/9,
            '5296603349773916730.jpg': 16/9,
            '5359580824602349141.jpg': 16/9,
            '5296603349773916868.jpg': 16/9,
            '5296603349773916758.jpg': 16/9
        };

        const imageName = imageUrl.split('/').pop();
        const aspectRatio = aspectRatios[imageName] || 16/9;
        
        // Set explicit dimensions to prevent layout shift
        imageElement.style.aspectRatio = aspectRatio.toString();
        imageElement.style.minHeight = '200px';
        imageElement.style.backgroundColor = '#f0f0f0';
        
        // Add loading state
        imageElement.classList.add('loading');
    }

    createResponsivePicture(imageElement, originalUrl, index) {
        const imageName = originalUrl.split('/').pop();
        const imageBaseName = imageName.replace(/\.[^/.]+$/, '');
        
        // Create picture element with WebP fallback
        const picture = document.createElement('picture');
        
        // AVIF source for modern browsers
        const avifSource = document.createElement('source');
        avifSource.type = 'image/avif';
        avifSource.srcset = this.generateSrcSet(imageBaseName, 'avif');
        
        // WebP source for wide support
        const webpSource = document.createElement('source');
        webpSource.type = 'image/webp';
        webpSource.srcset = this.generateSrcSet(imageBaseName, 'webp');
        
        // JPEG fallback
        const img = document.createElement('img');
        img.src = originalUrl;
        img.alt = `Carousel image ${index + 1}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        
        // Add sizes attribute for responsive loading
        img.sizes = this.generateSizes();
        
        picture.appendChild(avifSource);
        picture.appendChild(webpSource);
        picture.appendChild(img);
        
        // Replace background image with picture element
        imageElement.innerHTML = '';
        imageElement.appendChild(picture);
        imageElement.style.backgroundImage = 'none';
    }

    generateSrcSet(baseName, format) {
        const srcSet = [];
        
        Object.entries(this.breakpoints).forEach(([name, width]) => {
            const scaledWidth = Math.min(width, 1200); // Cap at 1200px
            srcSet.push(`${baseName}-${scaledWidth}w.${format} ${scaledWidth}w`);
        });
        
        return srcSet.join(', ');
    }

    generateSizes() {
        return '(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
    }

    setupLazyLoading(imageElement, originalUrl, index) {
        // Use Intersection Observer for lazy loading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(imageElement, index);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '50px',
                threshold: 0.1
            }
        );

        // Only observe non-critical images (index > 2 for desktop)
        if (index > 2) {
            observer.observe(imageElement);
        } else {
            // Load critical images immediately
            this.loadImage(imageElement, index);
        }
    }

    loadImage(imageElement, index) {
        const img = imageElement.querySelector('img');
        if (img && img.src) {
            img.onload = () => {
                imageElement.classList.remove('loading');
                imageElement.classList.add('loaded');
            };
            
            img.onerror = () => {
                // Fallback handling
                imageElement.classList.add('error');
            };
        }
    }

    setupImageLoading() {
        // Add loading styles
        const style = document.createElement('style');
        style.textContent = `
            .special-card__image {
                position: relative;
                overflow: hidden;
                transition: opacity 0.3s ease;
            }
            
            .special-card__image.loading {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
            }
            
            .special-card__image.loaded {
                opacity: 1;
            }
            
            @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            
            .special-card__image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }
            
            .special-card__image:hover img {
                transform: scale(1.05);
            }
        `;
        document.head.appendChild(style);
    }

    generateResponsiveImages() {
        // This would be implemented in build process
        // For now, we'll use existing images with responsive loading
        console.log('Responsive image optimization applied');
    }
}

// Initialize image optimizer
new ResponsiveImageOptimizer();
