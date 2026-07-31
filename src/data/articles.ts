export type ArticleVisual = 'incretin' | 'molecule' | 'vial' | 'chart' | 'lab' | 'dna'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }

export type Article = {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  badge: string
  visual: ArticleVisual
  readTime: string
  content: Block[]
}

export const categories = [
  'All',
  'Peptide Pricing',
  'Research',
  'Guides',
  'Vendor Reviews',
  'News',
]

export const articles: Article[] = [
  {
    id: 1,
    title: 'Tirzepatide: The Chemistry and Molecular Biology of a Dual Incretin',
    excerpt:
      'How tirzepatide works at the molecular level: its dual incretin receptor mechanism, fatty acid half-life extension strategy, amphipathic helix structure, and solid-phase synthesis...',
    date: 'June 16, 2026',
    author: 'Peptide Pricing',
    category: 'Peptide Pricing',
    badge: 'Peptides',
    visual: 'incretin',
    readTime: '8 min read',
    content: [
      { type: 'p', text: 'Tirzepatide is a 39-residue synthetic peptide that acts as a dual agonist at both the GIP (glucose-dependent insulinotropic polypeptide) and GLP-1 (glucagon-like peptide-1) receptors. This dual incretin mechanism is what sets it apart from earlier single-receptor agonists and underlies much of the research interest it has attracted.' },
      { type: 'h2', text: 'A Dual Incretin Receptor Agonist' },
      { type: 'p', text: 'Most incretin-based molecules target a single receptor. Tirzepatide engages two distinct receptor systems simultaneously, producing a combined signaling effect that is greater than either pathway alone. The GIP arm and the GLP-1 arm contribute complementary downstream effects on insulin secretion and metabolic signaling.' },
      { type: 'quote', text: 'The defining feature of tirzepatide is balanced activity at two receptors that were historically targeted in isolation.' },
      { type: 'h2', text: 'Half-Life Extension Through a Fatty Acid Chain' },
      { type: 'p', text: 'A C20 fatty diacid moiety is conjugated to the peptide backbone at the Lys-13 position. This lipid chain promotes reversible binding to serum albumin, which dramatically slows renal clearance and extends the circulating half-life to roughly five days — enabling once-weekly dosing schedules in research protocols.' },
      { type: 'h2', text: 'Amphipathic Helix Structure' },
      { type: 'p', text: 'The central region of the peptide adopts an amphipathic alpha-helix, with hydrophobic and hydrophilic residues segregated to opposite faces. This secondary structure is critical for receptor engagement and for the stability of the albumin-binding interaction.' },
      { type: 'h2', text: 'Solid-Phase Peptide Synthesis' },
      { type: 'p', text: 'Tirzepatide is manufactured using solid-phase peptide synthesis (SPPS), in which the chain is assembled one residue at a time on an insoluble resin. The fatty acid conjugation and final purification by reverse-phase HPLC are the most demanding steps, and they are a major driver of the cost differences you will see between vendors.' },
      { type: 'p', text: 'Understanding these synthesis steps helps explain why purity certificates (COAs) and batch testing matter so much when comparing suppliers — small differences in process control translate directly into differences in purity and price.' },
    ],
  },
  {
    id: 2,
    title: 'Peptide Purity Analysis',
    excerpt:
      'The accurate assessment of peptide purity is a fundamental requirement in both basic research and therapeutic development, as the presence of impurities can significantly...',
    date: 'June 16, 2026',
    author: 'Peptide Pricing',
    category: 'Research',
    badge: 'Peptides',
    visual: 'molecule',
    readTime: '6 min read',
    content: [
      { type: 'p', text: 'The accurate assessment of peptide purity is a fundamental requirement in both basic research and therapeutic development. The presence of impurities can significantly alter experimental results, change biological activity, and in some cases introduce safety concerns.' },
      { type: 'h2', text: 'Why Purity Matters' },
      { type: 'p', text: 'Even a small fraction of a deletion sequence or oxidized variant can shift the apparent potency of a peptide in an assay. For quantitative research, knowing the true purity is essential to interpreting your data correctly.' },
      { type: 'h2', text: 'Common Analytical Methods' },
      { type: 'list', items: [
        'Reverse-phase HPLC — the standard for quantifying purity as a percentage of total peak area.',
        'Mass spectrometry (ESI-MS / MALDI-TOF) — confirms the molecular weight and identity.',
        'Amino acid analysis — verifies composition against the expected sequence.',
        'Karl Fischer titration — measures residual water content in lyophilized material.',
      ] },
      { type: 'quote', text: 'A purity number means little without the method and chromatogram that produced it.' },
      { type: 'h2', text: 'Reading a Certificate of Analysis' },
      { type: 'p', text: 'A trustworthy COA reports the HPLC purity, the observed mass, the method conditions, and the batch identifier. When comparing vendors, always check that the COA corresponds to the actual batch being shipped — not a generic reference document.' },
      { type: 'p', text: 'When you compare prices on PeptiCenter, factor purity into the cost-per-milligram. The cheapest vial is rarely the best value if it lacks verifiable purity data.' },
    ],
  },
  {
    id: 3,
    title: 'BPC-157 Vendor Price Comparison: Q2 2026 Report',
    excerpt:
      'We tracked BPC-157 prices across 20+ vendors over the last quarter. See which suppliers consistently offered the lowest cost per milligram and the biggest coupon savings...',
    date: 'June 12, 2026',
    author: 'Peptide Pricing',
    category: 'Peptide Pricing',
    badge: 'Pricing',
    visual: 'chart',
    readTime: '5 min read',
    content: [
      { type: 'p', text: 'Over the second quarter of 2026 we tracked BPC-157 pricing across more than 20 vendors in our index. This report summarizes the trends we observed in cost-per-milligram, coupon availability, and overall value.' },
      { type: 'h2', text: 'Lowest Cost Per Milligram' },
      { type: 'p', text: 'Crownwell Research held the lowest effective price for most of the quarter, averaging around $0.80/mg after coupon. Alpha Peptides remained competitive thanks to a steady 15% coupon, finishing close behind.' },
      { type: 'h2', text: 'Biggest Coupon Savings' },
      { type: 'list', items: [
        'CROWN10 — consistent 10% off, frequently stackable with seasonal sales.',
        'ALPHA15 — the largest standing discount at 15% off.',
        'LIMIT10 — reliable 10% off from Limitless Nootropics.',
      ] },
      { type: 'quote', text: 'The cheapest sticker price and the cheapest effective price were rarely the same vendor.' },
      { type: 'h2', text: 'What This Means for Buyers' },
      { type: 'p', text: 'Always compare the final, post-coupon cost-per-milligram rather than the list price. Use the live comparison table on PeptiCenter to see the current standings, which update multiple times daily.' },
    ],
  },
  {
    id: 4,
    title: 'How to Verify a Research Peptide Vendor Before You Buy',
    excerpt:
      'Third-party testing, COAs, batch reports, and reputation signals — a practical checklist for evaluating whether a peptide vendor is trustworthy and worth your money...',
    date: 'June 9, 2026',
    author: 'Peptide Pricing',
    category: 'Vendor Reviews',
    badge: 'Vendors',
    visual: 'vial',
    readTime: '7 min read',
    content: [
      { type: 'p', text: 'Not every vendor that lists a low price is worth buying from. Before you order, run through this checklist to evaluate whether a supplier is trustworthy.' },
      { type: 'h2', text: 'Look for Third-Party Testing' },
      { type: 'p', text: 'Reputable vendors send batches to independent labs and publish the results. Third-party testing is far more credible than in-house claims because the lab has no incentive to inflate purity.' },
      { type: 'h2', text: 'Demand a Batch-Specific COA' },
      { type: 'list', items: [
        'The COA should list the exact batch number on your vial.',
        'It should report HPLC purity and a confirmed mass.',
        'The test date should be recent and traceable.',
      ] },
      { type: 'h2', text: 'Check Reputation Signals' },
      { type: 'p', text: 'Independent reviews, time in business, transparent shipping policies, and responsive customer support are all positive signals. Be cautious of vendors with no verifiable history or a pattern of unresolved complaints.' },
      { type: 'quote', text: 'A trustworthy vendor makes its testing easy to find — you should not have to ask twice.' },
      { type: 'p', text: 'Every vendor in the PeptiCenter index is vetted for reliability, product quality, and customer service, so you can compare with confidence.' },
    ],
  },
  {
    id: 5,
    title: 'A Beginner’s Guide to Reconstitution and Dosing Math',
    excerpt:
      'Bacteriostatic water ratios, unit conversions, and how to read your syringe correctly. A clear, step-by-step guide to reconstituting lyophilized research peptides...',
    date: 'June 5, 2026',
    author: 'Peptide Pricing',
    category: 'Guides',
    badge: 'Guides',
    visual: 'lab',
    readTime: '6 min read',
    content: [
      { type: 'p', text: 'Reconstitution math trips up many newcomers. This guide walks through the core concepts so you can convert between volume and dose with confidence. (For research purposes only.)' },
      { type: 'h2', text: 'Choosing a Water Volume' },
      { type: 'p', text: 'Lyophilized peptide is reconstituted with bacteriostatic water. The volume you add determines the concentration. Adding more water makes each unit on the syringe correspond to a smaller dose, which can improve measurement precision.' },
      { type: 'h2', text: 'The Core Formula' },
      { type: 'quote', text: 'Concentration = total peptide (mcg) ÷ water volume (mL). Draw volume = desired dose ÷ concentration.' },
      { type: 'h2', text: 'Reading an Insulin Syringe' },
      { type: 'list', items: [
        'A standard U-100 syringe has 100 units per 1 mL.',
        '10 units therefore equals 0.1 mL.',
        'Work out your concentration first, then convert your target dose into units.',
      ] },
      { type: 'p', text: 'When in doubt, write the numbers down and double-check the conversion before drawing. Small arithmetic slips are the most common source of dosing errors.' },
    ],
  },
  {
    id: 6,
    title: 'New Retatrutide Suppliers Added to the Index This Week',
    excerpt:
      'Four new vendors carrying Retatrutide joined our comparison index. Here is how their launch pricing, coupon codes, and shipping policies stack up against existing players...',
    date: 'June 1, 2026',
    author: 'Peptide Pricing',
    category: 'News',
    badge: 'News',
    visual: 'dna',
    readTime: '4 min read',
    content: [
      { type: 'p', text: 'Four new vendors carrying Retatrutide joined the PeptiCenter comparison index this week. Here is a quick look at how their launch pricing and policies compare to the established players.' },
      { type: 'h2', text: 'The New Entrants' },
      { type: 'list', items: [
        'Nova Peptides — aggressive launch pricing with a 20% introductory coupon.',
        'Peptide Sciences — mid-range pricing backed by detailed COAs.',
        'BioPure Research — slightly higher cost but free expedited shipping.',
        'Quantum Peptides — competitive per-milligram cost with frequent flash sales.',
      ] },
      { type: 'h2', text: 'How They Compare' },
      { type: 'p', text: 'Launch pricing is often temporary, so early standings can shift quickly. We will continue tracking these vendors and update their cost-per-milligram as their introductory offers expire.' },
      { type: 'quote', text: 'Introductory pricing is a great opportunity — but always confirm the COA before ordering from a brand-new supplier.' },
      { type: 'p', text: 'See the live Retatrutide comparison table on PeptiCenter for the current rankings.' },
    ],
  },
]

export function getArticle(id: number): Article | undefined {
  return articles.find((a) => a.id === id)
}
