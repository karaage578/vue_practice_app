Vue.directive('change-color', {
  bind(el, binding) {
    el.addEventListener('click', () => {
      el.style.color = binding.value;
    });
  },
});

new Vue({
  el: '#example',
});