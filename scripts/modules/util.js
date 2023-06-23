// if (n < 10) {
//   n += '0' 
// } else {
//   return n
// }



export const getCurrentDateTime = () => {
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];

  const weekDays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ]

  const date = new Date()
  const dayOfMonth = date.getDate();  // получаем день
  const month = months[date.getMonth()];  // получаем месяц и подставляем в массив
  const year = date.getFullYear()
  const dayOfWeek = weekDays[date.getDay()];
  
  let hours = date.getHours();
  let minutes = date.getMinutes();
  

  if (hours < 10) {
    hours = '0' + hours;
    // hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes += '0' 
  }

  return {dayOfWeek, dayOfMonth, hours, minutes, month, year}
  
};