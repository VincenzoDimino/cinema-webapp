# Cinema Web App - Final
## What's new in this version
- CSS separated into: global.css, home.css, calendar.css, news.css, film.css
- React Router (react-router-dom) with routes:
  /, /calendar, /news, /news/:id, /film/:id
- Backend: Spring Boot with in-memory data (no DB)
- 12 news in the pool; /api/news returns 3 random items
- Placeholder images in backend/src/main/resources/static/images
- Concise comments added to Java and React code

## Run
1. Backend:
   cd backend
   mvn spring-boot:run
2. Frontend:
   cd frontend
   npm install
   npm start

Backend serves images at: http://localhost:8080/api/images/<name>
