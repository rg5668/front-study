var x = 1;
var y = 1;

// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용
var x = 100;
// 초기화문이 없는 변수 선언문은 무시.
var y;

console.log(x);
console.log(y);

// let 이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
let bar = 123;

let bar = 456;