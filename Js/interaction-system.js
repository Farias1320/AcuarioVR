class FishInfo {
  constructor(component) {
    this.component = component;
    this.data = component.data;
  }

  static schema = {
    name: { type: 'string' },
    description: { type: 'string' },
    habitat: { type: 'string' },
    diet: { type: 'string' },
    size: { type: 'string' },
    curiosity: { type: 'string' }
  };

  init() {
    const el = this.component.el;
    el.classList.add('clickable');

    // --- Variables para detección de mirada ---
    let gazeTimer = null;
    const gazeDuration = 90; // ms para mostrar panel al mirar

    // --- Evento de clic normal ---
    el.addEventListener('click', () => this.showFishInfo(el));

    // --- Detección por mirada (cursor hover) ---
    el.addEventListener('mouseenter', () => {
      gazeTimer = setTimeout(() => {
        this.showFishInfo(el);
      }, gazeDuration);
    });

    el.addEventListener('mouseleave', () => {
      clearTimeout(gazeTimer);
    });

    // --- Cerrar panel HTML ---
    const closeBtn = document.getElementById('close-fish-panel');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const panel = document.getElementById('fish-info-panel');
        const fish3DModel = document.getElementById('fish-3d-model');
        panel.style.display = 'none';
        fish3DModel.removeAttribute('animation');
        fish3DModel.removeAttribute('gltf-model');
      });
    }
  }

  // Función para mostrar información del pez
  showFishInfo(el) {
    const {
      name = '🐠 Pez desconocido',
      description = 'Sin descripción disponible.',
      habitat = 'Océano',
      diet = 'Algas y pequeños organismos',
      size = 'Mediano',
      curiosity = 'Curiosidad interesante'
    } = this.data;

    const scene = document.querySelector('a-scene');
    const isVR = scene.is('vr-mode');

    //Modelo 3D del pez (HTML)
    const modelSrc = el.getAttribute('gltf-model');
    const originalScale = el.getAttribute('scale') || { x: 1, y: 1, z: 1 };

    // --- Modo VR ---
    if (isVR) {
      const vrPanel = document.getElementById('vr-fish-panel');
      const vrName = document.getElementById('vr-fish-name');
      const vrDesc = document.getElementById('vr-fish-description');
      const vrModel = document.getElementById('vr-fish-model');

      vrPanel.setAttribute('visible', true);

      //Actualiza texto en panel VR
      vrName.setAttribute('text', 'value', `🐠 ${name}`);
      vrDesc.setAttribute(
        'text',
        'value',
        `${description}\n\n🌊 Habitat: ${habitat}\n🍽️ Dieta: ${diet}\n📏 Tamano: ${size}\n🤔 Curiosidad: ${curiosity}`
      );

      // Cargar modelo 3D del pez en VR
      vrModel.setAttribute('gltf-model', modelSrc);
      vrModel.setAttribute('visible', true);

      //Escala general reducida
      let scaled = {
        x: originalScale.x * 0.3,
        y: originalScale.y * 0.3,
        z: originalScale.z * 0.3
      };

      // --- Excepción: ajustar escala específica para el WhiteShark ---
      if (modelSrc.includes('WhiteShark')) {
        // Tiburón Blanco es enorme → se reduce más
        scaled = {
          x: originalScale.x * 0.18,
          y: originalScale.y * 0.18,
          z: originalScale.z * 0.18
        };
      }

      vrModel.setAttribute('scale', scaled);

      //Ajuste automático de posición según modelo
      let yOffset = 0;
      if (modelSrc.includes('WhiteShark')) {
        // El tiburón blanco tiene su centro de masa desplazado
        yOffset = -0.4; // Baja un poco el modelo en el panel VR
      }

      // Posición del modelo dentro del panel VR
      vrModel.setAttribute('position', `1.3 ${yOffset} 1.3`);

      // --- Ajuste de rotación específico por modelo ---
      let rotationFix = '0 0 0';
      let rotationAnimTo = '0 360 0';

      // 🔧 El HammerShark tiene su eje frontal vertical → giramos 90° en el eje X
      if (modelSrc.includes('HammerShark')) {
        rotationFix = '0 90 180';   // Corrige orientación inicial
        rotationAnimTo = '0 450 180'; // Mantiene animación alrededor del eje Y
      }

      // Aplicar rotación inicial
      vrModel.setAttribute('rotation', rotationFix);

      // Animación de rotación (solo gira en Y)
      vrModel.setAttribute('animation', {
        property: 'rotation',
        to: rotationAnimTo,
        loop: true,
        dur: 12000,
        easing: 'linear'
      });

      // Restaurar al salir de VR
      scene.addEventListener('exit-vr', () => {
        vrPanel.setAttribute('visible', false);
        vrModel.removeAttribute('gltf-model');
        panel.style.display = 'flex';
      });

      // Oculta panel 2D
      const htmlPanel = document.getElementById('fish-info-panel');
      htmlPanel.style.display = 'none';
      return;
    }

    // --- Modo HTML normal ---
    const nameElem = document.getElementById('fish-name');
    const descElem = document.getElementById('fish-description');
    const panel = document.getElementById('fish-info-panel');
    const fish3DModel = document.getElementById('fish-3d-model');
    const fishDisplay = document.getElementById('fish-3d-display');

    //Panel HTML
    nameElem.textContent = `🐠 ${name}`;
    descElem.innerHTML = `
      ${description}<br><br>
      🌊 <b>Habitat:</b> ${habitat}<br>
      🍽️ <b>Dieta:</b> ${diet}<br>
      📏 <b>Tamano:</b> ${size}<br>
      🤔 <b>Curiosidad:</b> ${curiosity}
    `;

    panel.style.display = 'flex';

    //Configura modelo 3D del pez en panel HTML
    fish3DModel.setAttribute('gltf-model', modelSrc);
    fish3DModel.setAttribute('scale', originalScale);
    fish3DModel.setAttribute('rotation', '0 0 0');
    fish3DModel.setAttribute('visible', true);

    //Animación de rotación del modelo 3D (HTML)
    fish3DModel.removeAttribute('animation');
    fish3DModel.setAttribute('animation', {
      property: 'rotation',
      to: '0 360 0',
      loop: true,
      dur: 10000,
      easing: 'linear'
    });
  }
}

// Registrar como componente A-Frame
AFRAME.registerComponent('fish-info', {
  schema: FishInfo.schema,
  init: function () {
    this.system = new FishInfo(this);
    this.system.init();
  }
});
