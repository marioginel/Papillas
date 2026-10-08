# Cuaderno de Papillas

App web para registrar biberones, comidas y deposiciones del bebé, seguir el plan de transición y cocinar las recetas en la Thermomix. Está pensada para usarla dos personas desde el móvil.

- **Alojamiento:** Vercel (página estática, sin servidor ni build).
- **Base de datos:** Firebase Firestore. Sincroniza en tiempo real entre los dos móviles y funciona sin conexión.
- **Acceso:** Firebase Authentication con email y contraseña. Solo los dos emails que pongáis en las reglas pueden leer o escribir.
- **Coste:** 0 €. El plan gratuito de Firebase (Spark) permite 20.000 escrituras y 50.000 lecturas al día; vosotros haréis unas pocas decenas.

---

## 1. Crear la base de datos en Firebase (unos 10 minutos)

1. Entra en <https://console.firebase.google.com> con tu cuenta de Google y pulsa **Crear un proyecto**. Ponle un nombre (por ejemplo `cuaderno-papillas`). Google Analytics no hace falta.
2. **Activa el acceso con contraseña.** En el menú, ve a **Compilación → Authentication → Comenzar** y elige **Correo electrónico/contraseña**. Activa la primera opción y guarda.
3. **Crea los dos usuarios.** En **Authentication → Usuarios → Agregar usuario**, añade tu email con una contraseña. Repite con el email de tu mujer.
   No hay pantalla de registro en la app: solo entra quien des de alta aquí.
4. **Crea la base de datos.** En **Compilación → Firestore Database → Crear base de datos**:
   - Ubicación: `eur3 (europe-west)`.
   - Modo: **producción**.
5. **Pon las reglas de seguridad.** En **Firestore → Reglas**, borra lo que haya y pega el contenido de `firestore.rules`. Cambia los dos emails por los vuestros, en minúsculas, y pulsa **Publicar**.
6. **Copia la configuración.** Pulsa el engranaje → **Configuración del proyecto → General**. Abajo, en **Tus apps**, pulsa el icono `</>`, registra una app web llamada "Papillas" (sin Firebase Hosting) y copia el bloque `firebaseConfig`.
7. **Rellena `config.js`.** Abre el archivo y:
   - Pega esos valores en `FIREBASE_CONFIG`.
   - Pon vuestros emails y nombres en `PERSONAS`. Así el registro muestra quién apuntó cada toma.

> Los datos de `config.js` no son secretos: cualquier web con Firebase los expone. Lo que protege los datos son las reglas del paso 5.

## 2. Subirla a Vercel

**Opción A: con GitHub (recomendada, así cada cambio se publica solo)**
1. Crea un repositorio en GitHub (puede ser privado) y sube todos los archivos de esta carpeta.
2. En <https://vercel.com/new>, importa ese repositorio.
3. En **Framework Preset**, elige **Other**. No hace falta build command ni output directory. Pulsa **Deploy**.

**Opción B: desde el ordenador, sin GitHub**
```bash
cd cuaderno-papillas
npx vercel --prod
```
Responde a las preguntas con los valores por defecto.

Al terminar, Vercel te da una dirección del tipo `https://cuaderno-papillas.vercel.app`.

8. **Autoriza el dominio.** Vuelve a Firebase y entra en **Authentication → Configuración → Dominios autorizados → Agregar dominio**. Añade ese dominio de Vercel.

## 3. Instalarla en los móviles

Cada uno de vosotros:

1. Abre la dirección de Vercel en el navegador:
   - iPhone: **Safari**.
   - Android: **Chrome**.
2. Entra con vuestro email y contraseña. La sesión se queda guardada.
3. Añade el icono a la pantalla de inicio:
   - **iPhone:** botón Compartir → **Añadir a pantalla de inicio**.
   - **Android:** menú ⋮ → **Instalar aplicación** (o **Añadir a pantalla de inicio**).

Se abre a pantalla completa, con su icono, como una app normal.

La primera vez que alguien entra, la app carga sola la configuración del bebé (nacido el 29/01/2026, plan desde el 06/10/2026) y la lista de alimentos ya probados. Puedes cambiar la configuración en ⚙️ Ajustes.

---

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La app completa: recetas, registro, plan, evolución y alimentos |
| `config.js` | Tu configuración de Firebase y los nombres de cada uno (**tienes que rellenarlo**) |
| `firestore.rules` | Reglas de seguridad que se pegan en Firebase (**pon vuestros emails**) |
| `manifest.webmanifest`, `sw.js`, iconos | Lo que permite instalarla en el móvil y abrirla sin conexión |
| `vercel.json` | Evita que el móvil se quede con una versión vieja de la app |

## Cómo se guardan los datos en Firestore

| Colección | Contenido |
|---|---|
| `registros` | Una entrada por toma o deposición: `tipo`, `ts`, `dia`, `momento`, `ml`, `g`, `recetaId`, `acept`, `cons`, `notas`, `autor` |
| `alimentos` | Estado de cada alimento: `probado`, `prueba`, `pendiente` o `reaccion`, con fecha de inicio |
| `recetas` | Las recetas propias que añadáis desde la app |
| `lotes` | Lo que hay en el congelador y cuántas raciones quedan |
| `config/bebe` | Nombre, fecha de nacimiento e inicio del plan |

Puedes consultar y exportar todo desde la consola de Firebase, en **Firestore Database → Datos**.

## Problemas habituales

- **"Falta configurar Firebase"**: `config.js` sigue con los valores de ejemplo.
- **"Email o contraseña incorrectos"**: el usuario no está creado en Authentication, o la contraseña no coincide.
- **Entra, pero sale "Tu email no tiene acceso a los datos"**: el email no está en las reglas, o tiene alguna mayúscula. Revisa el paso 5.
- **No ves un cambio que acabas de publicar**: cierra la app del todo y vuelve a abrirla.
