import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup(){
    const weatherData = getWeatherData();
    const weatherIcon = WeatherConditionIcons;

    const temp = (value) => {
        const result = value - 273.15;
        return result.toFixed(1)
    }

    const pressure = (value) => {
      return Math.round(value * 0.75)
    }

    const theme  = (sunrise, dt, sunset) => {
      if ((parseInt(sunrise) < parseInt(dt)) && (parseInt(dt) < parseInt(sunset))) {
        return false
      }
      else {
         return true
      }
    }

    return {
      weatherData,
      weatherIcon,
      temp,
      pressure,
      theme
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="city in weatherData" :key="city.geographic_name" class="weather-card" :class="{ 'weather-card--night' : theme(city.current.sunrise, city.current.dt, city.current.sunset) }">
          <div class="weather-alert" v-if="city.alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ city.alert.sender_name }}️ : {{ city.alert.description }}️</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{  city.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{  city.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="city.current.weather.description" >{{ weatherIcon[city.current.weather.id]}}</div>
            <div class="weather-conditions__temp"> {{  temp(city.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label"> Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{  pressure(city.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{  city.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{  city.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{  city.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
