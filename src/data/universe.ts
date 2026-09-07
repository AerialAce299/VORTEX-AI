import { Company, InvestmentThesis, AlertItem, WhatChangedEvent, PortfolioHolding, ScenarioItem } from '../types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'reliance',
    name: 'Reliance Industries Limited',
    symbol: 'RELIANCE',
    exchange: 'NSE',
    sector: 'Energy / Conglomerate',
    isin: 'INE002A01018',
    instrument_key: 'NSE_EQ|INE002A01018',
    currentPrice: 2984.50,
    previousClose: 2962.10,
    dayChange: 22.40,
    dayChangePercent: 0.76,
    volume: 6420500,
    fiftyTwoWeekHigh: 3217.90,
    fiftyTwoWeekLow: 2220.30,
    marketCapCr: 2018500,
    peRatio: 28.4,
    dividendYield: 0.35,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'India’s largest conglomerate with market leadership in Oil-to-Chemicals (O2C), telecom (Jio), retail (Reliance Retail), and expanding presence in new green energy gigafactories.',
    keyDrivers: [
      'Jio ARPU expansion and 5G subscriber monetisation',
      'Retail square-footage ramp-up and omnichannel margin expansion',
      'Refining crack spreads and petrochemical margin recovery',
      'New Energy solar/battery giga-complex operationalisation in Jamnagar'
    ],
    risks: [
      'Volatility in Singapore GRMs (Gross Refining Margins)',
      'Substantial ongoing capex delaying free cash flow inflection',
      'Regulatory shifts in windfall tax or domestic gas pricing caps'
    ],
    catalysts: [
      'Potential separate listing or IPO of Jio Platforms and Reliance Retail',
      'Commercial rollout of green hydrogen electrolyser plant'
    ],
    recentDevelopments: [
      'Announced accelerated deployment of enterprise AI cloud infrastructure powered by domestic data centres.',
      'Refining margin expanded 60 bps quarter-over-quarter despite global crude volatility.'
    ],
    thesisHealthScore: 84,
    historicalPoints: [
      { date: '2025-01-02', price: 2890, volume: 5100000 },
      { date: '2025-01-16', price: 2920, volume: 6200000 },
      { date: '2025-02-01', price: 2875, volume: 7100000 },
      { date: '2025-02-15', price: 2940, volume: 5800000 },
      { date: '2025-03-01', price: 2984.50, volume: 6420500 }
    ]
  },
  {
    id: 'hdfcbank',
    name: 'HDFC Bank Limited',
    symbol: 'HDFCBANK',
    exchange: 'NSE',
    sector: 'Banking',
    isin: 'INE040A01034',
    instrument_key: 'NSE_EQ|INE040A01034',
    currentPrice: 1742.30,
    previousClose: 1758.80,
    dayChange: -16.50,
    dayChangePercent: -0.94,
    volume: 14820000,
    fiftyTwoWeekHigh: 1794.00,
    fiftyTwoWeekLow: 1363.55,
    marketCapCr: 1324800,
    peRatio: 19.2,
    dividendYield: 1.12,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'India’s premier private sector bank post-merger with parent HDFC Ltd, commanding unmatched branch footprint, retail deposit franchise, and wholesale banking penetration.',
    keyDrivers: [
      'Credit-to-Deposit (LDR) normalisation down towards ~85%',
      'Net Interest Margin (NIM) stability in a neutral-to-softening rate cycle',
      'Cross-selling mortgage loans to the 90M+ banking customer base',
      'Branch vintage maturity driving operating leverage'
    ],
    risks: [
      'Elevated deposit competition keeping cost of funds stubbornly sticky',
      'Post-merger transition frictions in liability gathering',
      'Slower retail loan growth due to deliberate liquidity calibration'
    ],
    catalysts: [
      'Reaching sub-85% LDR milestone triggering re-acceleration in loan growth',
      'MSCI weight increase tranches boosting foreign institutional inflows'
    ],
    recentDevelopments: [
      'Deposit growth outpaced credit growth by 380 bps in recent operational update, steadily improving loan-to-deposit ratio.',
      'Net NPA remained best-in-class at 0.33% with PCR at 74%.'
    ],
    thesisHealthScore: 78,
    historicalPoints: [
      { date: '2025-01-02', price: 1680, volume: 13000000 },
      { date: '2025-01-16', price: 1715, volume: 15400000 },
      { date: '2025-02-01', price: 1730, volume: 16100000 },
      { date: '2025-02-15', price: 1765, volume: 14200000 },
      { date: '2025-03-01', price: 1742.30, volume: 14820000 }
    ]
  },
  {
    id: 'icicibank',
    name: 'ICICI Bank Limited',
    symbol: 'ICICIBANK',
    exchange: 'NSE',
    sector: 'Banking',
    isin: 'INE090A01021',
    instrument_key: 'NSE_EQ|INE090A01021',
    currentPrice: 1288.60,
    previousClose: 1279.40,
    dayChange: 9.20,
    dayChangePercent: 0.72,
    volume: 11200000,
    fiftyTwoWeekHigh: 1342.00,
    fiftyTwoWeekLow: 980.00,
    marketCapCr: 908500,
    peRatio: 18.1,
    dividendYield: 0.85,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'Leading private full-service universal bank recognized for superior return on assets (RoA > 2.3%), digital underwriting, and balanced loan portfolio.',
    keyDrivers: [
      'Industry-leading Return on Equity (RoE > 18%)',
      'High CASA ratio sustaining benign funding costs',
      'Granular SME and business banking loan book expansion',
      'Digital platform dominance through iMobile Pay'
    ],
    risks: [
      'System-wide margin compression as monetary policy rates soften',
      'Unsecured credit card slippages across industry retail borrowers'
    ],
    catalysts: [
      'Sustained RoA outperformance justifying valuation premium over peers',
      'Continued market share gains in corporate supply chain financing'
    ],
    recentDevelopments: [
      'Core operating profit surged 14% YoY backed by robust fee income growth and disciplined cost-to-income control.'
    ],
    thesisHealthScore: 89,
    historicalPoints: [
      { date: '2025-01-02', price: 1220, volume: 10500000 },
      { date: '2025-01-16', price: 1250, volume: 11900000 },
      { date: '2025-02-01', price: 1265, volume: 12100000 },
      { date: '2025-02-15', price: 1275, volume: 10800000 },
      { date: '2025-03-01', price: 1288.60, volume: 11200000 }
    ]
  },
  {
    id: 'sbin',
    name: 'State Bank of India',
    symbol: 'SBIN',
    exchange: 'NSE',
    sector: 'Banking',
    isin: 'INE062A01020',
    instrument_key: 'NSE_EQ|INE062A01020',
    currentPrice: 812.40,
    previousClose: 818.10,
    dayChange: -5.70,
    dayChangePercent: -0.70,
    volume: 18450000,
    fiftyTwoWeekHigh: 912.00,
    fiftyTwoWeekLow: 600.65,
    marketCapCr: 725400,
    peRatio: 10.4,
    dividendYield: 1.70,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'India’s largest commercial lender and public sector bellwether, accounting for over one-fifth of the nation’s banking assets and prime beneficiary of infrastructure credit cycles.',
    keyDrivers: [
      'Government capex transmission into corporate loan disbursement',
      'Superior liability franchise with nationwide public trust',
      'YONO app digital onboarding and cross-sell penetration',
      'Lowest credit cost cycle in over two decades'
    ],
    risks: [
      'Public sector wage revisions and pension provisions impact on opex',
      'Treasury mark-to-market yield movements'
    ],
    catalysts: [
      'Potential partial stake monetization of AMC and general insurance subsidiaries',
      'Sustained Return on Assets above 1.05%'
    ],
    recentDevelopments: [
      'Gross NPA declined to 2.13%, lowest in 10 years; management guided for 14-16% credit growth in FY26.'
    ],
    thesisHealthScore: 82,
    historicalPoints: [
      { date: '2025-01-02', price: 785, volume: 16000000 },
      { date: '2025-01-16', price: 805, volume: 17200000 },
      { date: '2025-02-01', price: 830, volume: 22000000 },
      { date: '2025-02-15', price: 820, volume: 15400000 },
      { date: '2025-03-01', price: 812.40, volume: 18450000 }
    ]
  },
  {
    id: 'tcs',
    name: 'Tata Consultancy Services Limited',
    symbol: 'TCS',
    exchange: 'NSE',
    sector: 'Information Technology',
    isin: 'INE467B01029',
    instrument_key: 'NSE_EQ|INE467B01029',
    currentPrice: 4120.00,
    previousClose: 4095.50,
    dayChange: 24.50,
    dayChangePercent: 0.60,
    volume: 2150000,
    fiftyTwoWeekHigh: 4592.25,
    fiftyTwoWeekLow: 3740.00,
    marketCapCr: 1490200,
    peRatio: 29.8,
    dividendYield: 1.45,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'Global leader in IT services, consulting and business solutions with industry-benchmark operating margins (25-26%), deep Fortune 500 relationships, and mega-deal execution.',
    keyDrivers: [
      'Discretionary tech spend recovery in North American BFSI and retail',
      'Generative AI enterprise rollout and application modernisation pipeline',
      'Mega contract ramp-ups in UK and continental Europe'
    ],
    risks: [
      'Extended enterprise decision cycles in US banking clients',
      'Forex volatility against USD, GBP, and EUR'
    ],
    catalysts: [
      'Large deal total contract value (TCV) hitting $10B+ run-rate per quarter',
      'Margin expansion back to historical 26-28% upper bound'
    ],
    recentDevelopments: [
      'Secured $1.2B 7-year multi-cloud transformation agreement with leading Nordic healthcare provider.'
    ],
    thesisHealthScore: 81,
    historicalPoints: [
      { date: '2025-01-02', price: 3950, volume: 1900000 },
      { date: '2025-01-16', price: 4040, volume: 2400000 },
      { date: '2025-02-01', price: 4150, volume: 2600000 },
      { date: '2025-02-15', price: 4080, volume: 2050000 },
      { date: '2025-03-01', price: 4120.00, volume: 2150000 }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys Limited',
    symbol: 'INFY',
    exchange: 'NSE',
    sector: 'Information Technology',
    isin: 'INE009A01021',
    instrument_key: 'NSE_EQ|INE009A01021',
    currentPrice: 1876.50,
    previousClose: 1894.00,
    dayChange: -17.50,
    dayChangePercent: -0.92,
    volume: 5320000,
    fiftyTwoWeekHigh: 1991.45,
    fiftyTwoWeekLow: 1358.35,
    marketCapCr: 778900,
    peRatio: 28.1,
    dividendYield: 2.10,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'Global IT major recognized for agile software engineering, Topaz AI suite, Cobalt cloud platform, and strong capital return track record.',
    keyDrivers: [
      'Infosys Topaz Generative AI client onboarding velocity',
      'Net new large deal TCV conversion',
      'Margin expansion program via pyramid optimization and automation'
    ],
    risks: [
      'Client insourcing or project scope reductions in discretionary engineering',
      'Senior leadership attrition in key geography clusters'
    ],
    catalysts: [
      'Upward revision in constant-currency FY revenue guidance',
      'Special dividend announcement or share buyback completion'
    ],
    recentDevelopments: [
      'Expanded strategic collaboration with NVIDIA to develop AI telecommunication blueprints.'
    ],
    thesisHealthScore: 76,
    historicalPoints: [
      { date: '2025-01-02', price: 1820, volume: 4800000 },
      { date: '2025-01-16', price: 1860, volume: 5600000 },
      { date: '2025-02-01', price: 1910, volume: 6200000 },
      { date: '2025-02-15', price: 1890, volume: 5100000 },
      { date: '2025-03-01', price: 1876.50, volume: 5320000 }
    ]
  },
  {
    id: 'bhartiartl',
    name: 'Bharti Airtel Limited',
    symbol: 'BHARTIARTL',
    exchange: 'NSE',
    sector: 'Telecom',
    isin: 'INE397D01024',
    instrument_key: 'NSE_EQ|INE397D01024',
    currentPrice: 1684.20,
    previousClose: 1658.90,
    dayChange: 25.30,
    dayChangePercent: 1.53,
    volume: 6890000,
    fiftyTwoWeekHigh: 1779.00,
    fiftyTwoWeekLow: 1150.00,
    marketCapCr: 985600,
    peRatio: 44.5,
    dividendYield: 0.52,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'Leading telecommunications service provider operating across India and 14 African nations, boasting top industry ARPU, premium postpaid base, and robust B2B enterprise business (Airtel Business).',
    keyDrivers: [
      'India mobile ARPU trajectory towards targeted ₹250–300 range',
      'Homes broadband (FTTH) and DTH convergence penetration',
      'Airtel Africa FX stabilization and local currency cash flow',
      'Airtel IQ enterprise CPaaS and cloud security growth'
    ],
    risks: [
      'Prolonged tariff hike deferrals in competitive duopoly dynamics',
      'Currency devaluation headwinds in Nigerian Naira and East African shillings'
    ],
    catalysts: [
      'Next round of pan-industry mobile tariff hikes of 15-20%',
      'Pre-payment of statutory AGR / spectrum dues reducing net debt'
    ],
    recentDevelopments: [
      'Average Revenue Per User (ARPU) reached ₹233, leading the Indian telecom sector by an 18% margin over nearest competitor.'
    ],
    thesisHealthScore: 91,
    historicalPoints: [
      { date: '2025-01-02', price: 1580, volume: 5800000 },
      { date: '2025-01-16', price: 1620, volume: 6400000 },
      { date: '2025-02-01', price: 1645, volume: 7100000 },
      { date: '2025-02-15', price: 1660, volume: 6300000 },
      { date: '2025-03-01', price: 1684.20, volume: 6890000 }
    ]
  },
  {
    id: 'itc',
    name: 'ITC Limited',
    symbol: 'ITC',
    exchange: 'NSE',
    sector: 'FMCG / Consumer',
    isin: 'INE154A01025',
    instrument_key: 'NSE_EQ|INE154A01025',
    currentPrice: 472.80,
    previousClose: 468.20,
    dayChange: 4.60,
    dayChangePercent: 0.98,
    volume: 12400000,
    fiftyTwoWeekHigh: 528.50,
    fiftyTwoWeekLow: 399.30,
    marketCapCr: 591200,
    peRatio: 27.8,
    dividendYield: 3.15,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'Diversified consumer titan with dominant cigarette market share (~75%), rapidly scaling non-cigarette FMCG brands (Aashirvaad, Sunfeast, Bingo), Agri-business, and Paperboards.',
    keyDrivers: [
      'Stable tax and excise duty regime on legal cigarettes',
      'Non-cigarette FMCG segment EBITDA margin expansion past 11%',
      'Demerger and listing of ITC Hotels unlocking capital efficiency',
      'Agri-commodities export value-addition'
    ],
    risks: [
      'Unscheduled increase in National Calamity Contingent Duty (NCCD) or GST on tobacco',
      'Raw material inflation in wheat, edible oils, and packaging paper'
    ],
    catalysts: [
      'Listing of ITC Hotels entity creating independent shareholder value',
      'Accelerating rural consumption revival boosting packaged foods volume'
    ],
    recentDevelopments: [
      'Shareholders and NCLT approved the demerger scheme of the Hotels business; final listing formalities on track.'
    ],
    thesisHealthScore: 85,
    historicalPoints: [
      { date: '2025-01-02', price: 462, volume: 11000000 },
      { date: '2025-01-16', price: 470, volume: 13200000 },
      { date: '2025-02-01', price: 465, volume: 14500000 },
      { date: '2025-02-15', price: 469, volume: 11800000 },
      { date: '2025-03-01', price: 472.80, volume: 12400000 }
    ]
  },
  {
    id: 'lt',
    name: 'Larsen & Toubro Limited',
    symbol: 'LT',
    exchange: 'NSE',
    sector: 'Infrastructure / Engineering',
    isin: 'INE018A01030',
    instrument_key: 'NSE_EQ|INE018A01030',
    currentPrice: 3640.00,
    previousClose: 3612.40,
    dayChange: 27.60,
    dayChangePercent: 0.76,
    volume: 2780000,
    fiftyTwoWeekHigh: 3948.60,
    fiftyTwoWeekLow: 3200.00,
    marketCapCr: 500400,
    peRatio: 33.2,
    dividendYield: 0.92,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'India’s premier EPC engineering and manufacturing conglomerate, with world-class capability in transportation, power transmission, defence systems, hydrocarbons, and green hydrogen infrastructure.',
    keyDrivers: [
      'All-time high consolidated order book exceeding ₹5.1 Lakh Crore',
      'Middle East hydrocarbon and energy transition capex orders',
      'Domestic public infrastructure awards (high-speed rail, metro, expressway networks)',
      'Legacy fixed-price project completion restoring core core EPC margins to 8.5%+'
    ],
    risks: [
      'Execution bottlenecks in high-temperature Middle East pipeline projects',
      'Working capital cycle elongation during high order intake phases'
    ],
    catalysts: [
      'International order inflow announcements from Saudi Aramco and ADNOC',
      'Domestic railway and defense manufacturing order announcements'
    ],
    recentDevelopments: [
      'Hydrocarbon business secured mega order from international client valued between ₹10,000 Cr to ₹15,000 Cr.'
    ],
    thesisHealthScore: 88,
    historicalPoints: [
      { date: '2025-01-02', price: 3510, volume: 2200000 },
      { date: '2025-01-16', price: 3580, volume: 2900000 },
      { date: '2025-02-01', price: 3650, volume: 3100000 },
      { date: '2025-02-15', price: 3610, volume: 2400000 },
      { date: '2025-03-01', price: 3640.00, volume: 2780000 }
    ]
  },
  {
    id: 'tatamotors',
    name: 'Tata Motors Limited',
    symbol: 'TATAMOTORS',
    exchange: 'NSE',
    sector: 'Automotive',
    isin: 'INE155A01022',
    instrument_key: 'NSE_EQ|INE155A01022',
    currentPrice: 835.60,
    previousClose: 852.00,
    dayChange: -16.40,
    dayChangePercent: -1.92,
    volume: 9800000,
    fiftyTwoWeekHigh: 1179.05,
    fiftyTwoWeekLow: 750.00,
    marketCapCr: 307200,
    peRatio: 9.8,
    dividendYield: 0.72,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'Global automotive manufacturer leading Indian passenger electric vehicles (EVs) with ~70% market share, commercial vehicles, and luxury automaker Jaguar Land Rover (JLR).',
    keyDrivers: [
      'JLR Range Rover, Defender, and Discovery order backlog and EBIT margin > 8.5%',
      'Commercial vehicle freight demand and replacement cycle recovery',
      'Acti.ev dedicated EV architecture launches (Curvv EV, Harrier EV)',
      'Net auto debt reduction to zero'
    ],
    risks: [
      'European automotive demand softness and tariff uncertainties',
      'Increased discounts in UK and US luxury retail channels',
      'Domestic passenger vehicle industry inventory buildup'
    ],
    catalysts: [
      'Demerger of Commercial Vehicles and Passenger Vehicles into two separate listed entities',
      'First deliveries of Range Rover Electric'
    ],
    recentDevelopments: [
      'JLR order book stood at 145,000 units with Defender and Range Rover representing 68% of total client orders.'
    ],
    thesisHealthScore: 71,
    historicalPoints: [
      { date: '2025-01-02', price: 880, volume: 11000000 },
      { date: '2025-01-16', price: 865, volume: 10200000 },
      { date: '2025-02-01', price: 850, volume: 12500000 },
      { date: '2025-02-15', price: 840, volume: 9400000 },
      { date: '2025-03-01', price: 835.60, volume: 9800000 }
    ]
  },
  {
    id: 'mm',
    name: 'Mahindra & Mahindra Limited',
    symbol: 'M&M',
    exchange: 'NSE',
    sector: 'Automotive',
    isin: 'INE101A01026',
    instrument_key: 'NSE_EQ|INE101A01026',
    currentPrice: 2845.00,
    previousClose: 2810.00,
    dayChange: 35.00,
    dayChangePercent: 1.25,
    volume: 3820000,
    fiftyTwoWeekHigh: 3222.00,
    fiftyTwoWeekLow: 1800.00,
    marketCapCr: 353800,
    peRatio: 26.5,
    dividendYield: 0.74,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'Indian automotive and farm equipment pioneer commanding overwhelming leadership in utility vehicles (Scorpio-N, XUV700, Thar) and holding over 41% tractor market share.',
    keyDrivers: [
      'SUV portfolio order backlog sustaining double-digit sales volume growth',
      'Normal monsoon outlook boosting farm equipment and rural tractor demand',
      'Born Electric (BE.05 / XEV 9e) EV portfolio commercial rollout',
      'Return on Equity targets sustained above 18%'
    ],
    risks: [
      'Unfavorable rainfall distribution hurting second-half tractor sales',
      'Intensifying competition in mid-size and compact SUV segments'
    ],
    catalysts: [
      'Customer deliveries of the newly unveiled Thar Roxx and electric origin SUVs',
      'Synergistic gains from Skoda Auto Volkswagen India equity partnership'
    ],
    recentDevelopments: [
      'Thar Roxx achieved record 176,000 bookings within 60 minutes of portal opening.'
    ],
    thesisHealthScore: 87,
    historicalPoints: [
      { date: '2025-01-02', price: 2710, volume: 3400000 },
      { date: '2025-01-16', price: 2780, volume: 3900000 },
      { date: '2025-02-01', price: 2810, volume: 4200000 },
      { date: '2025-02-15', price: 2830, volume: 3600000 },
      { date: '2025-03-01', price: 2845.00, volume: 3820000 }
    ]
  },
  {
    id: 'asianpaint',
    name: 'Asian Paints Limited',
    symbol: 'ASIANPAINT',
    exchange: 'NSE',
    sector: 'Consumer',
    isin: 'INE021A01026',
    instrument_key: 'NSE_EQ|INE021A01026',
    currentPrice: 2280.00,
    previousClose: 2315.00,
    dayChange: -35.00,
    dayChangePercent: -1.51,
    volume: 2450000,
    fiftyTwoWeekHigh: 3340.00,
    fiftyTwoWeekLow: 2240.00,
    marketCapCr: 218700,
    peRatio: 46.2,
    dividendYield: 1.45,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'India’s largest decorative paint brand with an unmatched 150,000+ dealer tinting network, vertically integrated polymer manufacturing, and home decor offerings.',
    keyDrivers: [
      'Decorative volume growth in Tier 2/3/4 towns',
      'Defending dealer mindshare and tinting machine exclusivity',
      'Home decor (kitchen, bath, furnishings) cross-sell scale',
      'Raw material crude derivative price relief'
    ],
    risks: [
      'Aggressive pricing and dealer rebate warfare initiated by Birla Opus (Grasim)',
      'Subdued urban real estate repainting cycles',
      'Gross margin pressure from promotional trade schemes'
    ],
    catalysts: [
      'Market consolidation if competitor promotional burn subsides',
      'Festival season demand surge driving volume reacceleration'
    ],
    recentDevelopments: [
      'Management recalibrated dealer incentives to protect market share against new entrants; margins compressed 210 bps YoY.'
    ],
    thesisHealthScore: 64,
    historicalPoints: [
      { date: '2025-01-02', price: 2450, volume: 2100000 },
      { date: '2025-01-16', price: 2390, volume: 2700000 },
      { date: '2025-02-01', price: 2340, volume: 3100000 },
      { date: '2025-02-15', price: 2300, volume: 2500000 },
      { date: '2025-03-01', price: 2280.00, volume: 2450000 }
    ]
  },
  {
    id: 'sunpharma',
    name: 'Sun Pharmaceutical Industries Limited',
    symbol: 'SUNPHARMA',
    exchange: 'NSE',
    sector: 'Pharmaceuticals',
    isin: 'INE044A01036',
    instrument_key: 'NSE_EQ|INE044A01036',
    currentPrice: 1824.00,
    previousClose: 1802.50,
    dayChange: 21.50,
    dayChangePercent: 1.19,
    volume: 3120000,
    fiftyTwoWeekHigh: 1960.00,
    fiftyTwoWeekLow: 1420.00,
    marketCapCr: 437600,
    peRatio: 39.4,
    dividendYield: 0.74,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'India’s largest pharmaceutical enterprise with high-margin Global Specialty portfolio (Ilumya, Cequa, Winlevi) and dominant domestic branded formulations market share (~8.5%).',
    keyDrivers: [
      'Global Specialty business revenue growth crossing $1.2B annual run-rate',
      'Domestic acute and chronic prescription market share outperformance',
      'Leqselvi (deuruxolitinib) launch for severe alopecia areata',
      'R&D productivity in dermatology, ophthalmology, and onco-dermatology'
    ],
    risks: [
      'US FDA regulatory inspection observations at manufacturing facilities (e.g., Dadra/Mohali)',
      'Patent litigation delays around key specialty molecules'
    ],
    catalysts: [
      'Favorable resolution of US litigation clearance for Leqselvi commercial launch',
      'Expanding specialty launches in Europe and Japan'
    ],
    recentDevelopments: [
      'Global Specialty revenues grew 19.2% YoY, now contributing over 18% of consolidated sales with high operating leverage.'
    ],
    thesisHealthScore: 86,
    historicalPoints: [
      { date: '2025-01-02', price: 1720, volume: 2600000 },
      { date: '2025-01-16', price: 1770, volume: 3200000 },
      { date: '2025-02-01', price: 1800, volume: 3400000 },
      { date: '2025-02-15', price: 1810, volume: 2900000 },
      { date: '2025-03-01', price: 1824.00, volume: 3120000 }
    ]
  },
  {
    id: 'hindunilvr',
    name: 'Hindustan Unilever Limited',
    symbol: 'HINDUNILVR',
    exchange: 'NSE',
    sector: 'FMCG / Consumer',
    isin: 'INE030A01027',
    instrument_key: 'NSE_EQ|INE030A01027',
    currentPrice: 2410.00,
    previousClose: 2428.50,
    dayChange: -18.50,
    dayChangePercent: -0.76,
    volume: 2180000,
    fiftyTwoWeekHigh: 3034.50,
    fiftyTwoWeekLow: 2170.25,
    marketCapCr: 566200,
    peRatio: 54.1,
    dividendYield: 1.74,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'India’s largest FMCG company, reaching 9 out of 10 Indian households with category leaders like Surf Excel, Dove, Sunsilk, Lifebuoy, Horlicks, and Brooke Bond.',
    keyDrivers: [
      'Rural consumption revival and volume recovery across mass home-care brands',
      'Premiumisation in beauty, personal care, and specialized skincare',
      'Shikhar B2B digital ordering app reaching 1.4M+ kirana store owners',
      'Demerger/separation of Ice Cream business enhancing return ratios'
    ],
    risks: [
      'Local/regional FMCG competition chipping away market share in detergent bars and soaps',
      'Palm oil and packaging raw material cost surges'
    ],
    catalysts: [
      'Concrete structural timeline for spinning off Ice Cream division',
      'Broad-based rural wage acceleration translating into high single-digit volume growth'
    ],
    recentDevelopments: [
      'Board approved separation of Ice Cream business via independent corporate structure to maximize shareholder value.'
    ],
    thesisHealthScore: 73,
    historicalPoints: [
      { date: '2025-01-02', price: 2360, volume: 1900000 },
      { date: '2025-01-16', price: 2390, volume: 2200000 },
      { date: '2025-02-01', price: 2435, volume: 2500000 },
      { date: '2025-02-15', price: 2420, volume: 2050000 },
      { date: '2025-03-01', price: 2410.00, volume: 2180000 }
    ]
  },
  {
    id: 'eternal',
    name: 'Eternal Limited',
    symbol: 'ETERNAL',
    exchange: 'NSE',
    sector: 'Consumer / Internet',
    isin: 'INE758T01015',
    instrument_key: 'NSE_EQ|INE758T01015',
    currentPrice: 284.20,
    previousClose: 275.80,
    dayChange: 8.40,
    dayChangePercent: 3.05,
    volume: 38500000,
    fiftyTwoWeekHigh: 304.50,
    fiftyTwoWeekLow: 144.20,
    marketCapCr: 251400,
    peRatio: 112.5,
    dividendYield: 0.00,
    timestamp: new Date().toISOString(),
    dataSource: 'DEMO',
    businessOverview: 'Hypergrowth consumer internet ecosystem powering food delivery, quick commerce (Blinkit), B2B restaurant supplies (Hyperpure), and going-out live events.',
    keyDrivers: [
      'Quick commerce (Blinkit) dark store expansion targeting 2,000+ stores',
      'Gross Order Value (GOV) compounding at >100% YoY in quick commerce',
      'Platform take-rates and ad revenue monetization per order',
      'Operating leverage swinging consolidated business into sustained positive PAT'
    ],
    risks: [
      'Intensified dark store land-grab against Zepto and Swiggy Instamart',
      'Gig worker wage inflation and municipal dark-store zoning regulations'
    ],
    catalysts: [
      'Blinkit achieving segment-level adjusted EBITDA break-even across mature cohorts',
      'Expansion into electronics, gifting, and pharmaceutical ultra-fast delivery'
    ],
    recentDevelopments: [
      'Blinkit added 152 net new dark stores in the past quarter while maintaining sub-12 minute average delivery SLA.'
    ],
    thesisHealthScore: 83,
    historicalPoints: [
      { date: '2025-01-02', price: 248, volume: 32000000 },
      { date: '2025-01-16', price: 262, volume: 41000000 },
      { date: '2025-02-01', price: 271, volume: 44000000 },
      { date: '2025-02-15', price: 278, volume: 36000000 },
      { date: '2025-03-01', price: 284.20, volume: 38500000 }
    ]
  }
];

