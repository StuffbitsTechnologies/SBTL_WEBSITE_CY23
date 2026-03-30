---
name: Website Audit Execution Plan
overview: "Implement the website audit in phased releases: fix launch-critical trust gaps first, then conversion/UX improvements, then SEO and growth enhancements. Use existing React pages/components and shared layout to minimize rework and keep delivery measurable."
todos:
  - id: critical-proof-and-trust
    content: "Implement all critical trust gaps first: portfolio case-study pages, testimonials, leadership/careers credibility, and blog depth"
    status: in_progress
  - id: conversion-ux-upgrades
    content: Ship important UX/conversion improvements on home, portfolio, and contact pages
    status: pending
  - id: sitewide-foundations
    content: "Add missing foundations: floating WhatsApp, FAQ, engagement model page, and cookie consent"
    status: pending
  - id: service-depth-linking
    content: Upgrade service pages with richer capability content and portfolio/blog internal links
    status: pending
  - id: content-production
    content: Run parallel content pipeline for case studies, blog posts, testimonials, and FAQ copy
    status: pending
  - id: qa-seo-analytics
    content: Complete QA, SEO, and analytics instrumentation before final launch
    status: pending
isProject: false
---

# StuffBits Website Audit Implementation Plan

## Goals

- Fix high-impact trust/conversion gaps before launch.
- Reuse current page architecture and shared layout components for fast rollout.
- Ship in weekly milestones with measurable acceptance criteria.

## Phase 1: Launch Blockers (Critical)

- Create full case-study detail experience for portfolio projects.
  - Extend project data model in [stuffbits-react/src/lib/portfolioData.js](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/lib/portfolioData.js) with `problem`, `solution`, `techStack`, `results`.
  - Add dedicated route + page (e.g., `/portfolio/:slug`) via [stuffbits-react/src/App.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/App.jsx) and a new page in `src/pages`.
  - Update cards and modal trigger in [stuffbits-react/src/pages/PortfolioPage.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/pages/PortfolioPage.jsx) so “Read more” opens real case study pages.
- Add testimonials section (homepage + optional reusable component).
  - Add testimonial data source in `src/lib` and render section in [stuffbits-react/src/pages/HomePage.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/pages/HomePage.jsx).
- Fix sparse/unfinished leadership presentation.
  - Improve content density and structure in [stuffbits-react/src/pages/TeamPage.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/pages/TeamPage.jsx) (additional members, advisory/culture block, or merge strategy).
- Address careers credibility issue.
  - Enrich roles and “open application” content in [stuffbits-react/src/pages/CareersPage.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/pages/CareersPage.jsx).
- Resolve blog thin-content perception.
  - Expand content count and ensure card design scales in [stuffbits-react/src/pages/Blog.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/pages/Blog.jsx) and [stuffbits-react/src/components/blog/BlogCard.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/components/blog/BlogCard.jsx).

## Phase 2: Conversion and UX Improvements (Important)

- Home page trust/clarity improvements.
  - Refine hero clarity in [stuffbits-react/src/components/HeroSlider.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/components/HeroSlider.jsx).
  - Improve logo readability in [stuffbits-react/src/components/home/ClientsTrusted.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/components/home/ClientsTrusted.jsx).
  - Add count-up animation in [stuffbits-react/src/components/home/StatsBar.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/components/home/StatsBar.jsx).
  - Replace non-professional event imagery in [stuffbits-react/src/components/home/PhotoHighlights.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/components/home/PhotoHighlights.jsx).
- Portfolio UX additions.
  - Add keyword search in [stuffbits-react/src/pages/PortfolioPage.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/pages/PortfolioPage.jsx).
  - Add tech badges + impact snippets from portfolio data source.
- Contact-page lead capture improvements.
  - Add response-time copy + stronger social proof in [stuffbits-react/src/pages/ContactPage.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/pages/ContactPage.jsx).
  - Add scheduling link/embed (Calendly/Cal.com) in contact conversion block.

## Phase 3: Sitewide Missing Foundations

- Add floating WhatsApp CTA globally.
  - Implement in shared layout layer using [stuffbits-react/src/components/layout/Layout.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/components/layout/Layout.jsx).
- Add FAQ page and route.
  - Create page in `src/pages` and register route in [stuffbits-react/src/App.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/App.jsx).
- Add engagement-model page (“How we work”) and route.
  - New page + nav/footer links in [stuffbits-react/src/components/Navbar.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/components/Navbar.jsx) and [stuffbits-react/src/components/layout/Footer.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/components/layout/Footer.jsx).
- Add cookie consent banner.
  - Implement lightweight banner in layout or app shell ([stuffbits-react/src/App.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/App.jsx)) with persistent consent state.

## Phase 4: Service-Page Depth + Internal Linking

- Expand service cards from short blurbs to capability blocks in [stuffbits-react/src/pages/ServicesPage.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/pages/ServicesPage.jsx) and [stuffbits-react/src/pages/ServiceDetailPage.jsx](/home/shubham/Stuffbits/Project/SBTL_WEBSITE_CY23/stuffbits-react/src/pages/ServiceDetailPage.jsx).
- Link protocol/tech badges to educational blog posts from service pages.
- Add “See it in action” related portfolio modules to service detail pages.

## Phase 5: Content Production Track (Parallel)

- Produce missing assets and copy in parallel to code changes:
  - 8-10 blog posts, 10+ case studies, 3-5 testimonials, FAQ answers, leadership/careers copy.
- Define one content owner + publishing checklist (tone, proof points, SEO metadata, CTA).

## Phase 6: QA, SEO, and Analytics Gate

- QA pass: responsive, accessibility basics, form submission, route coverage.
- SEO pass: title/meta consistency, schema on case studies/FAQ/blog, internal links.
- Analytics: track clicks on WhatsApp, schedule CTA, contact submit, portfolio detail views.

## Suggested Delivery Sequence (4 Weeks)

- Week 1: Case studies + testimonials + leadership/careers critical fixes.
- Week 2: Home + portfolio + contact important fixes.
- Week 3: Missing pages/features (FAQ, engagement page, cookie, floating WhatsApp).
- Week 4: Service-page depth + SEO/QA hardening + launch readiness.

## Definition of Done

- Every critical issue from your audit is resolved in production-ready UI/content.
- At least one measurable conversion path exists on every major page (Contact, WhatsApp, or Schedule).
- Portfolio has real proof-based detail pages and service pages link to concrete evidence.
- Site has legal/utility foundations (cookie consent, FAQ, engagement model) and passes smoke QA.

