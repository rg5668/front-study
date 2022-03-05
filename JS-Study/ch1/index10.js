function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    }
// 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암무적으로 this가 반환된다.
// 생성자 함수 내부에서 return 문을 반드시 생략해야 한다.
    return 100;
}

const circle = new Circle(2);
console.log(circle);
console.log(circle.getDiameter());