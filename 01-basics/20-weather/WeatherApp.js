import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',


  setup() {
    const weatherData = getWeatherData();


    function isOutsideInterval(dt, sunrise, sunset) {
      const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };

      const dtMinutes = timeToMinutes(dt);
      const sunriseMinutes = timeToMinutes(sunrise);
      const sunsetMinutes = timeToMinutes(sunset);

      return dtMinutes < sunriseMinutes || dtMinutes > sunsetMinutes;
    }

    return {
      weatherData,
      WeatherConditionIcons,
      isOutsideInterval
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li 
            v-for="location in weatherData"
            :class="[
              'weather-card', 
              { 'weather-card--night': isOutsideInterval(location.current.dt, location.current.sunrise, location.current.sunset) }]"
        >
          <div v-if="location.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ location.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ location.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title=location.current.weather.description>
              {{ WeatherConditionIcons[location.current.weather.id] }}
            </div>
            <div class="weather-conditions__temp">{{ (location.current.temp - 273.15).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">
                {{ (location.current.pressure * 0.75).toFixed(0) }}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">
                {{ location.current.humidity }}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">
                {{ location.current.clouds }}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">
                {{ location.current.wind_speed }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
