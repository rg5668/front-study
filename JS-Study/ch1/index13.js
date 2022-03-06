// API 호출
// https://jsonplaceholder.typicode.com/ 무료 응답 테스트 자원
// fetch는 내장함수(Promise) 비동기 함수를 처리한다.

async function getData() {
    let rawResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
    let jsonResponse = await rawResponse.json();
    console.log(jsonResponse);
  }
  
  getData();
  
//   객체 자체를 조회
  // let responde = fetch("https://jsonplaceholder.typicode.com/posts").then(
  //   (res) => {
  //     console.log(res);
  //   }
  // );
  