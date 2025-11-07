class MainApp {
  constructor() {
    console.log('🎯 Main JS cargado');
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('🚀 DOM cargado - Iniciando acuario...');
      this.diagnose();
    });
  }

  diagnose() {
    setTimeout(() => {
      console.log('=== DIAGNÓSTICO COMPLETADO ===');
      const peces = document.querySelectorAll('[aquarium-swim]');
      console.log('Peces nadando:', peces.length);
    }, 3000);
  }
}

new MainApp();  // Instancia la app