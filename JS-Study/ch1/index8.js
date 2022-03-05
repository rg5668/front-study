const person = {
    firstName: 'Kunhee',
    lastName: 'Lim',

    // getter 함수
    get fullName() {
        return this.firstName + this.lastName;
    },
    // setter 함수
    set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ');
    }
};

console.log(person.firstName + ' ' + person.lastName);

console.log('PullName = ', person.fullName);
// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// fullName에 값을 저장하면 setter 함수가 호출
person.fullName = 'Simin An';
console.log(person);
// getter 함수가 호출
console.log(person.fullName);