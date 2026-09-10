# Lumina AI

Premium minimal-white multi-provider AI workspace for chat, thinking, research and code.

## Included
- Mistral, Groq, Cerebras, OpenAI and OpenRouter adapters
- Provider/model selector
- Chat, Thinking, Research and Code modes
- Encrypted server-side API-key storage using AES-256-GCM + HttpOnly cookie
- Local chat history
- Responsive desktop/mobile interface

## Run locally

```bash
npm install
cp .env.example .env.local
```

Set `APP_ENCRYPTION_KEY` to a long random secret, then run `npm run dev`.
Open `http://localhost:3000`, go to Settings, add at least one provider key, choose the provider/model, and start chatting.

## Security
Provider keys are not stored in browser localStorage. The browser posts them to `/api/keys`; the server encrypts them and stores the ciphertext in an HttpOnly, Secure, SameSite cookie. Never commit `.env.local` or real API keys.

For public production use, add authentication, persistent encrypted key storage, rate limiting, audit logging, CSRF/origin protection, and a managed database.
