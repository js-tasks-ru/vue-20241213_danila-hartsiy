import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',

  setup() {
    const create = 'Сегодня ';
    const options = {
      dateStyle: 'long'
    };
    const date = new Date().toLocaleDateString(navigator.language, options);

    return {
      create,
      date,
      options
    }
  },

  template: `
    <div>{{ create + date }}</div>
  `
});
// Создаём Vue приложение - абстракцию для конфигурации
const app = createApp(App)
// Через приложение можно устанавливать плагины, глобальную конфигурацию и др.
// app.use(plugin)

// После монтирования приложения на страницу, Vue отвечает за рендеринг этой части страницы.
// Метод возвращает экземпляр корневого компонента
const vm = app.mount('#app')

// Для отладки - добавим в глобальную переменную
// Позже научимся делать это через vue-devtools
window.vm = vm