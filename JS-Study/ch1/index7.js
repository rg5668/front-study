const person = {
    name: 'Lim',
}

// 프로퍼티 동적 생성
person.age = 27

// getOwnPropertyDescriptor 는
// value: 'Lim', writable: true, enumerable: true, configurable: true
// 값           갱신여부            열거가능여부    재정의가능여부
// console.log(Object.getOwnPropertyDescriptor(person,'name'));

console.log(Object.getOwnPropertyDescriptors(person));