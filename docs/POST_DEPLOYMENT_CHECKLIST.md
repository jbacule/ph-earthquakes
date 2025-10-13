# ✅ Post-Deployment SEO Checklist

Use this checklist after deploying to https://ph-earthquakes.jbacule.dev

## 🔍 Immediate Testing (Right After Deployment)

### Basic Functionality
- [ ] Website loads at https://ph-earthquakes.jbacule.dev
- [ ] SSL certificate is active (HTTPS working)
- [ ] All earthquake data loads correctly
- [ ] Map displays properly
- [ ] Filters and controls work

### SEO Files Accessibility
- [ ] Visit: https://ph-earthquakes.jbacule.dev/robots.txt
  - Should show robots.txt content
  - Verify sitemap URL is correct
  
- [ ] Visit: https://ph-earthquakes.jbacule.dev/sitemap.xml
  - Should show XML sitemap
  - Verify URL is correct
  
- [ ] Visit: https://ph-earthquakes.jbacule.dev/manifest.json
  - Should show web app manifest
  - Verify icons and colors

### Meta Tags Testing
- [ ] View page source (right-click → View Page Source)
- [ ] Check for `<meta property="og:` tags (Open Graph)
- [ ] Check for `<meta name="twitter:` tags (Twitter Cards)
- [ ] Check for `<script type="application/ld+json">` (Structured Data)
- [ ] Verify all URLs point to ph-earthquakes.jbacule.dev (not localhost)

---

## 🧪 Validation Tools (First 24 Hours)

### Structured Data
- [ ] **Google Rich Results Test**
  - Visit: https://search.google.com/test/rich-results
  - Enter: https://ph-earthquakes.jbacule.dev
  - Verify: No errors, shows WebApplication, Organization, Dataset
  
- [ ] **Schema.org Validator**
  - Visit: https://validator.schema.org/
  - Enter: https://ph-earthquakes.jbacule.dev
  - Check: All schemas validate correctly

### Social Media Previews
- [ ] **Facebook/Open Graph Debugger**
  - Visit: https://developers.facebook.com/tools/debug/
  - Enter: https://ph-earthquakes.jbacule.dev
  - Verify: Title, description, image show correctly
  - Click "Scrape Again" if needed
  
- [ ] **Twitter Card Validator**
  - Visit: https://cards-dev.twitter.com/validator
  - Enter: https://ph-earthquakes.jbacule.dev
  - Verify: Summary large image card appears
  - Image should be 1200x630px
  
- [ ] **LinkedIn Post Inspector**
  - Visit: https://www.linkedin.com/post-inspector/
  - Enter: https://ph-earthquakes.jbacule.dev
  - Check preview appearance

### Performance & Mobile
- [ ] **PageSpeed Insights**
  - Visit: https://pagespeed.web.dev/
  - Test: https://ph-earthquakes.jbacule.dev
  - Target: 90+ (mobile), 95+ (desktop)
  - Check Core Web Vitals
  
- [ ] **Mobile-Friendly Test**
  - Visit: https://search.google.com/test/mobile-friendly
  - Test: https://ph-earthquakes.jbacule.dev
  - Verify: "Page is mobile-friendly"
  
- [ ] **GTmetrix** (Optional)
  - Visit: https://gtmetrix.com/
  - Test loading speed and optimization

### Security Headers
- [ ] **Security Headers Check**
  - Visit: https://securityheaders.com/
  - Test: https://ph-earthquakes.jbacule.dev
  - Verify security headers are present

---

## 📊 Search Console Setup (First Week)

### Google Search Console
- [ ] Visit: https://search.google.com/search-console
- [ ] Add property: ph-earthquakes.jbacule.dev
- [ ] Verify ownership (HTML tag, DNS, or file upload)
- [ ] Submit sitemap: https://ph-earthquakes.jbacule.dev/sitemap.xml
- [ ] Wait for initial indexing (24-48 hours)

