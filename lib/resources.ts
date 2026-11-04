export type Resource = {
  slug: string;
  num: string;
  tag: string;
  title: string;
  image: string;
  summary: string;
  topics: string[];
  body: string[]; // paragraphs
};

export const RESOURCES: Resource[] = [
  {
    slug: "commercial-leasing-guide",
    num: "01",
    tag: "Leasing Guide",
    title: "The Commercial Tenant's Guide to Leasing in NSW",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    summary:
      "Understanding your rights and obligations before signing a commercial lease is critical. This guide covers lease types, make-good clauses, rent reviews, outgoings, and what to negotiate before you commit.",
    topics: ["Gross vs net leases", "Outgoings & who pays", "Rent review mechanisms", "Make-good obligations", "Break clauses & assignments"],
    body: [
      "Signing a commercial lease is one of the most significant financial commitments a business can make. Unlike residential leases, commercial leases in NSW are largely unregulated — there is no equivalent of the Residential Tenancies Act to protect tenants — which means the terms you agree to at the outset will govern your rights for the entire lease term.",
      "The first decision you will face is the type of lease. A gross lease means you pay a single all-inclusive rent and the landlord covers outgoings such as council rates, water rates, insurance and building maintenance. A net lease — far more common in commercial property — means you pay a base rent plus a proportionate share of the building's outgoings. Always request a detailed outgoings estimate before signing, and ensure the lease caps any outgoings that could fluctuate significantly.",
      "Rent review mechanisms are equally important. CPI reviews tie your rent increases to inflation, which can work in your favour during low-inflation periods. Fixed percentage reviews (commonly 3–4% per annum) offer certainty. Market reviews — where rent is reset to the prevailing market rate at a nominated date — carry the most risk; ensure any market review clause includes a 'ratchet' provision preventing rent from increasing by more than a specified amount in any single review.",
      "Make-good clauses require tenants to restore the premises to their original condition at the end of the lease. This can be extremely costly if the clause is drafted broadly. Before signing, obtain an independent condition report, document the existing state of the premises with photographs, and negotiate to limit make-good to 'fair wear and tear' exclusions. Where possible, agree a fixed make-good payment at lease commencement rather than an open-ended obligation.",
      "Assignment and subletting provisions determine your flexibility if your business circumstances change. Standard leases require landlord consent for any assignment, though consent cannot be unreasonably withheld. If you anticipate growth, ensure the lease includes expansion rights or first right of refusal on adjoining space. If you may need to exit early, negotiate a break clause with reasonable notice and payment terms.",
      "Finally, always engage a solicitor experienced in commercial leasing to review any lease before signing. The cost of legal advice is minimal compared to the financial exposure of an unfavourable lease term. Our team is happy to introduce you to reputable commercial solicitors across the Illawarra.",
    ],
  },
  {
    slug: "due-diligence-checklist",
    num: "02",
    tag: "Buyer's Checklist",
    title: "Due Diligence Checklist for Commercial Property",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    summary:
      "Commercial property purchases carry more complexity than residential. Before exchanging contracts, there are financial, legal, structural and tenancy matters that must be investigated thoroughly.",
    topics: ["Zoning & permitted use", "Existing lease review", "WALE & vacancy risk", "Environmental & contamination searches", "Outgoings reconciliation"],
    body: [
      "Commercial due diligence is a structured investigation of a property's legal, physical, financial and tenancy position before you commit to purchase. Unlike residential transactions, there is no cooling-off period for commercial contracts in NSW — once you exchange, you are bound. The due diligence period (typically 14–30 days) is your only opportunity to uncover issues before they become your problem.",
      "Start with the planning and zoning position. Order a Section 10.7 planning certificate from the relevant council to confirm the zoning, any planning overlays, heritage listings, flood affectations or road widenings that may affect the property. Confirm that the current use is a permitted use under the zone — if the property has been operating unlawfully, the liability transfers to you on settlement.",
      "Review all existing leases and tenancy schedules in detail. Key metrics to assess are the Weighted Average Lease Expiry (WALE) — which measures the average remaining lease term weighted by income — and any upcoming break options or lease expiries. A short WALE creates vacancy risk; a long WALE with strong covenants underpins value. Verify that all rental income declared by the vendor is actually being received, and request the last 12 months of bank statements to confirm.",
      "Environmental searches are non-negotiable for industrial and some retail properties. Order a site history search and check the EPA's contaminated land register. Contaminated sites can be extraordinarily expensive to remediate, and as the new owner you may inherit the liability. If contamination risk is identified, commission a Phase 1 environmental site assessment before proceeding.",
      "Engage a qualified building inspector to assess the structural condition, roof, services (electrical, hydraulic, mechanical), and compliance of any fit-out. Obtain copies of all council-approved development applications and construction certificates. Any unapproved works create ongoing risk and may require costly rectification or demolition orders.",
      "Finally, reconcile the outgoings. Request a full 12-month outgoings statement and have your accountant review whether the outgoings being recovered from tenants match actual expenditure. Discrepancies are common and may indicate either underpayment by tenants or cost inflation by the vendor. Our team can guide you through each of these steps and connect you with the right advisors.",
    ],
  },
  {
    slug: "understanding-commercial-yields",
    num: "03",
    tag: "Investment",
    title: "Understanding Commercial Yields — Gross, Net & Passing",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    summary:
      "Yield is the primary metric commercial investors use to compare assets. But gross yield, net yield and passing yield each tell a different story — knowing the difference can mean the difference between a sound investment and a costly mistake.",
    topics: ["Gross vs net yield explained", "Passing yield vs market yield", "Cap rates & valuation", "Impact of vacancy on returns", "How to benchmark against the market"],
    body: [
      "Yield is the annual income generated by a property expressed as a percentage of its purchase price or value. It is the foundational metric of commercial property investment, used by buyers, valuers and agents alike to compare assets across different locations, sizes and property types. But yield is not a single number — there are several measures, each telling a different part of the story.",
      "Gross yield is the simplest calculation: annual rent divided by purchase price, multiplied by 100. If you purchase a property for $1,500,000 and it generates $90,000 in annual rent, the gross yield is 6.0%. Gross yield is useful for rapid comparison but ignores the costs of ownership. It is the number most commonly quoted in marketing material.",
      "Net yield accounts for the annual cost of ownership — rates, insurance, management fees, maintenance reserves and other outgoings not recovered from tenants. If those costs total $18,000 per year on the above property, the net yield falls to approximately 4.8%. Net yield gives a more accurate picture of the actual cash return an investor will receive, and is the figure you should use when comparing investment decisions.",
      "Passing yield refers to the yield based on current passing rent — what the tenant is actually paying today. Market yield, by contrast, is calculated on the assessed market rent — what the property would achieve if it were leased at today's rates. When a property is leased below market rent, the passing yield will be lower than the market yield, and vice versa. Understanding the gap between passing and market rent is critical: a below-market lease may seem safe but represents an opportunity cost; an above-market lease may carry renewal risk.",
      "Capitalisation rate — or cap rate — is the inverse of yield and is used extensively by valuers. A property trading at a 6% yield implies a cap rate of 6%, meaning the market is pricing the asset at 16.7 times annual income. As interest rates rise, cap rates tend to expand (prices fall relative to income); as rates fall, cap rates compress. Understanding where the market's cap rate sits relative to your borrowing cost determines whether leverage enhances or erodes your return.",
      "In the Illawarra commercial market, industrial assets typically trade between 5.5% and 7.0% yields depending on location and lease term. Retail and office assets span a wider range, from sub-5% for CBD office with long WALEs to 8%+ for secondary retail with vacancy risk. Our team can provide current comparable sales data and yield benchmarks for any property you are considering.",
    ],
  },
  {
    slug: "nsw-commercial-zoning",
    num: "04",
    tag: "Planning & Zoning",
    title: "NSW Commercial Zoning: What It Means for Your Property",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    summary:
      "NSW uses the Standard Instrument LEP to classify land use. The zone your property sits in determines what can legally operate from it — which directly affects tenant demand, lease income and capital value.",
    topics: ["E1–E4 employment zones", "MU1 mixed use explained", "Permitted vs permissible with consent", "How zoning affects value", "DA requirements for change of use"],
    body: [
      "In NSW, land use is controlled by Local Environmental Plans (LEPs) prepared by each council under the standard instrument framework. The zone your property falls within determines what activities are permitted, what requires development consent, and what is prohibited. For commercial property owners, landlords and investors, understanding zoning is not optional — it underpins every leasing, development and sale decision.",
      "Under the standard instrument, commercial and employment-focused land is typically zoned E1 (Local Centre), E2 (Commercial Centre), E3 (Productivity Support), or E4 (General Industrial). E1 zones are designed for neighbourhood-level retail and commercial uses — think local strip shopping centres. E2 zones accommodate larger-scale retail, office and commercial development typically found in town and city centres such as Wollongong CBD and Shellharbour City Centre. E3 zones permit a broader mix of commercial, light industrial and business park uses. E4 zones are reserved for general industrial uses.",
      "MU1 Mixed Use is an increasingly common zone in infill and urban renewal areas, permitting a combination of residential, commercial, retail and community uses within the same precinct or even the same building. For commercial investors, MU1 zones offer flexibility but also competition from residential developers who can often pay higher prices for the same land.",
      "Within each zone, the LEP distinguishes between uses that are permitted without consent (rare), permitted with consent (the standard case), and prohibited. A use that is prohibited in a zone cannot be approved, regardless of the merits of the proposal. Before leasing to any new tenant, verify that their intended use is a permitted use — or permitted with consent — under the current zone. If a DA is required for the proposed use, factor the approval timeline and risk into the lease commencement date.",
      "Change of use applications — where a new tenant wants to use the premises for a purpose different from the existing approval — require a development application to council. The assessment timeframe varies but typically ranges from 40 to 90 days. Some councils have fast-track pathways for low-impact commercial changes of use. Engaging a town planner early in the process can significantly reduce delays and uncertainty.",
      "Zoning directly influences property value. A commercial site with E2 zoning in a growth precinct like Shellharbour City Centre commands a significant premium over an equivalent site in an E3 or E4 zone, because the range of permissible uses — and therefore the pool of potential tenants — is broader. Our team can provide zoning analysis and planning advice for any property across the Illawarra. We work closely with experienced local town planners and can facilitate introductions.",
    ],
  },
  {
    slug: "illawarra-commercial-market-2025",
    num: "05",
    tag: "Market Insight",
    title: "Illawarra Commercial Market: What's Driving Demand in 2025",
    image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=1200&q=80",
    summary:
      "Population growth, the Shellharbour City Centre expansion, and infrastructure investment along the Princes Highway corridor are reshaping the Illawarra's commercial landscape. Here's what buyers, tenants and vendors need to know.",
    topics: ["Shellharbour City Centre precinct", "Industrial land supply squeeze", "Retail vacancy trends", "Owner-occupier demand vs investment", "What to expect in the next 12 months"],
    body: [
      "The Illawarra commercial property market entered 2025 in a position of structural undersupply, particularly in the industrial and large-format retail segments. After several years of elevated construction costs constraining new supply, the gap between tenant demand and available stock has tightened materially — a dynamic that continues to support both rents and capital values across the region.",
      "Shellharbour City Centre remains the most significant commercial development story on the South Coast. The masterplanned precinct continues to attract national and regional retailers, healthcare operators and professional services tenants seeking modern, purpose-built accommodation. Vacancy in the City Centre has contracted significantly over the past two years, and face rents have risen accordingly. For investors, assets in and around the City Centre have been among the most actively traded in the region.",
      "The industrial sector faces the most acute supply constraint. Industrial land in the Illawarra is effectively finite — there are no large greenfield industrial estates under development at scale — and demand from logistics, trade services and manufacturing tenants has absorbed available stock at pace. Prime industrial rents in Unanderra and Kembla Grange have increased materially since 2022, and sub-500sqm strata industrial units are regularly attracting multiple enquiries and above-asking offers. This dynamic is likely to persist through 2025.",
      "Retail vacancy in secondary and strip locations remains a structural challenge. The shift in consumer spending patterns accelerated by the pandemic has not fully reversed, and landlords in secondary retail strips face the ongoing challenge of finding tenants for larger floor plates vacated by national retailers. By contrast, food and beverage, allied health, childcare and essential services tenants continue to perform strongly and are actively seeking quality space across the region.",
      "Owner-occupier demand — where businesses purchase their own premises rather than leasing — has been a defining feature of the Illawarra market over the past three years. Low interest rates in 2020–22 enabled many business owners to purchase, and while financing costs have increased, the ownership premium over leasing cost remains relatively attractive for many occupiers. This has tightened the pool of available stock for investors and supported capital values even as yields have expanded slightly from their 2022 lows.",
      "Looking ahead, the pipeline of infrastructure investment across the region — including upgrades to the Princes Highway corridor, continued development at Shellharbour Airport and the ongoing residential growth of the Southern Illawarra — underpins medium-term commercial demand. Businesses servicing the growing population base, particularly in trade services, healthcare and food retail, will continue to drive leasing activity. Our team is active across all segments of the Illawarra commercial market and can provide specific analysis for any location or property type on request.",
    ],
  },
];
