function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
}

console.log(Circle);

// 인스턴스 생성. Circle 생성자 함수는 암무적으로 this를 반환한다.
const circle = new Circle(1);
console.log(circle);
console.log(circle.getDiameter());