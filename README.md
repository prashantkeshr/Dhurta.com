# dhurta.com

Product showcase for the **Dhurta** family — served at [dhurta.com](https://dhurta.com).

> धूर्त · Sanskrit for "clever" — Trust · Technology · Culture
> **Sovereign · Privacy-Native · Yours**

## Products

1. **Dhurta Browser** — sovereign privacy browser: Ghost Mode (real Tor), Chakra Shield, Omni self-audit dashboard, fail-closed kill switch, zero telemetry.
2. **Dhurta Connect** — zero-server end-to-end encrypted P2P chat, calls and file sharing.
3. **Dhurta Setu** — curated web index and first-party search.

## Stack

Vite · React 19 · TypeScript · React Three Fiber + drei (3D hero) · Framer Motion (scroll-driven animation). Builds to fully static output.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages. `public/CNAME` pins the custom domain `dhurta.com`.

## Links

- Group site: [dhurta.org](https://dhurta.org)
- Browser source: [github.com/prashantkeshr/Dhurta](https://github.com/prashantkeshr/Dhurta)
- Downloads: [Releases](https://github.com/prashantkeshr/Dhurta/releases)
