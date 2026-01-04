class LeaksApp {
    constructor() {
        this.currentPage = 'home';
        this.currentSection = null;
        this.isLoading = false;
        this.ageVerified = false;
        
        // Definir componentes
        this.components = {
            // Componentes fixos
            navbar: 'components/navbar.html',
            footer: 'components/footer.html',
            ageVerification: 'components/age-verification.html',
            
            // Seções da home
            heroSection: 'pages/home/hero.html',
            BLACK: 'pages/home/BLACK.html',
            Teens: 'pages/home/Teens.html',
            T33nsLeaks: 'pages/home/T33nsLeaks.html',
            Desiree: 'pages/home/DesireeGarciaFolder.html',
            EnglishTeens: 'pages/home/EnglishTeens.html',
            Lizzy: 'pages/home/Lizzy.html',
            Ivakah: 'pages/home/Ivakah.html',
            videosPreview: 'pages/home/videos-preview.html',
            TeenagersLeaked: 'pages/home/Teenagers-leaked.html',
            SnapGood: 'pages/home/SnapGood.html',

            carouselText: 'pages/home/carousel-text.html',
            ctaSection: 'pages/home/cta-section.html',
            
            // Outras páginas
            fullGallery: 'pages/gallery/full-gallery.html',
            contactInfo: 'pages/contact/contact-info.html'
        };
        
        // Definir páginas modulares
        this.modularPages = {
            home: [
                 'Teens',
                'heroSection',
                'BLACK',
             
                // 'T33nsLeaks',
                'EnglishTeens',
                'Lizzy',
                'Ivakah',
                'SnapGood',
                'Desiree',
                'videosPreview',
                'TeenagersLeaked',
                'carouselText',
                'ctaSection'
            ],
            gallery: ['fullGallery'],
            contact: ['contactInfo']
        };
        
        this.init();
    }

    async init() {
        try {
            // Criar loading overlay
            this.createLoadingOverlay();
            
            // Verificar se idade já foi verificada
            this.checkAgeVerification();
            
            if (!this.ageVerified) {
                // Carregar modal de verificação
                await this.loadAgeVerification();
            } else {
                // Carregar aplicação normal
                await this.loadApp();
            }
            
        } catch (error) {
            console.error('Erro ao inicializar:', error);
            this.showError('Erro ao carregar o site. Tente atualizar a página.');
        }
    }

    checkAgeVerification() {
        this.ageVerified = sessionStorage.getItem('ageVerified') === 'true';
    }

    async loadAgeVerification() {
        const container = document.getElementById('age-verification-container');
        
        // Criar modal inline
        container.innerHTML = `
            <div id="ageVerificationModal">
                <div class="verification-container">
                    <div class="verification-icon"></div>
                    <h1>Este site contém conteúdo adulto. Você deve ter pelo menos 18 anos para prosseguir.</h1>
                    <p>Ao clicar "Tenho mais de 18", você confirma que é maior de idade para visualizar este conteúdo na sua região.</p>
                    <button class="verification-button verification-button-exit" onclick="leaksApp.handleExit()">SAIR</button>
                    <button class="verification-button verification-button-confirm" onclick="leaksApp.handleConfirm()">TENHO MAIS DE 18</button>
                </div>
            </div>
        `;
    }

    handleExit() {
        window.location.href = 'https://www.google.com';
    }

    handleConfirm() {
        sessionStorage.setItem('ageVerified', 'true');
        this.ageVerified = true;
        
        // Esconder modal
        const modal = document.getElementById('ageVerificationModal');
        if (modal) {
            modal.classList.add('hidden');
            setTimeout(() => modal.remove(), 300);
        }
        
        // Carregar aplicação
        this.loadApp();
    }

    async loadApp() {
        this.showLoading('Carregando...');
        
        // Carregar componentes fixos
        await this.loadComponent('navbar', 'navbar-container');
        await this.loadComponent('footer', 'footer-container');
        
        // Carregar página inicial
        await this.loadPageFromURL();
        
        // Setup navegação
        this.setupNavigation();
        this.setupURLManagement();
        
        this.hideLoading();
    }

    createLoadingOverlay() {
        if (!document.getElementById('loading-overlay')) {
            const loadingHTML = `
                <div id="loading-overlay" class="loading-overlay" style="display: none;">
                    <div class="loading-content">
                        <div class="loading-spinner">
                            <div class="spinner-ring"></div>
                            <div class="spinner-ring"></div>
                            <div class="spinner-ring"></div>
                        </div>
                        <div class="loading-text">Loading...</div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', loadingHTML);
            this.addLoadingStyles();
        }
    }

    addLoadingStyles() {
        if (!document.getElementById('loading-styles')) {
            const styles = `
                <style id="loading-styles">
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    backdrop-filter: blur(10px);
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s ease, visibility 0.3s ease;
                }

                .loading-overlay.show {
                    opacity: 1;
                    visibility: visible;
                }

                .loading-content {
                    text-align: center;
                    padding: 2rem;
                }

                .loading-spinner {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    margin-bottom: 1rem;
                }

                .spinner-ring {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 3px solid transparent;
                    border-top: 3px solid #ff0000;
                    border-radius: 50%;
                    animation: spin 1.2s linear infinite;
                }

                .spinner-ring:nth-child(2) {
                    animation-delay: -0.4s;
                    border-top-color: rgba(255, 0, 0, 0.6);
                }

                .spinner-ring:nth-child(3) {
                    animation-delay: -0.8s;
                    border-top-color: rgba(255, 0, 0, 0.4);
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .loading-text {
                    font-size: 1.1rem;
                    font-weight: 500;
                    color: white;
                    animation: pulse 1.5s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
                </style>
            `;
            
            document.head.insertAdjacentHTML('beforeend', styles);
        }
    }

    showLoading(message = 'Loading...') {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const overlay = document.getElementById('loading-overlay');
        const text = overlay?.querySelector('.loading-text');
        
        if (overlay) {
            if (text) text.textContent = message;
            overlay.style.display = 'flex';
            setTimeout(() => overlay.classList.add('show'), 10);
        }
    }

    hideLoading() {
        this.isLoading = false;
        const overlay = document.getElementById('loading-overlay');
        
        if (overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
    }

    async loadComponent(componentName, containerId) {
        try {
            const response = await fetch(this.components[componentName]);
            if (!response.ok) throw new Error(`Erro ao carregar ${componentName}`);
            
            const html = await response.text();
            const container = document.getElementById(containerId);
            
            if (container) {
                container.innerHTML = html;
                container.classList.add('loaded');
            }
        } catch (error) {
            console.error(`Erro ao carregar ${componentName}:`, error);
        }
    }

    async loadPageFromURL() {
        const hash = window.location.hash.slice(1);
        const [page, section] = hash.split('/');
        
        if (page && this.modularPages[page]) {
            if (section) {
                await this.loadPageAndScrollToSection(page, section, false, false);
            } else {
                await this.loadPage(page, false, false);
            }
        } else {
            await this.loadPage('home', false, false);
        }
    }

    async loadPage(pageName, updateHistory = true, showLoadingOverlay = true) {
        try {
            if (showLoadingOverlay) {
                this.showLoading(`Loading ${pageName}...`);
            }
            
            const mainContainer = document.getElementById('main-content');
            
            if (mainContainer) {
                await this.loadModularPage(pageName);
                
                if (updateHistory) {
                    this.updateURL(pageName);
                }
                
                mainContainer.classList.add('loaded');
                
                if (!this.currentSection) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
            
            if (showLoadingOverlay) {
                this.hideLoading();
            }
            
        } catch (error) {
            console.error(`Erro ao carregar página ${pageName}:`, error);
            if (showLoadingOverlay) this.hideLoading();
            this.showError(`Erro ao carregar a página ${pageName}`);
        }
    }

    async loadModularPage(pageName) {
        const mainContainer = document.getElementById('main-content');
        const sections = this.modularPages[pageName];
        
        mainContainer.innerHTML = '';
        
        for (const sectionName of sections) {
            await this.loadSectionToContainer(sectionName, 'main-content');
        }
    }

    async loadSectionToContainer(sectionName, containerId) {
        try {
            const response = await fetch(this.components[sectionName]);
            if (!response.ok) throw new Error(`Erro ao carregar ${sectionName}`);
            
            const html = await response.text();
            const container = document.getElementById(containerId);
            
            if (container) {
                const sectionWrapper = document.createElement('div');
                sectionWrapper.className = `section-wrapper ${sectionName}-wrapper`;
                sectionWrapper.innerHTML = html;
                container.appendChild(sectionWrapper);
            }
            
        } catch (error) {
            console.error(`Erro ao carregar seção ${sectionName}:`, error);
        }
    }

    async loadPageAndScrollToSection(pageName, sectionId, updateHistory = true, showLoadingOverlay = true) {
        try {
            if (showLoadingOverlay) {
                this.showLoading(`Loading ${pageName}...`);
            }
            
            await this.loadPage(pageName, false, false);
            
            if (updateHistory) {
                this.updateURL(pageName, sectionId);
            }
            
            setTimeout(() => {
                const targetElement = document.getElementById(sectionId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                if (showLoadingOverlay) {
                    this.hideLoading();
                }
            }, 700);
            
        } catch (error) {
            console.error(`Erro ao carregar página ${pageName}:`, error);
            if (showLoadingOverlay) this.hideLoading();
        }
    }

    setupNavigation() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-page]');
            if (link) {
                e.preventDefault();
                const pageName = link.getAttribute('data-page');
                const section = link.getAttribute('data-section');
                
                if (section) {
                    this.loadPageAndScrollToSection(pageName, section, true, true);
                } else {
                    this.loadPage(pageName, true, true);
                }
            }
        });
    }

    setupURLManagement() {
        window.addEventListener('popstate', (event) => {
            const state = event.state;
            if (state && state.page) {
                if (state.section) {
                    this.loadPageAndScrollToSection(state.page, state.section, false, true);
                } else {
                    this.loadPage(state.page, false, true);
                }
            } else {
                this.loadPageFromURL();
            }
        });
    }

    updateURL(page, section = null) {
        let hash = `#${page}`;
        if (section) hash += `/${section}`;
        
        const state = { page, section };
        history.pushState(state, '', hash);
        
        this.currentPage = page;
        this.currentSection = section;
    }

    showError(message) {
        console.error(message);
        alert(message);
    }
}

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    window.leaksApp = new LeaksApp();
});