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

// slide

const transformPrev = () => {

}

const slidePrevList = document.getElementsByClassName('slide-prev');

for (let i = 0; i < slidePrevList.length; i++) {
    // ul 태그 선택
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    // li 태그 선택
    let liList = classList.getElementsByTagName('li');

    // 카드가 ul 태그 너비보다 넘치면, 왼쪽(Prev) < 버튼을 활성화, 오른쪽(Next)는 현재 맨 첫카드 위치이므로 비활성화
    if (classList.clientWidth < (liList.length * 260)) {
        slidePrevList[i].classList.add('slide-prev-hover');
        slidePrevList[i].addEventListener('click', transformPrev);
    } else {
        // 태그 삭제시, 부모 요소에서 removeChild 를 통해 삭제해야 함
        // 따라서 먼저 부모 요소를 찾아서, 부모 요소의 자식 요소로 있는 PREV와 NEXT 요소를 삭제함
        const arrowContainer = slidePrevList[i].parentElement;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevList[i]);
    }
}