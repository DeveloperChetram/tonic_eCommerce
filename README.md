# Nixies Assignment

Full-stack e-commerce demo with an Express API (`backend/`) and a React + Vite client (`frontend/`). The API serves product and cart data; the client consumes it through Redux-powered state management.




## Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+

## Quick Start
```bash
# from the repo root
cd backend && npm install
cd ../frontend && npm install
```

### 1. Start the API
```bash
cd backend
npm run dev              # nodemon
# or npm start           # plain node
```
- Default base URL: `http://localhost:3000`
- Routes are namespaced under `/api` (e.g. `/api/products`).

### 2. Start the client
```bash
cd frontend
cp .env.example .env     # if you have one, otherwise create .env
echo VITE_API_URL=http://localhost:3000/api >> .env
npm run dev              # Vite dev server (defaults to :5173)
```

### 3. Open the app
Visit the Vite URL printed in the terminal (usually http://localhost:5173). The client will call the backend via `VITE_API_URL`.

## Project Structure
```
backend/   Express server (products + cart routes)
frontend/  React 19 + Vite UI, Redux Toolkit store, Tailwind styles
```

## Useful Scripts
| Location  | Command        | Purpose                    |
|-----------|----------------|----------------------------|
| backend   | `npm run dev`  | Auto-reload API (nodemon)  |
| backend   | `npm start`    | Production-style server    |
| frontend  | `npm run dev`  | Vite dev server            |
| frontend  | `npm run build`| Production bundle          |
| frontend  | `npm run lint` | ESLint React/JS check      |

## Troubleshooting
- **CORS errors**: ensure the API is running on port 3000 or update `VITE_API_URL`.
- **Port conflicts**: change the backend `port` in `backend/server.js` and update the client env.
- **Slow mobile performance**: Lazy-load heavy media components and avoid autoplay videos on mobile devices.

You're now ready to iterate locally or deploy the backend (e.g., Render, Railway) and point the frontend’s `VITE_API_URL` to the hosted API.

