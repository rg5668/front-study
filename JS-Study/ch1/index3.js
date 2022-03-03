//객체 생성
const person = {
    name: "Lim"
};

// 프로퍼티 동적 생성
person.age = 27;
console.log(person.age);

// 프로퍼티 동적 삭제
delete person.name;
console.log(person);