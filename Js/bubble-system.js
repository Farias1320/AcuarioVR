class BubbleSystem {
  constructor(component) {
    this.component = component;  // Referencia al componente A-FRAME
    this.bubbles = [];
  }

  init() {
    console.log('💧 Sistema de burbujas iniciado');
    this.createBubbles();
  }

  createBubbles() {
    for (let i = 0; i < 20; i++) {
      this.createBubble(i * 150);
    }
  }

  createBubble(delay = 0) {
    setTimeout(() => {
      const bubble = document.createElement('a-entity');
      const startX = -8 + Math.random() * 16;
      const startZ = -8 + Math.random() * 16;
      const startY = -1.8;
      bubble.setAttribute('position', `${startX} ${startY} ${startZ}`);
      const bubbleSize = 0.03 + Math.random() * 0.05;
      bubble.setAttribute('geometry', { primitive: 'sphere', radius: bubbleSize });
      bubble.setAttribute('material', { color: '#FFFFFF', opacity: 0.4 + Math.random() * 0.5, transparent: true, shader: 'flat' });
      const riseDuration = 2000 + Math.random() * 1000;
      bubble.setAttribute('animation', {
        property: 'position',
        to: `${startX + (Math.random() - 0.5) * 0.8} 2.5 ${startZ + (Math.random() - 0.5) * 0.8}`,
        dur: riseDuration,
        easing: 'easeOutCubic'
      });
      bubble.setAttribute('animation__scale', {
        property: 'scale',
        from: '0.3 0.3 0.3',
        to: '1 1 1',
        dur: riseDuration * 0.3,
        easing: 'easeOutQuad'
      });
      bubble.setAttribute('animation__opacity', {
        property: 'components.material.material.opacity',
        to: '0',
        dur: riseDuration - 200,
        easing: 'easeInQuad',
        delay: 200
      });
      this.component.el.appendChild(bubble);
      this.bubbles.push(bubble);
      setTimeout(() => {
        if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
        this.createBubble();
      }, riseDuration + 500);
    }, delay);
  }
}

// Registro sin herencia
AFRAME.registerComponent('bubble-system', {
  init: function() {
    this.system = new BubbleSystem(this);
    this.system.init();
  }
});