
# 📱 Rick and Morty App - Ionic + Angular + Firebase

Esta es una aplicación móvil desarrollada con **Ionic Framework**, **Angular** y **Firebase Firestore**, que consume la [API pública de Rick and Morty](https://rickandmortyapi.com/). Permite ver personajes, navegar en sus detalles y agregar comentarios persistentes a través de una base de datos.

---

## 🚀 Tecnologías utilizadas

- **Ionic Framework** (v7+)
- **Angular** (v15+)
- **Firebase Firestore**
- **Capacitor**
- **API REST Rick and Morty**

---

## 🧩 Funcionalidades

- ✅ Listado de personajes obtenidos desde la API.
- ✅ Visualización detallada de cada personaje.
- ✅ Añadir y visualizar comentarios persistentes asociados a cada personaje.
- ✅ Persistencia en Firebase Firestore.
- ✅ Compatible con Android (vía Capacitor).

---

## 🖼️ Capturas de pantalla

A continuación se muestran evidencias visuales del funcionamiento de la aplicación:

### 📍 Lista de personajes  
![IMG-20250522-WA0032](https://github.com/user-attachments/assets/1387e0f9-fbe8-47ce-9406-fb4081dc4eeb)
![IMG-20250522-WA0028](https://github.com/user-attachments/assets/e193cbe4-24bb-4f6e-b0c7-62aa98bcc22d)


### 🔎 Busqueda
![IMG-20250522-WA0029](https://github.com/user-attachments/assets/1da34494-cd5a-4889-a4e7-a7b5a8df3cd2)


### 🧠 Detalle del personaje  
![IMG-20250522-WA0034](https://github.com/user-attachments/assets/9fa4fb72-0291-4c92-94af-5e9480ddb576)


### 💬 Comentarios agregados  
![IMG-20250522-WA0033](https://github.com/user-attachments/assets/94e3f1a2-1192-4822-96b2-fac605f6844f)
![IMG-20250522-WA0031](https://github.com/user-attachments/assets/72dbeed9-52d6-4016-a3c9-e5f4803a6629)
![IMG-20250522-WA0030](https://github.com/user-attachments/assets/17ed71e2-8ad8-4717-8c4b-bf9177bb0ffe)


---

## ⚙️ Instalación y ejecución

1. Clona este repositorio:

```bash
git clone https://github.com/tuusuario/rickandmorty-app.git
cd rickandmorty-app
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta en navegador:

```bash
ionic serve
```

4. Para compilar y abrir en Android Studio:

```bash
ionic build
npx cap copy android
npx cap open android
```

---

## 🗄️ Estructura del proyecto

```
├── src/
│   ├── app/
│   │   ├── home/
│   │   ├── details/
│   ├── environments/
│   ├── index.html
│   └── main.ts
├── android/
├── capacitor.config.ts
├── README.md
```

---

## 🛠️ Configuración de Firebase

Configura tu archivo `environment.ts` con la configuración de tu proyecto Firebase:

```ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
  }
};
```

---

## ✍️ Autor

**Isaac Quinapallo**  
**Desarrollador de Software