### Bing Webmaster Tools
- [ ] Visit: https://www.bing.com/webmasters
- [ ] Add site: ph-earthquakes.jbacule.dev
- [ ] Verify ownership
- [ ] Submit sitemap: https://ph-earthquakes.jbacule.dev/sitemap.xml

### Optional: Yandex Webmaster
- [ ] Visit: https://webmaster.yandex.com/
- [ ] Add site and verify
- [ ] Submit sitemap

---

## 📈 Analytics Setup (First Week)

### Google Analytics 4 (Recommended)
- [ ] Create GA4 property
- [ ] Get measurement ID (G-XXXXXXXXXX)
- [ ] Add to Next.js (via environment variable or direct)
- [ ] Verify tracking in real-time reports
- [ ] Set up goals/conversions (optional)

### Plausible/Fathom (Privacy-Friendly Alternative)
- [ ] Sign up for service
- [ ] Add tracking script
- [ ] Verify data collection

---

## 🔄 Ongoing Monitoring (First Month)

### Week 1: Initial Indexing
- [ ] Check Google Search Console for indexing status
- [ ] Monitor for crawl errors
- [ ] Verify sitemap processed successfully
- [ ] Check mobile usability issues

### Week 2-4: Search Performance
- [ ] Monitor impressions in Search Console
- [ ] Check which queries drive traffic
- [ ] Identify top-performing pages
- [ ] Look for indexing issues

### Monthly Tasks
- [ ] Review Core Web Vitals
- [ ] Check for broken links
- [ ] Monitor site speed
- [ ] Review search rankings
- [ ] Update content if needed

---

## 🎯 Success Metrics to Track

### Search Engine Visibility
- [ ] Site indexed by Google (check: `site:ph-earthquakes.jbacule.dev`)
- [ ] Appears in search for "Philippines earthquakes map"
- [ ] Rich snippets showing in results
- [ ] Featured in earthquake-related queries

### Performance Targets
- [ ] PageSpeed Score: 90+ (mobile)
- [ ] Largest Contentful Paint: < 2.5s
- [ ] First Input Delay: < 100ms
- [ ] Cumulative Layout Shift: < 0.1

### Social Sharing
- [ ] Test share on Facebook (correct preview)
- [ ] Test share on Twitter (correct card)
- [ ] Test share on LinkedIn (correct preview)
- [ ] Image displays properly

---

## 🐛 Common Issues & Solutions

### Social Media Preview Not Updating
**Problem:** Old or no image showing when sharing
**Solution:** 
1. Use Facebook Debugger to scrape again
2. Add `?v=1` to URL and increment for cache busting
3. Wait 24-48 hours for cache to clear

### Sitemap Not Found (404)
**Problem:** /sitemap.xml returns 404
**Solution:**
1. Verify `src/app/sitemap.ts` exists
2. Rebuild project: `pnpm build`
3. Check Next.js version (15.5+)
4. Verify no conflicting static files

### Structured Data Not Showing
**Problem:** Rich results test shows no data
**Solution:**
1. View page source, find `application/ld+json`
2. Copy JSON to validator.schema.org
3. Fix any validation errors
4. Rebuild and redeploy

### Search Console Verification Failing
**Problem:** Can't verify ownership
**Solution:**
1. Try HTML file upload method
2. Or use DNS TXT record
3. Or add meta tag to `<head>` in layout.tsx

---

## 📞 Need Help?

If you encounter issues:
1. Check `docs/SEO_GUIDE.md` for detailed information
2. Review Next.js SEO documentation
3. Test with validation tools above
4. Check browser console for errors

---

## ✨ Congratulations!

Once you've completed this checklist, your Philippines Earthquakes Map will be:
- ✅ Fully indexed by search engines
- ✅ Optimized for social sharing
- ✅ Performance-optimized
- ✅ PWA-ready
- ✅ Analytics-tracked

**Happy monitoring! 🌏📊**

---

**Last Updated:** October 13, 2025  
**Project:** Philippines Earthquakes Map  
**URL:** https://ph-earthquakes.jbacule.dev  
**Creator:** Josh Bacule

