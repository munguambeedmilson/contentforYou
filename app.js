class LeaksApp {
    constructor() {
        this.currentPage = 'home';
        this.currentSection = null;
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
            EXCLUSIVECP: 'pages/home/EXCLUSIVECP.html',
            
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
                'EnglishTeens',
                'Lizzy',
                'Ivakah',
                'SnapGood',
                'Desiree',
                 'EXCLUSIVECP',
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
                    <h1>This site contains adult content. You must be at least 18 years old to continue.</h1>
                    <p>By clicking "I am over 18," you confirm that you are legally allowed to view this content in your region.</p>
                    <button class="verification-button verification-button-exit" onclick="leaksApp.handleExit()">EXIT</button>
                    <button class="verification-button verification-button-confirm" onclick="leaksApp.handleConfirm()">I AM OVER 18</button>
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
        // Carregar componentes fixos
        await this.loadComponent('navbar', 'navbar-container');
        await this.loadComponent('footer', 'footer-container');
        
        // Carregar página inicial
        await this.loadPageFromURL();
        
        // Setup navegação
        this.setupNavigation();
        this.setupURLManagement();
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
                await this.loadPageAndScrollToSection(page, section, false);
            } else {
                await this.loadPage(page, false);
            }
        } else {
            await this.loadPage('home', false);
        }
    }

    async loadPage(pageName, updateHistory = true) {
        try {
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
            
        } catch (error) {
            console.error(`Erro ao carregar página ${pageName}:`, error);
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

    async loadPageAndScrollToSection(pageName, sectionId, updateHistory = true) {
        try {
            await this.loadPage(pageName, false);
            
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
            }, 700);
            
        } catch (error) {
            console.error(`Erro ao carregar página ${pageName}:`, error);
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
                    this.loadPageAndScrollToSection(pageName, section, true);
                } else {
                    this.loadPage(pageName, true);
                }
            }
        });
    }

    setupURLManagement() {
        window.addEventListener('popstate', (event) => {
            const state = event.state;
            if (state && state.page) {
                if (state.section) {
                    this.loadPageAndScrollToSection(state.page, state.section, false);
                } else {
                    this.loadPage(state.page, false);
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