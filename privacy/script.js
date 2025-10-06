/**
 * Opto Privacy Policy Website JavaScript
 * Handles markdown parsing and dynamic content loading
 */

// Configuration
const CONFIG = {
    markdownFile: 'https://raw.githubusercontent.com/finbarallan/Project-Privacy/main/PRIVACY_POLICY.md',
    contentContainer: 'privacy-content',
    loadingContainer: 'loading'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Main application initialization
 */
async function initializeApp() {
    try {
        // Show loading state
        showLoading();
        
        // Use embedded content directly for reliability
        if (window.PRIVACY_POLICY_CONTENT) {
            console.log('Using embedded content');
            const htmlContent = parseMarkdownToHTML(window.PRIVACY_POLICY_CONTENT);
            displayContent(htmlContent);
        } else {
            // Fallback: try to load from external source
            console.log('Embedded content not found, trying external load');
            try {
                const markdownContent = await loadMarkdownFile();
                const htmlContent = parseMarkdownToHTML(markdownContent);
                displayContent(htmlContent);
            } catch (error) {
                throw new Error('Could not load content from any source');
            }
        }
        
        // Hide loading state
        hideLoading();
        
        console.log('Privacy policy loaded successfully');
    } catch (error) {
        console.error('Error loading privacy policy:', error);
        displayError();
    }
}

/**
 * Load the markdown file from the server
 */
async function loadMarkdownFile() {
    try {
        const response = await fetch(CONFIG.markdownFile);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const content = await response.text();
        return content;
    } catch (error) {
        throw new Error(`Failed to load markdown file: ${error.message}`);
    }
}

/**
 * Parse markdown content to HTML using a simple parser
 */
function parseMarkdownToHTML(markdownContent) {
    try {
        // Simple markdown parser (handles the most common elements)
        let htmlContent = markdownContent
            // Headers
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            
            // Bold and italic
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            
            // Line breaks and paragraphs - improved handling
            .replace(/\n\n+/g, '\n\n') // Normalize multiple line breaks to double
            .replace(/(<\/h[1-6]>)\n+/g, '$1\n') // Remove extra breaks after headers
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            
            // Wrap in paragraphs
            .replace(/^(?!<h[1-6]|<\/p>)(.+?)(?=<h[1-6]|$)/gm, '<p>$1</p>')
            
            // Clean up empty paragraphs and extra breaks
            .replace(/<p><\/p>/g, '')
            .replace(/<p><br><\/p>/g, '')
            .replace(/(<\/h[1-6]>)<br>/g, '$1') // Remove breaks immediately after headers
            
            // Handle bullet points
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            
            // Handle emojis and special characters
            .replace(/📱/g, '<span class="emoji">📱</span>')
            .replace(/🚀/g, '<span class="emoji">🚀</span>')
            .replace(/🐛/g, '<span class="emoji">🐛</span>')
            .replace(/🔒/g, '<span class="emoji">🔒</span>')
            .replace(/🔐/g, '<span class="emoji">🔐</span>')
            .replace(/📧/g, '<span class="emoji">📧</span>');
        
        return htmlContent;
    } catch (error) {
        throw new Error(`Failed to parse markdown: ${error.message}`);
    }
}

/**
 * Enhance the HTML with custom styling and structure
 */
function enhanceHTML(htmlContent) {
    // Create a temporary container to manipulate the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Add custom classes and enhancements
    enhanceHeaders(tempDiv);
    enhanceLinks(tempDiv);
    enhanceEmojis(tempDiv);
    
    return tempDiv.innerHTML;
}

/**
 * Enhance headers with anchor links and better styling
 */
function enhanceHeaders(container) {
    const headers = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headers.forEach(header => {
        // Create anchor link for headers (except h1)
        if (header.tagName !== 'H1') {
            const id = header.textContent
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
            
            header.id = id;
            
            // Add anchor link
            const anchor = document.createElement('a');
            anchor.href = `#${id}`;
            anchor.className = 'header-anchor';
            anchor.innerHTML = '#';
            anchor.setAttribute('aria-hidden', 'true');
            
            header.appendChild(anchor);
        }
    });
}

/**
 * Enhance external links with proper attributes
 */
function enhanceLinks(container) {
    const links = container.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
        // Add external link attributes
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        
        // Add visual indicator for external links
        if (!link.innerHTML.includes('📧') && !link.innerHTML.includes('mailto:')) {
            link.innerHTML += ' ↗';
        }
    });
}