export const DEMO_PORTFOLIO_HOLDINGS: PortfolioHolding[] = [
  {
    id: 'h-1',
    symbol: 'HDFCBANK',
    companyName: 'HDFC Bank Limited',
    exchange: 'NSE',
    quantity: 180,
    avgPrice: 1580.00,
    currentPrice: 1742.30,
    sector: 'Banking',
    thesisHealth: 78,
    notes: 'Core private banking anchor. Monitoring credit-to-deposit ratio normalisation.'
  },
  {
    id: 'h-2',
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Limited',
    exchange: 'NSE',
    quantity: 90,
    avgPrice: 2640.00,
    currentPrice: 2984.50,
    sector: 'Energy / Conglomerate',
    thesisHealth: 84,
    notes: 'Conglomerate proxy. Jio telecom tariff uplift and Jamnagar green energy value unlock.'
  },
  {
    id: 'h-3',
    symbol: 'TCS',
    companyName: 'Tata Consultancy Services',
    exchange: 'NSE',
    quantity: 50,
    avgPrice: 3820.00,
    currentPrice: 4120.00,
    sector: 'Information Technology',
    thesisHealth: 81,
    notes: 'Cash-flow compounder. Large deal ramp-up and enterprise AI integration.'
  },
  {
    id: 'h-4',
    symbol: 'BHARTIARTL',
    companyName: 'Bharti Airtel Limited',
    exchange: 'NSE',
    quantity: 110,
    avgPrice: 1420.00,
    currentPrice: 1684.20,
    sector: 'Telecom',
    thesisHealth: 91,
    notes: 'Secular pricing power play in Indian wireless duopoly with expanding ARPU.'
  },
  {
    id: 'h-5',
    symbol: 'LT',
    companyName: 'Larsen & Toubro Limited',
    exchange: 'NSE',
    quantity: 45,
    avgPrice: 3310.00,
    currentPrice: 3640.00,
    sector: 'Infrastructure / Engineering',
    thesisHealth: 88,
    notes: 'India & Middle East capex supercycle play with record order backlog.'
  },
  {
    id: 'h-6',
    symbol: 'SUNPHARMA',
    companyName: 'Sun Pharmaceutical Industries',
    exchange: 'NSE',
    quantity: 75,
    avgPrice: 1610.00,
    currentPrice: 1824.00,
    sector: 'Pharmaceuticals',
    thesisHealth: 86,
    notes: 'Defensive compounder with high-margin global specialty franchise expansion.'
  },
  {
    id: 'h-7',
    symbol: 'ITC',
    companyName: 'ITC Limited',
    exchange: 'NSE',
    quantity: 250,
    avgPrice: 435.00,
    currentPrice: 472.80,
    sector: 'FMCG / Consumer',
    thesisHealth: 85,
    notes: 'High dividend yield plus FMCG margin expansion and hotel demerger catalyst.'
  }
];

