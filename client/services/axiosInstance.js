import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let accessToken = "";

function setAccessToken(token) {
  accessToken = token;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//  Перехватывает ответы сервера и обрабатывает ошибку 403
axiosInstance.interceptors.response.use(
  (response) => response, // Возвращает ответ, если нет ошибок
  async (error) => {
    // Обрабатывает ошибку
    const prevRequest = error.config; // Получаем предыдущий запрос из ошибки
    if (error.response.status === 403 && !prevRequest.sent) {
      // Если ошибка 403 и запрос не отправлен
      const response = await axios("/api/tokens/refresh"); // Отправляем запрос на обновление токена
      accessToken = response.data.accessToken; // Получаем новый токен доступа
      prevRequest.sent = true; // Устанавливаем флаг отправки запроса в true
      prevRequest.headers.Authorization = `Bearer ${accessToken}`; // Устанавливаем новый токен доступа в заголовок
      return axiosInstance(prevRequest); // Повторно отправляем запрос с новым токеном доступа
    }
    return Promise.reject(error);
  }
);

export { setAccessToken };
export default axiosInstance;
