class FeedingSystem {
  constructor(component) {
    this.component = component;
    this.foodItems = [];
  }

  init() {
    console.log('🍖 Sistema de alimentación iniciado');
  }
}

class FeedingTarget {
  constructor(component) {
    this.component = component;
  }

  init() {
    this.component.el.addEventListener('click', () => {
      const food = document.createElement('a-entity');
      const camPos = document.querySelector('#camera').object3D.position;
      food.setAttribute('position', `${camPos.x} ${camPos.y - 0.5} ${camPos.z - 2}`);
      food.setAttribute('geometry', { primitive: 'sphere', radius: 0.1 });
      food.setAttribute('material', { color: '#FFD700' });
      food.setAttribute('dynamic-body', 'shape: sphere; mass: 0.1');
      food.setAttribute('animation', {
        property: 'position',
        to: `${camPos.x} -1.5 ${camPos.z - 2}`,
        dur: 1000,
        easing: 'easeOutQuad'
      });
      this.component.el.sceneEl.appendChild(food);
      setTimeout(() => {
        if (food.parentNode) food.parentNode.removeChild(food);
      }, 5000);
    });
  }
}

// Registro sin herencia
AFRAME.registerComponent('feeding-system', {
  init: function() {
    this.system = new FeedingSystem(this);
    this.system.init();
  }
});

AFRAME.registerComponent('feeding-target', {
  init: function() {
    this.system = new FeedingTarget(this);
    this.system.init();
  }
});