document.addEventListener("DOMContentLoaded", () => {

    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    // focus effects
    searchInput.addEventListener('focus', () => {
        searchInput.placeholder = 'Type your search query...';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.placeholder = 'Search anything...';
    });
    
    // interactive action cards
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardTitle = card.querySelector('h3').textContent;
            
            // You can customize these actions based on the card clicked
            switch(cardTitle) {
                case 'Discover':
                    searchInput.value = 'discover new technologies';
                    break;
                case 'Lock-In':
                    searchInput.value = 'productivity tips focus';
                    break;
                case 'Build':
                    searchInput.value = 'how to build projects';
                    break;
            }
            
            // focus on search input after clicking card
            searchInput.focus();
        });
    });
    
    // smooth scroll 
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            }
        });
    });
    
    // Search form enhancement
    searchForm.addEventListener('submit', (e) => {
        const query = searchInput.value.trim();
        if (!query) {
            e.preventDefault();
            searchInput.focus();
            searchInput.placeholder = 'Please enter a search query';
            setTimeout(() => {
                searchInput.placeholder = 'Search anything...';
            }, 2000);
        }
    });
    
    //shortcuts
    document.addEventListener('keydown', (e) => {
        // focus search with Ctrl/Cmd + K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // clear search with Escape
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.blur();
            searchInput.value = '';
        }
    });
    
    //loading state to search button
    searchForm.addEventListener('submit', () => {
        searchButton.style.opacity = '0.7';
        searchButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3" opacity="0.3">
                    <animate attributeName="r" values="3;6;3" dur="1s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
    });
});