<div align="center">

# 🎨 AI Excalidraw Design Agent

### Draw, Edit, and Modify Excalidraw Diagrams Using Natural Language

Built with **Cloudflare Agents**, **Vercel AI SDK**, **React**, and **Excalidraw**

<p>
  <img src="https://img.shields.io/badge/Cloudflare-Agents-F38020?style=for-the-badge&logo=cloudflare&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-AI%20SDK-black?style=for-the-badge&logo=vercel"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Excalidraw-6965DB?style=for-the-badge"/>
</p>

---

Transform plain English into beautiful diagrams.

*"Draw a login flow with a database."*

*"Make the API box green."*

*"Remove the cache layer."*

The AI understands your request and updates the Excalidraw canvas in real time.

</div>

---

# ✨ Features

- 🎨 Create diagrams from natural language
- ✏️ Edit existing diagrams
- 🗑 Delete diagram elements
- 🔍 Read the current canvas before modifying
- ⚡ Streaming AI responses
- 🤖 Tool-calling agent architecture
- 💬 Multi-turn conversations
- 🧠 Preserves existing diagrams while editing
- 📦 Built with Cloudflare Agents + AI SDK

---

---

# 🏗 Architecture

```text
                 User
                   │
                   ▼
            React Chat UI
                   │
                   ▼
        Cloudflare AI Agent
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
   OpenAI / AI SDK       Tool Calling
                               │
      ┌────────────────────────┼────────────────────────┐
      ▼                        ▼                        ▼
 queryCanvas()          addElements()          updateElements()
      │                        │                        │
      └────────────────────────┼────────────────────────┘
                               ▼
                       Excalidraw Canvas
```

---

# 🛠 Tools

The AI interacts with Excalidraw exclusively through tools.

| Tool | Description |
|------|-------------|
| `queryCanvas()` | Reads the current canvas |
| `addElements()` | Creates new shapes |
| `updateElements()` | Modifies existing elements |
| `removeElements()` | Deletes elements |

This keeps the model deterministic and prevents hallucinated canvas state.

---

# 💬 Example Prompts

```
Draw a red circle.
```

```
Create a system architecture for a React application.
```

```
Add a Redis cache between API and Database.
```

```
Move the database below the API.
```

```
Change the login box to green.
```

```
Remove the cache layer.
```

```
Connect every service using arrows.
```

---

# 📂 Project Structure

```text
src/
│
├── components/
│   ├── Canvas/
│   └── Chat/
│
├── agent/
│   ├── Tools/
│   ├── prompts/
│   ├── context/
│   └── streamAgent.ts
│
├── App.tsx
│
└── main.tsx
```

---

# 🚀 Getting Started

## Clone

```bash
git clone https://github.com/yourusername/excalidraw-ai-agent.git
```

---

## Install

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

```env
OPENAI_API_KEY=your_key
```

If using Cloudflare:

```env
CLOUDFLARE_API_TOKEN=...
```

---

## Start Development

```bash
npm run dev
```

---

# ⚙️ Tech Stack

- React
- TypeScript
- Excalidraw
- Cloudflare Agents
- Cloudflare Workers
- Vercel AI SDK
- OpenAI GPT Models
- Zod

---

# 🤖 How It Works

1. User sends a prompt.

2. The AI decides whether it needs to:

- read the canvas
- add elements
- modify elements
- delete elements

3. The browser executes the tool.

4. Excalidraw updates instantly.

5. The AI continues the conversation.

---

# 🧠 Example Agent Flow

```text
User
 │
 ▼
"Make the API green."

        ▼

AI
 │
 ├── queryCanvas()
 │
 ▼
Canvas Summary

 │
 ▼

AI
 │
 ├── updateElements()
 │
 ▼

Browser updates Excalidraw

 │
 ▼

```

---


- Multi-agent workflows

---

---

---

<div align="center">

Made with ❤️ using

**Cloudflare Agents • Vercel AI SDK • React • Excalidraw**

</div>
