import { calculateDevPoint, convertPressure, getCurrentDateTime, getWeatherForecastData } from "./util.js";  // ctrl + пробел

export const renderWidgetToday = (widget, data) => {
  const { dayOfMonth, month, year, hours, minutes, dayOfWeek} = getCurrentDateTime();
  
  widget.insertAdjacentHTML(
    'beforeend', 
    `<div class="widget__today">
      <div class="widget__date-block">
        <p class="widget__date">${dayOfMonth} ${month} ${year}</p>
        <p class="widget__time">${hours}:${minutes}</p>
        <p class="widget__day">${dayOfWeek}</p>
      </div>
      <div class="widget__icon">
        <img class="widget__img" src="./icon/${data.weather[0].icon}.svg" alt="Погода">
      </div>
      <div class="widget__wheather">
        <div class="widget__city">
          <p>${data.name}</p>
          <button class="widget__change-city" aria-label="Изменить город"></button>
          
        </div>
        <p class="widget__temp-big">${(data.main.temp - 273.15).toFixed(1)}°C</p>
        <p class="widget__felt">ощущается</p>
        <p class="widget__temp-small">${(data.main.feels_like - 273.15).toFixed(1)}°C</p>
      </div>
    </div>`
  )


  const changeBtn = document.querySelector('.widget__change-city');
  console.log('changeBtn: ', changeBtn);
  changeBtn.addEventListener('click', () => {
    console.log('click');
  })

};
export const renderWidgetOther = (widget, data) => {

  // эта функция меняет стрелку ветра в зависимости от данных которые к ней приходят в переменную indexDeg
  function windDirection() {
    let indexDeg = data.wind.deg;
    // console.log('indexDeg: ', indexDeg);
    let indexDegStr = '';
    
    if (indexDeg > 10 && indexDeg <= 75) {
      indexDegStr = '&#8599;'
    } else if (indexDeg > 80 && indexDeg <= 100) {
      indexDegStr = '&#8594;'
    } else if (indexDeg > 100 && indexDeg <= 170) {
      indexDegStr = '&#8600;'
    } else if (indexDeg > 170 && indexDeg <= 190) {
      indexDegStr = '&#8595;'
    } else if (indexDeg > 190 && indexDeg <= 260) {
      indexDegStr = '&#8601;' 
    } else if (indexDeg > 260 && indexDeg <= 280) {
      indexDegStr = '&#8592;'
    } else if (indexDeg > 280 && indexDeg <= 350) {
      indexDegStr = '&#8598;'
    } else {
      indexDegStr ='&#8593;'
    } 
    return indexDegStr

    // switch(+indexDeg) {
    //   case indexDeg > 10 && indexDeg <= 75:
    //     indexDegStr = '&#8599;';
    //     break;
    //   case indexDeg > 80 && indexDeg <= 100:
    //     indexDegStr = '&#8594;';
    //     break;
    //   case indexDeg > 100 && indexDeg <= 170:
    //     indexDegStr = '&#8600;';
    //     break;
    //   case indexDeg > 170 && indexDeg <= 190:
    //     indexDegStr = '&#8595;';
    //     break;
    //   case indexDeg > 190 && indexDeg <= 260:
    //     indexDegStr = '&#8601;' ;
    //     break; 
    //   case indexDeg > 260 && indexDeg <= 280:
    //     indexDegStr = '&#8592;';
    //     break;
    //   case indexDeg > 280 && indexDeg <= 350:
    //     indexDegStr = '&#8598;';
    //     break;
    //   default:
    //     indexDegStr ='&#8593;';       
    // }

  }


  widget.insertAdjacentHTML(
    'beforeend', 
    `<div class="widget__other">
      <div class="widget__wind">
        <p class="widget__wind-title">Ветер</p>
        <p class="widget__wind-speed">${(data.wind.speed * 0.5144).toFixed(1)} м/с</p>
        <p class="widget__wind-text">${windDirection()}</p>
      </div>
      <div class="widget__humidity">
        <p class="widget__humidity-title">Влажность</p>
        <p class="widget__humidity-value">${data.main.humidity}%</p>
        <p class="widget__humidity-text">Тчк.Росы: ${calculateDevPoint((data.main.temp - 273.15), data.main.humidity)} °C</p>
      </div>
      <div class="widget__pressure">
        <p class="widget__pressure-title">Давление</p>
        <p class="widget__pressure-value">${convertPressure(data.main.pressure)}</p>
        <p class="widget__pressure-text">мм рт.ст.</p>
      </div>
    </div>`
  )

};
export const renderWidgetForecast = (widget, data) => {
  console.log('data: ', data);

  const widgetForecast = document.createElement('ul');
  widgetForecast.className = 'widget__forecast';
  widget.append(widgetForecast);
  
  const forecastData = getWeatherForecastData(data);
  
  
  const items = forecastData.map((item) => {
    const widgetDayItem = document.createElement('li');
    widgetDayItem.className = 'widget__day-item';
    
    widgetDayItem.insertAdjacentHTML('beforeend',`
      <p class="widget__day-text">${item.dayOfWeek}</p>
      <img class="widget__day-img" src="./icon/${item.weatherIcon}.svg" alt="Погода">
      <p class="widget__day-temp">${(item.minTemp - 273.15).toFixed(1)}°/${(item.maxTemp - 273.15).toFixed(1)}°</p>
    `)
    
    return widgetDayItem;
    
  })

  widgetForecast.append(...items);
 
};

export const showError = (widget, error) => {
  widget.textContent = error.toString();
  widget.classList.add('widget_error');
}

