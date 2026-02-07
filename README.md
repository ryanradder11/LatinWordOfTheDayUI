# 🏛️ Latin Word of the Day — Front-End (Angular 19)

An elegant Angular 19 front-end that fetches and displays a new Latin word every day. Designed with simplicity, clarity, and classical aesthetics in mind.

---

## 🧭 Overview

This application serves as the user interface for the *Latin Word of the Day* API. It retrieves and presents a daily Latin word along with its meaning, part of speech, and example usage.

---

## 🧰 Tech Stack

- ⚙️ **Angular 19**
- 🎨 **SCSS** + **PrimeNG 19** + **PrimeFlex 4**
- 🔁 **RxJS** for reactive data handling
- 📦 **NgRx 19** for state management
- 🌐 **HTTPClient** for API calls
- ✅ **Jasmine/Karma** for unit testing
- 🚀 **Angular CLI** for streamlined dev experience

---

## 🔧 Setup & Installation

```bash
git clone https://github.com/ryanradder11/LatinWordOfTheDayUI.git
cd LatinWordOfTheDayUI/latinWordOfTheDay
npm install
```

## 🖥️ Local Development

```bash
npm start          # Angular dev server on http://localhost:4200
npm run dev        # Start backend + frontend together
npm test           # Run unit tests
```

Images are served locally from the backend's `src/static/img` directory via Angular asset config.

---

## 🚀 Deployment

The app is deployed to a server via Docker Compose from the backend repo. The frontend is built inside a Docker container and served by Apache httpd.

### Deploy steps

1. **Merge your PR** to `main` on GitHub

2. **SSH into the server** and pull the latest code:
   ```bash
   ssh latin
   cd /root/LatinWordOfTheDayUI
   git pull origin main
   ```

3. **Rebuild and restart** the web container from the backend repo:
   ```bash
   cd /root/latinWordOfTheDayBE
   docker compose up -d --build web
   ```

This builds the Angular app in a multi-stage Dockerfile (Node 20 Alpine → Apache httpd 2.4 Alpine), copies the build output to Apache's htdocs, and restarts the container.

### Server layout

| Path on server | Repo |
|---|---|
| `/root/LatinWordOfTheDayUI` | Front-end (this repo) |
| `/root/latinWordOfTheDayBE` | Back-end + Docker Compose orchestration |

The backend's `compose.yaml` references the frontend via `FE_BUILD_CONTEXT` (set in `.env` to `../LatinWordOfTheDayUI/latinWordOfTheDay`).

### Generating new words

New words and images are generated using the [latin-word-generator](https://github.com/ryanradder11/latin-word-generator) script. The workflow runs locally against the backend API, then deploys to production:

```bash
# 1. Start the local backend
cd ../latinWordOfTheDayBe && npm run dev

# 2. Generate words (in the generator repo)
cd ../generate-words
python generate_words.py generate --count 10

# 3. Deploy to production (copies images + uploads new words)
python generate_words.py deploy
```

See the [generator README](https://github.com/ryanradder11/latin-word-generator#readme) for full details on image sources and options.

### Production URL

https://latinwordoftheday.com
