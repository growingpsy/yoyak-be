const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require('./swagger/swagger-output.json');
const { sequelize } = require('./models');

const app = express();

// 서버 포트 설정
app.set('port', process.env.PORT || 3000);

// CORS 설정
app.use(cors({
  origin: ['http://localhost:3000', 'https://yoyaklery.site'],
  methods: 'GET, POST, DELETE, PATCH, PUT, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
}));

// Swagger 설정
app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    swaggerOptions: {
      url: '/swagger/swagger-output.json', // swagger-output.json의 URL
      layout: "StandaloneLayout",
    },
  })
);

// 데이터베이스 연결
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

// 미들웨어 설정
app.use(morgan('dev'));
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 라우터 설정
// const userRoutes = require('./routes/users');

// app.use('/users', userRoutes);

// 404 오류 처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500).send(res.locals.message);
});

// 서버 시작
app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 대기 중`);
});