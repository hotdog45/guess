import ErrorPage from './ErrorPage';
import TabBar from './TabBar';

const components = [
  ErrorPage,
];

const install = function install(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export {
  install,
  ErrorPage,
  TabBar,
};
