# Architecture rules
- Store orders in Cloud, scoped to authenticated ownership; never expose customer records publicly.
- Create orders through an idempotent RPC that calculates totals from the server catalog, not browser prices.
- Treat bundles as single cart items at their advertised price while retaining composition and allergen information.
- Kaspi is a payment preference payable on delivery until a merchant integration is provided; never mark it paid automatically.
