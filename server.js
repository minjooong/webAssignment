var express = require('express');
var http = require('http');
var app = express();
const cors = require('cors');
var server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // 모든 출처 허용
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드 추가
    allowedHeaders: '*', // 모든 헤더를 허용
}));

// 정적 파일을 서빙하는 경우
app.use(express.static('public')); // 'public' 디렉토리에 정적 파일이 있는 경우 사용

// 서버가 정상적으로 요청을 수신하고 있는지를 확인
app.use(function(req, res, next) {
    console.log('Received a request to ' + req.originalUrl);
    next();
});

// 기본 경로로 index.html 파일 서빙
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// 에러 핸들링 미들웨어 추가
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

server.listen(PORT, function() {
    console.log(`Server started on port ${PORT}...`);
});

