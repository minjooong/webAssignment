const messages = [
    "우리들의 맛집:우맛에 오신 것을 환영합니다",
    "맛집 선정에 진심인 사람들을 위한 곳입니다",
    "리뷰이벤트로 도배된 네이버 평점..",
    "리뷰 알바가 판을 치는 카카오맵..",
    "그래서 만들었습니다",
    "신뢰할 수 있는 지역 내 사람들끼리의 맛집 평점 서비스!",
];

let currentIndex = 0;
const messageElement = document.getElementById("message");

function showNextMessage() {
    messageElement.classList.remove("fade-in");
    void messageElement.offsetWidth; // 트릭을 사용하여 리플로우를 강제
    messageElement.classList.add("fade-in");
    messageElement.innerHTML = messages[currentIndex];
    currentIndex = (currentIndex + 1) % messages.length;
}

// 10초마다 메시지 전환
const intervalId = setInterval(showNextMessage, 7000);

// 화면 클릭 시 즉시 메시지 전환
document.body.addEventListener("click", () => {
    clearInterval(intervalId); // 기존 타이머 제거
    showNextMessage();
    setInterval(showNextMessage, 10000); // 새로운 타이머 시작
});

// 처음 메시지 표시
showNextMessage();
