const backToTop = document.getElementById('backtotop');

const checkScroll = () => {
    // 웹페이지가 수직으로 얼마나 스크롤 됐는지 픽셀 단위로 반환한다.
    let pageYOffset = window.pageYOffset;

    if (pageYOffset !== 0) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

const moveBackToTop = () => {
    if (window.pageYOffset > 0) {
        // behavior : smooth로 하면 스무스하게 상하가 움직인다.
        window.scrollTo({top: 0, behavior: "smooth"})
    }
}

window.addEventListener('scroll', checkScroll);
backToTop.addEventListener('click', moveBackToTop);

// ---------slide------------------------

function transformNext(event) {
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;

    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeli = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');

    // 하나의 카드라도 왼쪽으로 이동했다면, 오른쪽으로 이동 가능
    if(Number(activeli) < 0) {
        activeli = Number(activeli) + 260;

        // 왼쪽에 있던 카드가 오른쪽으로 갔다면, 다시 왼쪽으로 갈 수 있으므로 PREV 버튼 활성화
        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', transformPrev);

        if (Number(activeli) === 0) {
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click', transformNext);
        }
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeli) + 'px)';
    classList.setAttribute('data-position', activeli);
}

function transformPrev(event) {
    // 왼쪽으로 가는 함수
    // target을 하면 이벤트의 요소를 가져올 수 있다. (click)
    // nextElementSibling 그 아래 next
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;

    // ul 태그 선택
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let activeli = classList.getAttribute('data-position');
    let liList = classList.getElementsByTagName('li');

    if(classList.clientWidth < (liList.length * 260 + Number(activeli))) {
        activeli = Number(activeli) - 260;

        if(classList.clientWidth < (liList.length * 260 + Number(activeli))) {
            slidePrev.style.color = 'cfd8dc';
            slidePrev.classList.remove('slide-prev-hover');
            slidePrev.removeEventListener('click', transformPrev);
        }

        slideNext.style.color = '#2f3059';
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click', transformNext);
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeli) + 'px)';
    classList.setAttribute('data-position', activeli);
}


const slidePrevList = document.getElementsByClassName('slide-prev');
// 첫 로딩
for (let i = 0; i < slidePrevList.length; i++) {
    // ul 태그 선택
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    // li 태그 선택
    let liList = classList.getElementsByTagName('li');

    // 카드가 ul 태그 너비보다 넘치면, 왼쪽(Prev) < 버튼을 활성화, 오른쪽(Next)는 현재 맨 첫카드 위치이므로 비활성화
    if (classList.clientWidth < (liList.length * 260)) {
        slidePrevList[i].classList.add('slide-prev-hover');
        // 클릭 이벤트
        slidePrevList[i].addEventListener('click', transformPrev);
    } else {
        // 태그 삭제시, 부모 요소에서 removeChild 를 통해 삭제해야 함
        // 따라서 먼저 부모 요소를 찾아서, 부모 요소의 자식 요소로 있는 PREV와 NEXT 요소를 삭제함
        const arrowContainer = slidePrevList[i].parentElement;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevList[i]);
    }
}