// 1) Pega aquí la configuración de tu proyecto de Firebase
//    (Firebase → Configuración del proyecto → Tus apps → App web → "Configuración del SDK" → Config).
//    Estos datos no son secretos: la seguridad la ponen las reglas de Firestore.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyCvNt2MQeDPYMCquegsY_Q0Zw_Q322X3pk",
  authDomain: "cuaderno-papillas.firebaseapp.com",
  projectId: "cuaderno-papillas",
  storageBucket: "cuaderno-papillas.firebasestorage.app",
  messagingSenderId: "732422797829",
  appId: "1:732422797829:web:148f2d1646446be8a6fa6c"
};

// 2) Nombres que se muestran en el registro ("apuntado por ...").
//    Usa los mismos emails con los que crees los usuarios en Firebase, en minúsculas.
window.PERSONAS = {
  "mario.ginel@gmail.com": "Papá",
  "laura.setienvalero@gmail.com": "Mamá"
};