export const DEMO_THESES: Record<string, InvestmentThesis> = {
  HDFCBANK: {
    id: 'th-hdfc',
    symbol: 'HDFCBANK',
    companyName: 'HDFC Bank Limited',
    thesisStatement: 'Long-term compounding driven by post-merger liability normalization, retail mortgage cross-sell, and operating leverage across an unmatched nationwide branch network.',
    healthScore: 78,
    healthStatus: 'Healthy',
    lastAssessed: 'Today, 10:15 AM',
    pillars: [
      {
        id: 'p1',
        name: 'Credit-to-Deposit (LDR) Normalisation',
        status: 'Stable',
        score: 72,
        weight: 25,
        supportingEvidence: 'Deposit growth exceeded loan growth by 380 bps this quarter. Loan-to-deposit ratio decreased from 110% to ~98%.',
        latestUpdate: 'Continuing disciplined pace to reach target 85% LDR without sacrificing margin.'
      },
      {
        id: 'p2',
        name: 'Asset Quality Defense',
        status: 'Strong',
        score: 92,
        weight: 20,
        supportingEvidence: 'Gross NPA at 1.36% and Net NPA at 0.33% remain among the lowest in emerging market systemic banking.',
        latestUpdate: 'PCR stands robust at 74%; corporate book shows zero stress formation.'
      },
      {
        id: 'p3',
        name: 'Net Interest Margin (NIM) Stability',
        status: 'Weakening',
        score: 68,
        weight: 20,
        supportingEvidence: 'NIM hovered around 3.46%, restrained by expensive bulk deposit rollover during recent quarters.',
        latestUpdate: 'Funding costs remain slightly sticky; margin rebound delayed by 1-2 quarters.'
      },
      {
        id: 'p4',
        name: 'Market Share & Branch Maturity',
        status: 'Strong',
        score: 84,
        weight: 20,
        supportingEvidence: 'Over 1,500 branches opened in last 24 months are now crossing the 2-year breakeven profitability threshold.',
        latestUpdate: 'Operating cost-to-income ratio improved 70 bps to 39.8%.'
      },
      {
        id: 'p5',
        name: 'Valuation & Capital Return',
        status: 'Stable',
        score: 76,
        weight: 15,
        supportingEvidence: 'Trading at 2.4x forward P/ABV, representing a 1-standard-deviation discount to historical 5-year average.',
        latestUpdate: 'Capital adequacy ratio (CRAR) comfortably cushioned at 19.3%.'
      }
    ],
    strengtheningSignals: [
      'Deposits mobilization pace consistently outpacing broader system credit growth.',
      'Asset quality metrics pristine with nil incremental corporate slippages.',
      'Sustained FII re-accumulation following MSCI weight tranche adjustments.'
    ],
    weakeningSignals: [
      'NIM expansion pace slower than initial post-merger management guidance.',
      'Sticky deposit rates in urban retail clusters keeping liability costs firm.'
    ],
    thesisBreakRisk: {
      detected: true,
      severity: 'Medium',
      weakenedAssumptions: [
        'Assumption: NIM would re-expand to 3.7% within 6 quarters.',
        'Assumption: Deposit competition would abate promptly after rate pause.'
      ],
      evidence: 'Persistent high-cost term deposit competition has compressed NIM by ~15 bps relative to the base-case financial model.',
      recommendation: 'Monitor Closely'
    }
  },
  RELIANCE: {
    id: 'th-reliance',
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Limited',
    thesisStatement: 'Conglomerate flywheel creating multi-decade shareholder returns as consumer platforms (Jio & Retail) expand free cash flow while New Energy assets begin commercial scaling.',
    healthScore: 84,
    healthStatus: 'Healthy',
    lastAssessed: 'Today, 09:40 AM',
    pillars: [
      {
        id: 'p1',
        name: 'Telecom (Jio) ARPU & 5G Monetisation',
        status: 'Strong',
        score: 88,
        weight: 25,
        supportingEvidence: 'Jio ARPU increased to ₹195 post recent tariff adjustments; 5G data traffic volume exceeded 35% of total payload.',
        latestUpdate: 'Fixed wireless broadband (JioAirFiber) additions crossed 1M run-rate.'
      },
      {
        id: 'p2',
        name: 'Retail Omnichannel Dominance',
        status: 'Strong',
        score: 85,
        weight: 25,
        supportingEvidence: 'Reliance Retail operating footfall and square-footage growth remain #1 in India with expanding private label mix.',
        latestUpdate: 'Retail EBITDA margin expanded 40 bps YoY to 8.8%.'
      },
      {
        id: 'p3',
        name: 'O2C Cash Generation',
        status: 'Stable',
        score: 78,
        weight: 20,
        supportingEvidence: 'Refinery throughput optimal at Jamnagar complex; resilient petchem spreads cushioning Russian crude discount tapering.',
        latestUpdate: 'Quarterly O2C EBITDA stable at ₹14,200 Cr.'
      },
      {
        id: 'p4',
        name: 'New Green Energy Commercialisation',
        status: 'Stable',
        score: 82,
        weight: 15,
        supportingEvidence: 'Initial 10GW solar PV module manufacturing phase approaching commercial trial runs in Jamnagar.',
        latestUpdate: 'Key global technological partnerships locked in for green hydrogen electrolysers.'
      },
      {
        id: 'p5',
        name: 'Balance Sheet & Deleveraging',
        status: 'Strong',
        score: 87,
        weight: 15,
        supportingEvidence: 'Net Debt to EBITDA remains well under 1.2x despite ongoing capital expenditure programs.',
        latestUpdate: 'Strong internal accruals self-funding majority of downstream capex.'
      }
    ],
    strengtheningSignals: [
      'Subscribers exhibiting zero churn after tariff increases, proving pricing inelasticity.',
      'Retail square footage monetization reaching mature profitability benchmarks.'
    ],
    weakeningSignals: [
      'Global petrochemical spreads continue to lag historical cyclical peaks due to Chinese capacity additions.'
    ],
    thesisBreakRisk: {
      detected: false,
      severity: 'Low',
      weakenedAssumptions: [],
      evidence: 'All primary core pillars remain within acceptable operational tolerances.',
      recommendation: 'Monitor Closely'
    }
  },
  TCS: {
    id: 'th-tcs',
    symbol: 'TCS',
    companyName: 'Tata Consultancy Services',
    thesisStatement: 'Unmatched scale, industry-benchmark EBIT margins (25-26%), and fortress balance sheet position TCS to capture multi-year enterprise AI transformation and vendor consolidation deals.',
    healthScore: 81,
    healthStatus: 'Healthy',
    lastAssessed: 'Today, 11:10 AM',
    pillars: [
      {
        id: 'p1',
        name: 'Large Deal Total Contract Value (TCV)',
        status: 'Strong',
        score: 86,
        weight: 30,
        supportingEvidence: 'Quarterly deal bookings sustained at $8.6B+ with robust pipeline in Europe and UK.',
        latestUpdate: 'Mega-deal pipeline contains 4 transactions above $500M each.'
      },
      {
        id: 'p2',
        name: 'Operating Margin Defense (25-26%)',
        status: 'Stable',
        score: 82,
        weight: 25,
        supportingEvidence: 'EBIT margin maintained at 24.8%, despite annual wage increments, through disciplined subcontractor reduction.',
        latestUpdate: 'Offshore delivery ratio improved by 90 bps.'
      },
      {
        id: 'p3',
        name: 'BFSI Discretionary Spending Recovery',
        status: 'Weakening',
        score: 72,
        weight: 25,
        supportingEvidence: 'North American banking clients are prioritizing cost-takeout contracts over discretionary digital transformation.',
        latestUpdate: 'Decision-making cycles for small advisory engagements remain extended.'
      },
      {
        id: 'p4',
        name: 'Enterprise AI Capability & Reskilling',
        status: 'Strong',
        score: 85,
        weight: 20,
        supportingEvidence: 'Over 350,000 employees trained in foundational GenAI capabilities; proprietary TCS Cognix & BaNCS integrating LLMs.',
        latestUpdate: 'Over 200 client GenAI pilot programs transitioned into production.'
      }
    ],
    strengtheningSignals: [
      'Record vendor consolidation wins in European public and utility sectors.',
      'Industry-leading low attrition rate at 12.3% ensuring continuity.'
    ],
    weakeningSignals: [
      'US BFSI discretionary tech budget recovery slower than anticipated.'
    ],
    thesisBreakRisk: {
      detected: false,
      severity: 'Low',
      weakenedAssumptions: [],
      evidence: 'Cash conversion remains >100% of net income with continuous dividend payouts.',
      recommendation: 'Monitor Closely'
    }
  }
};

