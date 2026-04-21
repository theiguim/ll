 document.addEventListener('DOMContentLoaded', () => {
            const wrapper = document.querySelector('.hz-scroll-wrapper');
            const track = document.querySelector('.hz-carousel-track');
            const items = document.querySelectorAll('.hz-carousel-item');
            const counter = document.querySelector('.hz-counter');
            const floatingText = document.querySelector('.hz-floating-text'); // NOVA LINHA
            const totalItems = items.length;

            // Define o texto inicial baseado na primeira foto
            if (items.length > 0) {
                floatingText.innerText = items[0].getAttribute('data-text');
            }

            window.addEventListener('scroll', () => {
                const rect = wrapper.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top <= 0 && rect.bottom >= windowHeight) {

                    const scrollProgress = Math.abs(rect.top) / (rect.height - windowHeight);
                    const maxTranslate = track.scrollWidth - window.innerWidth;
                    track.style.transform = `translateX(-${scrollProgress * maxTranslate}px)`;

                    items.forEach((item, index) => {
                        const itemRect = item.getBoundingClientRect();
                        const itemCenter = itemRect.left + itemRect.width / 2;
                        const windowCenter = window.innerWidth / 2;
                        const distance = Math.abs(windowCenter - itemCenter);

                        let scale = 1 - (distance / (window.innerWidth / 2)) * 0.3;
                        if (scale < 0.6) scale = 0.6;
                        item.style.transform = `scale(${scale})`;

                        // Atualiza o contador E O TEXTO se a imagem estiver bem no centro
                        if (distance < itemRect.width / 2) {
                            counter.innerText = `${index + 1}/${totalItems}`;
                            floatingText.innerText = item.getAttribute('data-text'); // NOVA LINHA
                        }
                    });

                } else if (rect.top > 0) {
                    track.style.transform = `translateX(0px)`;
                    counter.innerText = `1/${totalItems}`;
                    if (items[0]) {
                        items[0].style.transform = 'scale(1)';
                        floatingText.innerText = items[0].getAttribute('data-text'); // Reseta texto
                    }
                } else if (rect.bottom < windowHeight) {
                    const maxTranslate = track.scrollWidth - window.innerWidth;
                    track.style.transform = `translateX(-${maxTranslate}px)`;
                    counter.innerText = `${totalItems}/${totalItems}`;
                    if (items[totalItems - 1]) {
                        floatingText.innerText = items[totalItems - 1].getAttribute('data-text'); // Mantém texto da última foto
                    }
                }
            });
        });