document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. GALERİ / TIKLAMA MANTIĞI ---
    const gridItems = document.querySelectorAll('.pafta-item');
    const gridContainer = document.getElementById('grid-container');
    const bigImg = document.getElementById('big-preview-img');
    const placeholderText = document.getElementById('left-placeholder-text');
    const descBox = document.getElementById('project-description-box');

    // Eğer sayfada grid yoksa hata vermesin diye kontrol
    if (gridContainer) {
        gridItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation(); // Tıklamayı yayma

                // Eğer zaten açıksa kapat (resetle)
                if (this.classList.contains('active')) {
                    resetView();
                    return;
                }

                // Değilse önce temizle, sonra aç
                resetView(); 
                
                // Aktif sınıfı ekle
                this.classList.add('active');
                gridContainer.classList.add('has-active-item');

                // Resim ve metin verisini al
                const imgTag = this.querySelector('img');
                const src = imgTag.getAttribute('src');
                const text = imgTag.getAttribute('data-text');

                // Sol tarafa resmi koy ve göster
                if(bigImg) {
                    bigImg.src = src;
                    bigImg.style.display = 'block';
                }
                if(placeholderText) {
                    placeholderText.style.display = 'none';
                }

                // Açıklama metnini yaz
                if (descBox) {
                    descBox.innerHTML = text;
                    descBox.classList.add('visible');
                }
            });
        });

        // Büyük resme tıklayınca da kapansın
        if(bigImg) {
            bigImg.addEventListener('click', function() {
                resetView();
            });
        }
    }

    function resetView() {
        // Grid'i temizle
        gridItems.forEach(el => el.classList.remove('active'));
        if(gridContainer) gridContainer.classList.remove('has-active-item');

        // Sol tarafı temizle
        if(bigImg) {
            bigImg.style.display = 'none';
            bigImg.src = "";
        }
        if(placeholderText) {
            placeholderText.style.display = 'flex'; // Tekrar görünür yap
        }

        // Metni temizle
        if (descBox) {
            descBox.classList.remove('visible');
            setTimeout(() => { descBox.innerHTML = ""; }, 300);
        }
    }

    // --- 2. PAN (SÜRÜKLEME) FONKSİYONU ---
    const panController = document.getElementById('pan-controller');
    const movableLayer = document.getElementById('movable-layer');

    if (panController && movableLayer) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        panController.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = movableLayer.offsetLeft;
            initialTop = movableLayer.offsetTop;
            document.body.style.userSelect = 'none';
            panController.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            movableLayer.style.left = `${initialLeft + dx}px`;
            movableLayer.style.top = `${initialTop + dy}px`;
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = 'auto';
            panController.style.cursor = 'move';
        });
    }

    // --- 3. GEÇİŞ HOTSPOTLARI ---
    document.querySelectorAll(".hotspot-next").forEach(hotspot => {
        hotspot.addEventListener("click", () => {
            const target = hotspot.getAttribute('href'); 
            if(target) window.location.href = target;
        });
    });

    document.querySelectorAll(".hotspot-prev").forEach(hotspot => {
        hotspot.addEventListener("click", () => {
            const target = hotspot.getAttribute('href'); 
            if(target) window.location.href = target;
        });
    });
});