export const DEMO_WHAT_CHANGED: WhatChangedEvent[] = [
  {
    id: 'wc-1',
    title: 'RBI Liquidity Framework & Credit-to-Deposit Guidance',
    company: 'HDFC Bank / Banking Sector',
    symbol: 'HDFCBANK',
    sector: 'Banking',
    category: 'Regulatory',
    timestamp: 'Today, 09:15 AM',
    whatChanged: 'Reserve Bank of India maintained repo rate at 6.50% but reiterated caution on elevated systemic credit-to-deposit ratios, dampening near-term private bank lending acceleration expectations.',
    whyItMatters: 'Banks with elevated LDR like HDFC Bank (currently ~98%) must continue prioritizing deposit mobilization over aggressive loan expansion, keeping funding costs somewhat elevated.',
    portfolioImpact: 'Negative',
    thesisImpact: 'Weakens',
    confidence: 'High',
    evidence: 'RBI Monetary Policy Committee statement & banking system deposit data bulletin.'
  },
  {
    id: 'wc-2',
    title: 'Telecom Tariff Transmission & Data Growth',
    company: 'Bharti Airtel Limited',
    symbol: 'BHARTIARTL',
    sector: 'Telecom',
    category: 'Earnings',
    timestamp: 'Today, 10:30 AM',
    whatChanged: 'Bharti Airtel confirmed full headline transmission of the recent ~15% tariff adjustments with negligible prepaid churn and a 7% surge in average monthly data consumption per subscriber.',
    whyItMatters: 'Affirms that Indian wireless demand has high price inelasticity, accelerating Airtel’s trajectory toward ₹250 ARPU and expanding consolidated free cash flow yield.',
    portfolioImpact: 'Positive',
    thesisImpact: 'Strengthens',
    confidence: 'High',
    evidence: 'TRAI monthly subscription analytics & quarterly company operating disclosure.'
  },
  {
    id: 'wc-3',
    title: 'Middle East Hydrocarbon Mega-Contract Inflow',
    company: 'Larsen & Toubro Limited',
    symbol: 'LT',
    sector: 'Infrastructure / Engineering',
    category: 'Contract',
    timestamp: 'Today, 11:45 AM',
    whatChanged: 'L&T Energy Hydrocarbon division received Letters of Intent for offshore gas compression and pipeline facilities valued at approximately ₹12,500 Crore from an energy major in the Arabian Gulf.',
    whyItMatters: 'Expands order book visibility beyond FY28 and validates L&T’s competitive positioning in international engineering tenders against Korean and European EPC peers.',
    portfolioImpact: 'Positive',
    thesisImpact: 'Strengthens',
    confidence: 'High',
    evidence: 'BSE regulatory corporate announcement and press release.'
  },
  {
    id: 'wc-4',
    title: 'Crude Oil Softening & Refining Margin Dynamics',
    company: 'Reliance Industries Limited',
    symbol: 'RELIANCE',
    sector: 'Energy / Conglomerate',
    category: 'Macro',
    timestamp: 'Today, 01:20 PM',
    whatChanged: 'Brent crude softened to $73/bbl while Singapore regional refining margins improved to $6.80/bbl due to localized distillate supply maintenance outages in Northeast Asia.',
    whyItMatters: 'Lower crude input costs relieve working capital burden, while improved product crack spreads support Jamnagar complex gross refining realizations for Q4.',
    portfolioImpact: 'Positive',
    thesisImpact: 'Strengthens',
    confidence: 'Medium',
    evidence: 'S&P Global Platts energy feed and Singapore refining tracker.'
  }
];

