function main() {

    async function getItems() {
        try {
            const res = await fetch('./assets/data/cards.json');
            const data = await res.json();
            createItems(data);
        } catch (error) {
            console.error('Errore durante il fetch:', error);
        }
    }

    getItems();

    const navigation = document.querySelector('.navigation');
    const overlay = document.querySelector('.overlay-wrapper');
    const containerItem = overlay.querySelector('.overlay-wrapper__container-item');
    const containerFront = overlay.querySelector('.overlay-wrapper__container-item-image-front');
    const containerBack = overlay.querySelector('.overlay-wrapper__container-item-image-back');
    const btnClose = overlay.querySelector('.overlay-close-btn');
    const btnFlip = overlay.querySelector('.overlay-flip-btn');


    btnFlip.addEventListener('click', () => {
        containerItem.classList.toggle('is--flipped');
    });

    btnClose.addEventListener('click', () => {
        overlay.classList.remove('is--open');
        containerItem.classList.remove('is--flipped');
        document.body.style.overflow = 'auto';
    });

    function createItems(items) {
        const container = document.querySelector('.grid-wrapper');

        items.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'grid-item';

            card.innerHTML = `
                <div class="grid-item__inner">
                    <div class="grid-item__inner-content">
                        <img class="grid-item__image" src="${item.imageSrc}" alt="${item.alt || 'Card image'}" />
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                showOverlay(item);
            });

            container.appendChild(card);
        });
    }

    function showOverlay(item) {
        document.body.style.overflow = 'hidden';

        containerFront.innerHTML = '';
        containerBack.innerHTML = '';

        const backText = document.createElement('p');
        backText.className = 'overlay-wrapper__item-image--back-text';
        backText.textContent = item.backText;
        containerBack.appendChild(backText);

        const imgFront = document.createElement('img');
        imgFront.src = item.imageSrc;
        imgFront.alt = item.alt || 'Front image';
        imgFront.className = 'overlay-wrapper__item-image--front';

        const imgBack = document.createElement('img');
        imgBack.src = item.backImageSrc;
        imgBack.alt = 'Back image';
        imgBack.className = 'overlay-wrapper__item-image--back';

        containerFront.appendChild(imgFront);
        containerBack.appendChild(imgBack);

        overlay.classList.add('is--open');
    }

    function animateNav(){
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {

            if(window.scrollY > lastScrollY) {
                navigation.classList.add('hidden')
            } else {
                navigation.classList.remove('hidden')
            }

            lastScrollY = window.scrollY
        })
    }

    animateNav();
}

document.addEventListener('DOMContentLoaded', () => {
    main();
});
