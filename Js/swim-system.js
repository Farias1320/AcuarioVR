class AquariumSwim {
  constructor(component) {
    this.component = component;
    this.angle = 0;
    this.speed = 0;
    this.radius = 0;
    this.verticalPhase = 0;
    this.isWhiteShark = false;
  }

  init() {
    const el = this.component.el;
    console.log('🐠 Swim system iniciado para:', el.getAttribute('gltf-model'));

    // Ángulo inicial aleatorio
    this.angle = Math.random() * Math.PI * 2;

    // Velocidad y radio de nado ligeramente variables
    this.speed = 0.2 + Math.random() * 0.2;
    this.radius = 5 + Math.random() * 3;

    // Fase de oscilación vertical
    this.verticalPhase = Math.random() * Math.PI * 2;

    // Excepción: si es el tiburón blanco, se mantiene más arriba
    this.isWhiteShark = el.getAttribute('gltf-model').includes('WhiteShark');

    // Ajustes de rotación inicial para orientar el pez correctamente
    el.object3D.rotation.set(0, Math.random() * Math.PI * 2, 0);
  }

  tick(time, timeDelta) {
    if (!timeDelta) return;

    const el = this.component.el;
    const dt = timeDelta / 1000;

    // Movimiento circular suave (sin brusquedad)
    this.angle += dt * this.speed;
    const x = Math.cos(this.angle) * this.radius;
    const z = Math.sin(this.angle) * this.radius;

    // Movimiento vertical (suave oscilación tipo nado)
    const yBase = this.isWhiteShark ? 3.5 : 0; // WhiteShark se mantiene más arriba
    const y = yBase + Math.sin(this.angle * 1.5 + this.verticalPhase) * 0.8;

    // Aplicar posición
    el.object3D.position.set(x, y, z);

    // Orientar al pez en dirección de movimiento (fluida)
    const targetRotY = Math.atan2(-z, x);
    const currentRotY = el.object3D.rotation.y;
    el.object3D.rotation.y = THREE.MathUtils.lerp(currentRotY, targetRotY, 0.05);
  }
}

AFRAME.registerComponent('aquarium-swim', {
  init: function () {
    this.system = new AquariumSwim(this);
    this.system.init();
  },
  tick: function (time, timeDelta) {
    this.system.tick(time, timeDelta);
  }
});