export const DEMO_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    category: 'Thesis Break',
    severity: 'High',
    timestamp: '2 hours ago',
    company: 'HDFC Bank',
    symbol: 'HDFCBANK',
    whatHappened: 'Net Interest Margin (NIM) guidance deferred by 2 quarters due to prolonged high-cost term deposit renewals.',
    whyItMatters: 'Directly impacts the speed of return on equity (RoE) recovery to 17%+ targeted in the core investment thesis.',
    portfolioImpact: 'Holding comprises 21.4% of portfolio value. Moderated near-term capital appreciation pace.',
    thesisImpact: 'Pillar 3 (NIM Stability) score lowered from 76 to 68. Potential Thesis Break detector active.',
    isRead: false,
    isDismissed: false
  },
  {
    id: 'alt-2',
    category: 'Sector Risk',
    severity: 'Medium',
    timestamp: '4 hours ago',
    company: 'Portfolio Level',
    symbol: 'PORTFOLIO',
    whatHappened: 'Banking & Financial Services exposure currently stands at 37.8% across holdings.',
    whyItMatters: 'Hidden concentration risk: a 5% macro correction in the Bank Nifty would translate to a -1.9% direct drag on portfolio NAV.',
    portfolioImpact: 'High beta sensitivity to RBI liquidity tightening or systemic deposit rate wars.',
    thesisImpact: 'Diversification metric flagged for review.',
    isRead: false,
    isDismissed: false
  },
  {
    id: 'alt-3',
    category: 'Large Price Movement',
    severity: 'Low',
    timestamp: '6 hours ago',
    company: 'Eternal Limited',
    symbol: 'ETERNAL',
    whatHappened: 'Shares advanced +3.05% on heavy trading volume exceeding 38M shares on NSE.',
    whyItMatters: 'Institutional re-rating underway as Quick Commerce dark store unit economics demonstrate faster breakeven in secondary cities.',
    portfolioImpact: 'Holding not currently in demo portfolio; company is on Research Watchlist.',
    thesisImpact: 'Strengthens growth pillar for consumer internet sector coverage.',
    isRead: true,
    isDismissed: false
  }
];

