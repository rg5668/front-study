// 생성자 함수가 new 연산자 없이 호출되는 것을 방지하기 위해 사용 new.target
function Circle(radius) {
    if(!new.target) {
        return new Circle(radius);
    }
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    }
}

const circle = Circle(6);
console.log(circle);
console.log(circle.getDiameter());