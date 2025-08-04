# 🧭 Reddit Client — Multi-Subreddit Lanes

A responsive, browser-based Reddit client built with **React**, **Vite**, and **Tailwind CSS**, supporting multiple subreddit lanes with dynamic fetching, localStorage persistence, mock fallback, dark mode, and more.

---

## 🚀 Features

- 🔎 **Add any subreddit** via input modal
- 🗂️ **Multiple lanes**, each showing a separate subreddit
- 🔄 Refresh posts per lane
- 🗑️ Delete individual lanes
- 💾 **Persistent lanes** using `localStorage`
- 🌗 **Dark mode** support
- ⚠️ **Mock data fallback** for 403 errors
- 🎹 **Keyboard accessible** modal (Esc / Enter)
- 🎨 Modern design with Tailwind + transitions

---

## 🚀 Live Demo

📍 **[View it here](https://nurf21.github.io/reddit-client/)**

---

## 📦 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Reddit JSON API: `https://api.reddit.com/r/{subreddit}.json`

---

## 🛠️ Installation

```bash
git clone https://github.com/nurf21/reddit-client.git
cd reddit-client
npm install
npm run dev
```

---

## 📁 Folder Structure

```
src/
│
├── components/
│   ├── AddSubredditModal.jsx
│   ├── SubredditLane.jsx
│
├── hooks/
│   └── useSubredditPosts.js
│
├── utils/
│   └── mockData.js
│
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🧪 TODOs / Ideas

- ⬇️ Infinite scroll or pagination
- 📱 Mobile gestures or swipe-to-delete
- 🧠 AI-powered subreddit suggestions
- 🎭 Authenticated Reddit API for comments & votes

---

## 🧑‍💻 Credits

- Project template and inspiration from [roadmap.sh](https://roadmap.sh/projects/reddit-client/)
- Reddit icons created by Md Tanvirul Haque from [Flaticon](https://www.flaticon.com/free-icons/reddit)

---

## 📝 License

[MIT](LICENSE)

---
