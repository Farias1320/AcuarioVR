# 🐠 Acuario VR 3D — Exploración Submarina Interactiva 🌊

**Acuario VR** es una experiencia inmersiva desarrollada con **A-Frame** que te transporta a un entorno submarino lleno de vida marina, efectos ambientales y sonidos realistas.  
Explora, interactúa y observa de cerca peces, tiburones, algas y más en un entorno tridimensional compatible con **Meta Quest** y otros visores VR.

---

## 🚀 Características principales

- 🌊 **Ambiente 3D realista**: modelos en formato `.glb` con texturas y animaciones suaves.  
- 🐟 **Peces animados**: varios tipos de peces se mueven con trayectorias naturales mediante sistemas personalizados de movimiento.  
- 🦈 **Interacción VR**: acércate a los peces para ver su panel informativo.  
- 🎧 **Sonido ambiental**: efectos de agua y burbujas que refuerzan la sensación de inmersión.  
- 🪸 **Sistemas modulares**:
  - `bubble-system.js`: genera burbujas dinámicas en el entorno.  
  - `feeding-system.js`: simula la alimentación de los peces.  
  - `interaction-system.js`: detecta colisiones e interacción con los modelos.  
  - `swim-system.js`: controla el movimiento natural de las criaturas.  
  - `main.js`: gestiona la escena principal y la lógica global.  
- 💡 **Optimizado para VR**: compatible con **A-Frame** y **Meta Quest 2**.  

---

## 🕹️ Controles e Interacción (VR)

| Acción | Descripción |
|--------|--------------|
| 🧭 Moverse | Usa los mandos VR o el joystick del visor para desplazarte. |
| 👀 Mirar | Apunta tu vista o tu retícula hacia los peces u objetos para seleccionarlos. |
| 💬 Información | Al acercarte a un pez, se mostrará su panel informativo. |
| 🍽️ Alimentar | Interactúa con los peces mediante el sistema de alimentación. |

---

---

## 🧰 Tecnologías utilizadas

- **A-Frame** (framework WebVR)
- **HTML5 / CSS3 / JavaScript**
- **GLTF / GLB** para modelos 3D
- **Sonidos ambientales MP3**
- **Netlify** (para despliegue y pruebas)

---

## ⚙️ Cómo ejecutarlo localmente

1. Clona el repositorio o descarga este proyecto:
   ```bash
   git clone https://github.com/tuusuario/Acuario.git
2. cd Acuario
3. python -m http.server
4. http://localhost:8000/Acuario/

## 👩‍💻 Autores

**Belén Villca, Cristopher Farias, Karla Chicaiza**

Proyecto desarrollado con fines educativos y de demostración VR.
 ```bash
"Sumérgete en un mundo donde la realidad y lo digital se mezclan bajo el agua." 🐚
 ```
## 🪶 Licencia

Este proyecto se distribuye bajo la licencia MIT.
Puedes usarlo, modificarlo y compartirlo libremente con atribución al autor original.
