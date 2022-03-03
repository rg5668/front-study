// 렉시컬 스코프
// 전역 스코프
let x = 1;

function foo() {
    let x = 10;
    // 지역 스코프
    console.log(x);
    bar();
}

function bar() {
// 지역
    console.log(x);
}