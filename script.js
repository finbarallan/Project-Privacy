/**
 * Opto Privacy Policy Website JavaScript
 * Handles markdown parsing and dynamic content loading
 */

// Configuration
const CONFIG = {
    markdownFile: 'PRIVACY_POLICY.md',
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
        
        // Load and parse the markdown content
        const markdownContent = await loadMarkdownFile();
        const htmlContent = parseMarkdownToHTML(markdownContent);
        
        // Display the content
        displayContent(htmlContent);
        
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
 * Parse markdown content to HTML using marked.js
 */
function parseMarkdownToHTML(markdownContent) {
    try {
        // Configure marked options
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false,
            pedantic: false,
            sanitize: false,
            silent: false,
            smartLists: true,
            smartypants: true,
            xhtml: false
        });
        
        // Parse markdown to HTML
        const htmlContent = marked.parse(markdownContent);
        
        // Post-process the HTML for better styling
        return enhanceHTML(htmlContent);
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
    
    if (loadingContainer) {
        loadingContainer.style.display = 'none';
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