# Portfolio — Next.js 14 Setup

## Commands to run on your machine

```powershell
cd C:\dev\projects

# 1. Create Next.js app
pnpm create next-app@latest portfolio --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
cd portfolio

# 2. Install extra deps
pnpm add lucide-react
pnpm add -D @types/node

# 3. Replace all generated files with the ones in this folder
# (copy everything from this zip into the portfolio folder)

# 4. Run dev
pnpm dev
# Visit http://localhost:3000

# 5. Deploy to Vercel
# Push to GitHub → vercel.com/new → import repo → Deploy
```