/**
 * Enhance emoji display
 */
function enhanceEmojis(container) {
    // Wrap standalone emojis in spans for better styling
    const textNodes = getTextNodes(container);
    
    textNodes.forEach(node => {
        const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
        const text = node.textContent;
        
        if (emojiRegex.test(text)) {
            const parent = node.parentNode;
            const wrapper = document.createElement('span');
            wrapper.innerHTML = text.replace(emojiRegex, '<span class="emoji">$1</span>');
            parent.replaceChild(wrapper, node);
        }
    });
}

/**
 * Get all text nodes from a container
 */
function getTextNodes(container) {
    const textNodes = [];
    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    return textNodes;
}

/**
 * Display the parsed content
 */
function displayContent(htmlContent) {
    const contentContainer = document.getElementById(CONFIG.contentContainer);
    
    if (contentContainer) {
        contentContainer.innerHTML = htmlContent;
        contentContainer.classList.add('loaded');
        
        // Smooth scroll to hash if present
        if (window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }
}

/**
 * Show loading state
 */
function showLoading() {
    const loadingContainer = document.getElementById(CONFIG.loadingContainer);
    const contentContainer = document.getElementById(CONFIG.contentContainer);
    
    if (loadingContainer) {
        loadingContainer.style.display = 'block';
    }
    
    if (contentContainer) {
        contentContainer.style.display = 'none';
    }
}

/**
 * Hide loading state
 */
function hideLoading() {
    const loadingContainer = document.getElementById(CONFIG.loadingContainer);
    const contentContainer = document.getElementById(CONFIG.contentContainer);
    
    if (loadingContainer) {
        loadingContainer.style.display = 'none';
    }
    
    if (contentContainer) {
        contentContainer.style.display = 'block';
    }
}

/**
 * Display error message
 */
function displayError() {
    const contentContainer = document.getElementById(CONFIG.contentContainer);
    const loadingContainer = document.getElementById(CONFIG.loadingContainer);
    
    if (loadingContainer) {
        loadingContainer.style.display = 'none';
    }
    
    if (contentContainer) {
        contentContainer.innerHTML = `
            <div class="error-message">
                <h2>Oops! Something went wrong</h2>
                <p>We couldn't load the privacy policy. Please try refreshing the page or contact us at <a href="mailto:contact@optophoto.com">contact@optophoto.com</a> if the problem persists.</p>
                <button onclick="window.location.reload()" class="retry-button">
                    Try Again
                </button>
            </div>
        `;
        contentContainer.classList.add('loaded');
    }
}

/**
 * Handle smooth scrolling for anchor links
 */
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Handle anchor links
    if (target.tagName === 'A' && target.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL hash
            history.pushState(null, null, `#${targetId}`);
        }
    }
});

/**
 * Theme detection and handling
 */
function detectThemePreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Log theme information (for debugging)
 */
window.addEventListener('load', function() {
    const theme = detectThemePreference();
    console.log(`User prefers ${theme} theme`);
    
    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        const newTheme = e.matches ? 'dark' : 'light';
        console.log(`Theme changed to ${newTheme}`);
    });
});

/**
 * Add CSS for error message and enhancements
 */
const additionalStyles = `
    <style>
    .error-message {
        text-align: center;
        padding: 3rem;
        color: var(--text-secondary);
    }
    
    .error-message h2 {
        color: var(--text-primary);
        margin-bottom: 1rem;
    }
    
    .retry-button {
        background: var(--gradient-opto);
        border: none;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 1rem;
        transition: opacity 0.2s ease;
    }
    
    .retry-button:hover {
        opacity: 0.9;
    }
    
    .header-anchor {
        opacity: 0;
        margin-left: 0.5rem;
        color: var(--accent-blue);
        text-decoration: none;
        font-weight: normal;
        transition: opacity 0.2s ease;
    }
    
    h2:hover .header-anchor,
    h3:hover .header-anchor,
    h4:hover .header-anchor {
        opacity: 1;
    }
    
    .emoji {
        font-style: normal;
        font-weight: normal;
    }
    </style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

