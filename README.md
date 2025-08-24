# 📝 BlogVerse

   A modern **Full-Stack Blogging Platform** built with **React**, **Node.js**, **Express**, and **MongoDB**. Users can create, read, update, and delete blog posts. The platform supports authentication, random post cover images, 3D card effects, and interactive UI.

---

## 🚀 Features

### ✅ Completed

- 🏠 **Home Page**: Display all blog posts with **3D card effects**.
- ✏️ **Create Post**: Authenticated users can create new blog posts with **tags**.
- 🖼️ **Random Cover Images**: Each post card has a random image background if no user image is provided.
- 🔑 **Authentication**: Users can **Sign Up / Login / Logout**.
- 🖊️ **Post Details**: View individual posts with **Edit/Delete** options for authors.
- 📌 **Navigation Bar**: Sticky, responsive, shows links based on user login state.
- 🎨 **Responsive CSS**: Styled with 3D hover effects and interactive buttons.
- 🔀 **Random Colored Cards**: Each blog card gets a random background color and suitable text color.
- 🔗 **React Router**: Handles navigation between pages.
- 💾 **Save / Cancel Buttons**: Interactive buttons with hover effects.

---

### ⚡ Future Enhancements

- 👍 **Likes**: Users can like posts.
- 💬 **Comments**: Users can comment on posts.
- 🔄 **Share**: Share posts via social media.
- 🌐 **Profile Page**: User profile management.
- 🖼️ **Custom Image Upload**: Users can upload their own cover images.
- 🛡️ **Route Protection**: Prevent unauthenticated access to restricted pages.
- 📊 **Analytics Dashboard**: Post statistics and user engagement.

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Auth |
|----------|---------|---------|------|
| React.js | Node.js / Express | MongoDB Atlas | JWT |

**Other Libraries / Tools:**

- **axios** - HTTP client for API requests
- **react-router-dom** - Routing
- **lucide-react** - Icons
- **dotenv** - Environment variables
- **cors, morgan** - Backend middleware
- **nodemon** - Dev server auto-reload

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/blogverse.git
cd blogverse
```
### 2️⃣ Setup Backend
```bash
cd backend
npm install
```
Create a .env file:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```
Start backend server:
```
npm run dev
```

### 3️⃣ Setup Frontend
```
cd frontend
npm install
npm run dev
```
Open browser at http://localhost:5173.

---
## 📂 Project Structure [Sample]
```
frontend/
  ├─ src/
      ├─ pages/
          ├─ Home.jsx
          ├─ Login.jsx
          ├─ Signup.jsx
          ├─ CreatePost.jsx
          ├─ PostDetail.jsx
      ├─ components/
          ├─ Navbar.jsx
      ├─ api/
          ├─ api.js
      ├─ styles/
          ├─ Home.css
          ├─ Login.css
          ├─ Signup.css
          ├─ CreatePost.css
          ├─ PostDetail.css
backend/
  ├─ models/
      ├─ User.js
      ├─ Post.js
  ├─ routes/
      ├─ auth.js
      ├─ posts.js
  ├─ server.js
.env
```
---
## 📌 Usage

- Sign up a new account.

- Login to access Create Post.

- View all posts on the home page.

- Click a post to view details.

- Authors can Edit or Delete their own posts.
---

## 🎨 Styling & UI

- 3D hover effects on cards.

- Random card colors with proper text contrast.

- Interactive buttons with icons (✏️ Edit, 🗑️ Delete, 💾 Save, ❌ Cancel).

- Sticky navigation bar with login/logout logic.
---

## 📫 Contributing

Fork the repository.

Create a branch: git checkout -b feature-name.

Commit changes: git commit -m 'Add feature'.

Push to branch: git push origin feature-name.

Open a Pull Request.

---
## 👤 Author:

Laxmikant

---
## ⚖️ License

This project is MIT licensed.

---
