// ==========================================
// SELEÇÃO DE ELEMENTOS
// ==========================================

const mobileVideos = document.querySelectorAll('.mobile-list video');
const desktopVideos = document.querySelectorAll('.desktop-grid video');

// ==========================================
// FUNÇÕES DE ATUALIZAÇÃO DE ÍCONES
// ==========================================

function updatePlayIcon(video, icon) {
    if (video.paused) {
        // Ícone de PLAY (triângulo)
        icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    } else {
        // Ícone de PAUSE (duas barras)
        icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    }
}

function updateMuteIcon(video, icon) {
    if (video.muted) {
        // Ícone de MUDO (com X)
        icon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
    } else {
        // Ícone de SOM (com ondas)
        icon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
    }
}

// ==========================================
// CONTROLES MOBILE
// ==========================================

function togglePlayMobile(index) {
    const video = mobileVideos[index];
    const container = video.closest('.video-container');
    const icon = container.querySelector('.play .icon');
    
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    
    if (icon) {
        updatePlayIcon(video, icon);
    }
}

function toggleMuteMobile(index) {
    const video = mobileVideos[index];
    const container = video.closest('.video-container');
    const icon = container.querySelector('.mute .icon');
    
    video.muted = !video.muted;
    
    if (icon) {
        updateMuteIcon(video, icon);
    }
}

// ==========================================
// CONTROLES DESKTOP
// ==========================================

function togglePlayDesktop(index) {
    const video = desktopVideos[index];
    const container = video.closest('.video-container');
    const icon = container.querySelector('.play .icon');
    
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    
    if (icon) {
        updatePlayIcon(video, icon);
    }
}

function toggleMuteDesktop(index) {
    const video = desktopVideos[index];
    const container = video.closest('.video-container');
    const icon = container.querySelector('.mute .icon');
    
    video.muted = !video.muted;
    
    if (icon) {
        updateMuteIcon(video, icon);
    }
}

// ==========================================
// EVENT LISTENERS - MOBILE VIDEOS
// ==========================================

mobileVideos.forEach((video) => {
    // Quando o vídeo começar a tocar
    video.addEventListener('play', () => {
        const icon = video.closest('.video-container').querySelector('.play .icon');
        if (icon) {
            updatePlayIcon(video, icon);
        }
    });
    
    // Quando o vídeo pausar
    video.addEventListener('pause', () => {
        const icon = video.closest('.video-container').querySelector('.play .icon');
        if (icon) {
            updatePlayIcon(video, icon);
        }
    });
    
    // Quando o vídeo terminar
    video.addEventListener('ended', () => {
        const icon = video.closest('.video-container').querySelector('.play .icon');
        if (icon) {
            updatePlayIcon(video, icon);
        }
    });
});

// ==========================================
// EVENT LISTENERS - DESKTOP VIDEOS
// ==========================================

desktopVideos.forEach((video) => {
    // Quando o vídeo começar a tocar
    video.addEventListener('play', () => {
        const icon = video.closest('.video-container').querySelector('.play .icon');
        if (icon) {
            updatePlayIcon(video, icon);
        }
    });
    
    // Quando o vídeo pausar
    video.addEventListener('pause', () => {
        const icon = video.closest('.video-container').querySelector('.play .icon');
        if (icon) {
            updatePlayIcon(video, icon);
        }
    });
    
    // Quando o vídeo terminar
    video.addEventListener('ended', () => {
        const icon = video.closest('.video-container').querySelector('.play .icon');
        if (icon) {
            updatePlayIcon(video, icon);
        }
    });
});

// ==========================================
// INICIALIZAÇÃO AO CARREGAR A PÁGINA
// ==========================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('Página carregada! Inicializando vídeos...');
    console.log('Vídeos mobile encontrados:', mobileVideos.length);
    console.log('Vídeos desktop encontrados:', desktopVideos.length);
    
    // Inicializar ícones dos vídeos mobile
    mobileVideos.forEach((video, index) => {
        const container = video.closest('.video-container');
        const playIcon = container.querySelector('.play .icon');
        const muteIcon = container.querySelector('.mute .icon');
        
        if (playIcon) {
            updatePlayIcon(video, playIcon);
        }
        if (muteIcon) {
            updateMuteIcon(video, muteIcon);
        }
        
        console.log(`Vídeo mobile ${index + 1} inicializado`);
    });
    
    // Inicializar ícones dos vídeos desktop
    desktopVideos.forEach((video, index) => {
        const container = video.closest('.video-container');
        const playIcon = container.querySelector('.play .icon');
        const muteIcon = container.querySelector('.mute .icon');
        
        if (playIcon) {
            updatePlayIcon(video, playIcon);
        }
        if (muteIcon) {
            updateMuteIcon(video, muteIcon);
        }
        
        console.log(`Vídeo desktop ${index + 1} inicializado`);
    });
});

// ==========================================
// LOG PARA DEBUG (PODE REMOVER EM PRODUÇÃO)
// ==========================================

console.log('Script carregado com sucesso! ✅');