export const DEMO_SCENARIOS: ScenarioItem[] = [
  {
    id: 'scen-1',
    title: 'Banking Sector NIM Contraction (-15%)',
    description: 'Systemic deposit competition pushes cost of funds higher by 40 bps, causing broad bank valuation multiple compression.',
    type: 'preset',
    shockSector: 'Banking',
    shockPercent: -15,
    estimatedImpactPercent: -5.7,
    mostAffected: [
      { symbol: 'HDFCBANK', company: 'HDFC Bank Limited', impact: -15.0, currentWeight: 21.4 },
      { symbol: 'ICICIBANK', company: 'ICICI Bank Limited', impact: -12.5, currentWeight: 16.4 },
      { symbol: 'SBIN', company: 'State Bank of India', impact: -14.0, currentWeight: 0 }
    ],
    leastAffected: [
      { symbol: 'BHARTIARTL', company: 'Bharti Airtel', impact: -0.5, currentWeight: 16.8 },
      { symbol: 'TCS', company: 'Tata Consultancy Services', impact: -1.2, currentWeight: 12.7 }
    ],
    mathematicalReasoning: 'Financials represent 37.8% of aggregate portfolio allocation. A 15% drop across banking equities induces a -5.67% direct portfolio NAV drawdown.',
    whatToWatch: [
      'RBI bi-weekly scheduled commercial banks credit-deposit growth delta',
      'CASA ratio erosion velocity in private banks'
    ],
    evidenceNote: 'Historical sensitivity calibrated to Q3 FY24 banking margin disclosures.'
  },
  {
    id: 'scen-2',
    title: 'Information Technology Multiples De-rating (-10%)',
    description: 'Extended delays in US corporate discretionary cloud spending trigger multiple compression across Tier-1 Indian IT services.',
    type: 'preset',
    shockSector: 'Information Technology',
    shockPercent: -10,
    estimatedImpactPercent: -1.3,
    mostAffected: [
      { symbol: 'TCS', company: 'Tata Consultancy Services', impact: -10.0, currentWeight: 12.7 },
      { symbol: 'INFY', company: 'Infosys Limited', impact: -10.5, currentWeight: 0 }
    ],
    leastAffected: [
      { symbol: 'LT', company: 'Larsen & Toubro', impact: 0.2, currentWeight: 14.1 },
      { symbol: 'HDFCBANK', company: 'HDFC Bank', impact: -0.4, currentWeight: 21.4 }
    ],
    mathematicalReasoning: 'IT services holdings account for 12.7% of portfolio NAV. A 10% de-rating directly causes an approximate -1.27% portfolio NAV contraction.',
    whatToWatch: [
      'US Federal Reserve interest rate policy statement and enterprise IT capex sentiment surveys',
      'Total Contract Value (TCV) booking announcements in BFSI vertical'
    ],
    evidenceNote: 'Gartner Global IT Spending forecast revisions & Indian IT quarterly TCV filings.'
  },
  {
    id: 'scen-3',
    title: 'Broad Market Correction (NIFTY 50 -10%)',
    description: 'Systemic risk-off sentiment driven by geopolitical escalation or foreign institutional fund outflows.',
    type: 'preset',
    shockPercent: -10,
    estimatedImpactPercent: -8.9,
    mostAffected: [
      { symbol: 'TATAMOTORS', company: 'Tata Motors', impact: -13.5, currentWeight: 8.8 },
      { symbol: 'LT', company: 'Larsen & Toubro', impact: -11.0, currentWeight: 14.1 }
    ],
    leastAffected: [
      { symbol: 'BHARTIARTL', company: 'Bharti Airtel', impact: -4.5, currentWeight: 16.8 },
      { symbol: 'TCS', company: 'Tata Consultancy Services', impact: -6.0, currentWeight: 12.7 }
    ],
    mathematicalReasoning: 'Portfolio high-beta exposure (L&T, Tata Motors) experiences outsized transmission, while defensive cash flows in Telecom and IT provide portfolio resilience.',
    whatToWatch: [
      'FII daily net cash and index futures positions on NSE',
      'India VIX movement above key 18.0 threshold'
    ],
    evidenceNote: 'Empirical beta regression analysis across 250 trading sessions.'
  }
];
