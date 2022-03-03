// object 객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키와 값으로 구성된다.
// 객체는 프로퍼티와 메서드로 구성된 집합체이다.
// 프로퍼티 : 객체의 상태를 나타내는 값
// 메서드: 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작(behavior)
const person = {
    name: 'Lim',
    age: 20,
    info: function() {
        return this.age;
    }
};

// 객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성
const person1 = {
    name: 'Lee',
    age: 20
};
