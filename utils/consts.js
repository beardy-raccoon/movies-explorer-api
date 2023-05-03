const MESSAGE = {
  BAD_REQUEST: 'Неверный запрос',
  NOT_FOUND_MOVIE: 'Фильм не найден',
  FORBIDDEN: 'Удалять чужие фильмы запрещено',
  MOVIE_DELETED: 'Фильм успешно удален',
  AUTH_FAILED: 'Неверный email или пароль',
  NOT_FOUND_USER: 'Нет пользователя с таким id',
  EMAIL_EXIST: 'Этот email уже занят',
  BAD_LINK: 'Некорректная ссылка',
  BAD_EMAIL: 'Некорректный email',
  NOT_FOUND: 'Запрашиваемая страница не найдена',
};

const DEV_DB_URL = 'mongodb://localhost:27017/moviesdb';
const API_URL = 'https://api.raccoondiploma.nomoredomains.sbs';
const APP_URL = 'https://raccoondiploma.nomoredomains.sbs';

module.exports = {
  MESSAGE,
  DEV_DB_URL,
  API_URL,
  APP_URL,
};
