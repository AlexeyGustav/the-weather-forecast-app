const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'c05b921fa430d6236ee7d7af3568defa';

export const fetchWeather = async (city) => {
  try { 
    const response = await fetch(`${API_URL}weather?q=${city}&appid=${API_KEY}&lang=ru`);
    if (!response.ok) {
      throw new Error('Ошибка запроса')
    }
    const data = await response.json();
      return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

export const fetchForecast = async (city) => {
  try { 
    const response = await fetch(`${API_URL}forecast?q=${city}&appid=${API_KEY}&lang=ru`);
    if (!response.ok) {
      throw new Error('Ошибка запроса')
    }
    const data = await response.json();
      return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}