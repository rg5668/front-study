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

/* --------------------------------------------------------------------------------------------------------------------------------- */
// 마우스 위치
let touchstartX;
// 해당 클레스 리스트
let currentClassList;
// 해당 이미지
let currentImg;
// 드래그 하기 시작할때 카드에 위치(변경되는)
let currentActiveLi;
let nowActiveLi;
// 드래그가 시작되면 시작된 상황 (t, f)
let mouseStart; 

function processTouchMove(event) {
    event.preventDefault();
    // X축 좌표
    // currentActiveLi: class-list 에서 data-position으로 현재 카드 위치를 알아낸다.
    // touchstartX : 최조 요소의 x 좌표값
    // event.clientX: 드래그 중인 현재의 마우스 좌표값
    // 즉, (Number(event.clientX) - Number(touchstartX)) 는 마우스가 얼만큼 이동중인지를 나타냄.
    let currentX = event.clientX;
    nowActiveLi = Number(currentActiveLi) + (Number(currentX) - Number(touchstartX));

    //바로 즉시 마우스 위치에 따라, 카드를 이동한다.
    currentClassList.style.transition = 'transform 0s linear';
    currentClassList.style.transform = 'translateX(' + String(nowActiveLi) + 'px)';
}

function processTouchStart(event) {
    mouseStart = true;

// preventDefault(); 는 해당 요소의 고유의 동작을 중단시키는 함수 (이미지만 드래그로 이동하는 고유 동작 중단)
    event.preventDefault();
    // event.touches[0].screenX; : touch의 x 좌표(핸드폰)
    touchstartX = event.clientX || event.touches[0].screenX;
    currentImg = event.target;

    // 드래그 처리를 위해, 드래그 중(mousemove), 드래그가 끝났을 때 (mouseup) 에 이벤트를 걸어줌
    currentImg.addEventListener('mousemove', processTouchMove);
    currentImg.addEventListener('mouseup', processTouchEnd);
    // 스마트폰
    currentImg.addEventListener('touchmove', processTouchMove);
    currentImg.addEventListener('touchend', processTouchEnd);
    
    currentClassList = currentImg.parentElement.parentElement;
    currentActiveLi = currentClassList.getAttribute('data-position');
}

function processTouchEnd(event) {
    // preventDefault(); 는 해당 요소의 고유의 동작을 중단시키는 함수 (이미지만 드래그로 이동하는 고유 동작 중단)
    event.preventDefault();

    if(mouseStart === true) {
        // 드래그 종료 위해, 드래그 중(mousemove), 드래그가 끝났을 때 (mouseup) 에 이벤트를 제거
        currentImg.removeEventListener('mousemove', processTouchMove);
        currentImg.removeEventListener('mouseup', processTouchEnd);

        currentImg.removeEventListener('touchmove', processTouchMove);
        currentImg.removeEventListener('touchend', processTouchEnd);

        // 맨 처음 카드가 맨 앞에 배치되도록 초기 상태로 이동
        currentClassList.style.transition = 'transform 1s ease';
        currentClassList.style.transform = 'translateX(0px)';
        currentClassList.setAttribute('data-position', 0);

        // 맨 처음 카드가 맨 앞에 배치된 상태로 화살표 버튼도 초기 상태로 변경
        let eachSlidePrev = currentClassList.previousElementSibling.children[1].children[0];
        let eachSlideNext = currentClassList.previousElementSibling.children[1].children[1];
        let eachLiList = currentClassList.getElementsByTagName('li');

        if(currentClassList.clientWidth < (eachLiList.length * 260)) {
            // 버튼 다시 초기로 변경
            eachSlidePrev.style.color = '#2f3059';
            eachSlidePrev.classList.add('slide-prev-hover');
            eachSlidePrev.addEventListener('click', transformPrev);

            eachSlideNext.style.color = '#cfd8dc';
            eachSlideNext.classList.remove('slide-next-hover');
            eachSlideNext.removeEventListener('click', transformNext);
        }
        mouseStart = false;
    }
}

// 특정 요소를 드래그하다가, 요소 밖에서 드래그를 끝낼 수 있으므로 window 에 이벤트를 걸어준다.
window.addEventListener('dragend', processTouchEnd);
window.addEventListener('mouseup', processTouchEnd);

// 인터페이스간의 오동작을 막기 위해, 카드 내의 이미지에만 드래그 인터페이스를 제공하기로 함
const classImgLists = document.querySelectorAll('ul li img');

for(let i = 0; i < classImgLists.length; i++) {
    // 해당 요소에 마우스를 누르면, 드래그를 시작할 수 있으므로, 이벤트를 걸어준다.
    classImgLists[i].addEventListener('mousedown', processTouchStart);
    classImgLists[i].addEventListener('touchstart', processTouchStart);
}

// 스마트폰 touchstart, touchmove, touchend