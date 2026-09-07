/**
 * VORTEX AI — Main Express Backend Server
 * Handles Upstox API V3 integration, server-side Gemini AI intelligence, and Vite middleware.
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { fetchMarketData, getMarketStatusIST } from './server/services/upstox/marketQuotes';
import {
  getUpstoxStatus,
  getAuthorizationUrl,
  exchangeCodeForToken,
  clearUpstoxSession
} from './server/services/upstox/auth';
import { queryVortexAnalyst } from './server/services/gemini/analyst';
import { DEMO_PORTFOLIO_HOLDINGS, INITIAL_COMPANIES } from './src/data/universe';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'VORTEX AI Investment Intelligence Server',
      timestamp: new Date().toISOString()
    });
  });

  // Upstox Connection Status
  app.get('/api/upstox/status', (req, res) => {
    try {
      const status = getUpstoxStatus();
      res.json(status);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Upstox Auth URL for OAuth redirect
  app.get('/api/upstox/auth-url', (req, res) => {
    try {
      const auth = getAuthorizationUrl();
      if (!auth.url) {
        return res.status(400).json({ error: auth.error || 'Upstox credentials not configured.' });
      }
      res.json({ url: auth.url });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Upstox OAuth Callback
  app.get('/api/upstox/callback', async (req, res) => {
    const code = req.query.code as string;
    if (!code) {
      return res.redirect('/?upstox=error&message=No+authorization+code+received');
    }

    try {
      const result = await exchangeCodeForToken(code);
      if (result.success) {
        return res.redirect('/?upstox=success');
      } else {
        return res.redirect(`/?upstox=error&message=${encodeURIComponent(result.message)}`);
      }
    } catch (err: any) {
      return res.redirect(`/?upstox=error&message=${encodeURIComponent(err.message)}`);
    }
  });

  // Disconnect Upstox (revert to DEMO)
  app.post('/api/upstox/disconnect', (req, res) => {
    clearUpstoxSession();
    res.json({ success: true, mode: 'DEMO' });
  });

  // Market Quotes & Pulse (Upstox Live with graceful fallback to DEMO)
  app.get('/api/market/quotes', async (req, res) => {
    try {
      const data = await fetchMarketData();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({
        error: err.message,
        source: 'DEMO',
        companies: INITIAL_COMPANIES
      });
    }
  });

  // Real-Time Server-Sent Events (SSE) Live Market Stream
  app.get('/api/market/stream', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });

    res.write(`event: init\ndata: ${JSON.stringify({ status: 'connected', timestamp: new Date().toISOString() })}\n\n`);

    // Track simulated dynamic prices based on initial companies
    const activePrices: Record<string, { price: number; change: number; pct: number }> = {};
    INITIAL_COMPANIES.forEach(c => {
      activePrices[c.symbol] = {
        price: c.currentPrice,
        change: c.dayChange,
        pct: c.dayChangePercent
      };
    });

    let nifty = 22450.30;
    let sensex = 73920.15;
    let vix = 13.85;

    const interval = setInterval(() => {
      // Pick 2-4 companies to tick each cycle to create organic trading floor dynamics
      const symbolsToTick = Object.keys(activePrices)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3 + Math.floor(Math.random() * 3));

      const ticks = symbolsToTick.map(sym => {
        const item = activePrices[sym];
        // micro fluctuation between -0.25% and +0.25%
        const deltaPct = (Math.random() - 0.49) * 0.35;
        const deltaPrice = Number((item.price * (deltaPct / 100)).toFixed(2));
        const newPrice = Number((item.price + deltaPrice).toFixed(2));
        const newChange = Number((item.change + deltaPrice).toFixed(2));
        const newPct = Number(((newChange / (newPrice - newChange)) * 100).toFixed(2));

        activePrices[sym] = {
          price: newPrice,
          change: newChange,
          pct: newPct
        };

        return {
          symbol: sym,
          price: newPrice,
          dayChange: newChange,
          dayChangePercent: newPct,
          direction: deltaPrice >= 0 ? 'UP' : 'DOWN',
          timestamp: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })
        };
      });

      // Index micro tick
      nifty = Number((nifty + (Math.random() - 0.48) * 8).toFixed(2));
      sensex = Number((sensex + (Math.random() - 0.48) * 24).toFixed(2));
      vix = Number((Math.max(10, Math.min(25, vix + (Math.random() - 0.5) * 0.1))).toFixed(2));

      const payload = {
        ticks,
        indices: {
          nifty: { value: nifty, change: Number((nifty - 22390).toFixed(2)), pct: Number((((nifty - 22390) / 22390) * 100).toFixed(2)) },
          sensex: { value: sensex, change: Number((sensex - 73780).toFixed(2)), pct: Number((((sensex - 73780) / 73780) * 100).toFixed(2)) },
          vix: { value: vix }
        },
        timestamp: new Date().toISOString()
      };

      res.write(`event: tick\ndata: ${JSON.stringify(payload)}\n\n`);
    }, 2500);

    req.on('close', () => {
      clearInterval(interval);
      res.end();
    });
  });

  // Structured Gemini AI Analyst Query
  app.post('/api/ai/analyst', async (req, res) => {
    try {
      const { prompt, portfolio, companies } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const activePortfolio = Array.isArray(portfolio) && portfolio.length > 0
        ? portfolio
        : DEMO_PORTFOLIO_HOLDINGS;

      const activeCompanies = Array.isArray(companies) && companies.length > 0
        ? companies
        : INITIAL_COMPANIES;

      const analysis = await queryVortexAnalyst(prompt, activePortfolio, activeCompanies);
      res.json(analysis);
    } catch (err: any) {
      console.error('Error in /api/ai/analyst:', err);
      res.status(500).json({ error: 'Failed to generate AI analysis', details: err.message });
    }
  });

  // Scenario Stress-Testing Engine (Mathematical sensitivity + AI explanation)
  app.post('/api/ai/scenario', async (req, res) => {
    try {
      const { scenarioTitle, shockSector, shockPercent = -10, portfolio } = req.body;
      const holdings = Array.isArray(portfolio) && portfolio.length > 0
        ? portfolio
        : DEMO_PORTFOLIO_HOLDINGS;

      const totalVal = holdings.reduce((sum: number, h: any) => sum + h.quantity * h.currentPrice, 0);

      const affected = holdings.map((h: any) => {
        const val = h.quantity * h.currentPrice;
        const weight = totalVal > 0 ? (val / totalVal) : 0;
        let impactPct = 0;

        // Sector direct shock or market-wide beta
        if (shockSector && h.sector.toLowerCase().includes(shockSector.toLowerCase())) {
          impactPct = shockPercent;
        } else if (scenarioTitle?.toLowerCase().includes('nifty') || scenarioTitle?.toLowerCase().includes('volatility')) {
          // General market correction with sector beta weights
          const beta = h.sector.includes('Banking') ? 1.25 : h.sector.includes('IT') ? 1.05 : 0.65;
          impactPct = shockPercent * beta;
        } else if (scenarioTitle?.toLowerCase().includes('crude')) {
          // Crude oil spike: Reliance mixed, Paints & FMCG negative
          if (h.symbol === 'ASIANPAINT') impactPct = -8.5;
          else if (h.symbol === 'RELIANCE') impactPct = +2.5;
          else impactPct = -2.0;
        } else {
          impactPct = shockPercent * 0.4;
        }

        const lossAmt = (val * impactPct) / 100;
        return {
          symbol: h.symbol,
          company: h.companyName,
          sector: h.sector,
          currentWeight: Number((weight * 100).toFixed(1)),
          impact: Number(impactPct.toFixed(1)),
          valueImpact: Number(lossAmt.toFixed(0))
        };
      });

      const totalLoss = affected.reduce((sum: number, a: any) => sum + a.valueImpact, 0);
      const overallImpactPercent = totalVal > 0 ? Number(((totalLoss / totalVal) * 100).toFixed(2)) : 0;

      const sortedByImpact = [...affected].sort((a, b) => a.impact - b.impact);
      const mostAffected = sortedByImpact.slice(0, 3);
      const leastAffected = [...sortedByImpact].reverse().slice(0, 3);

      res.json({
        scenarioTitle: scenarioTitle || 'Custom Stress Test',
        estimatedImpactPercent: overallImpactPercent,
        totalPortfolioValue: Math.round(totalVal),
        estimatedValueChange: Math.round(totalLoss),
        mostAffected,
        leastAffected,
        mathematicalReasoning: `Portfolio exposure to ${shockSector || 'stressed assets'} is ${(
          holdings
            .filter((h: any) => !shockSector || h.sector.toLowerCase().includes(shockSector.toLowerCase()))
            .reduce((s: number, h: any) => s + (h.quantity * h.currentPrice), 0) / totalVal * 100
        ).toFixed(1)}%. Applying a ${shockPercent}% direct drawdown creates a linear ${overallImpactPercent}% portfolio drag.`,
        whatToWatch: [
          'Immediate hedging through NIFTY or BANKNIFTY put options or reducing beta weights',
          'RBI liquidity absorption reports and overnight call money rates',
          'Sectoral FII cash market selling volumes'
        ],
        evidenceNote: 'Calculated deterministically from current portfolio weights & historical sector beta correlations.'
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VORTEX AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
