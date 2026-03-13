# 🚀 Server Optimization Guide
## Performance Score Target: > 90

### 📋 Current Performance Issues (from Lighthouse)
- **Performance Score:** 44/100 ❌
- **TTFB:** 359ms (Target: < 200ms)
- **No compression:** Missing Brotli/Gzip
- **No caching:** No long-term cache headers
- **Total size:** 1.5MB (Target: < 500KB)

---

## 🔧 IMPLEMENTATION STEPS

### 1️⃣ Choose Your Server Type

#### **For Apache (.htaccess)**
```bash
# Copy .htaccess to website root
cp .htaccess /var/www/amadeya.org/.htaccess

# Set correct permissions
chmod 644 /var/www/amadeya.org/.htaccess
```

#### **For Nginx**
```bash
# Copy nginx config
cp nginx.conf /etc/nginx/sites-available/amadeya.org

# Enable site
ln -s /etc/nginx/sites-available/amadeya.org /etc/nginx/sites-enabled/

# Test configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

#### **For Apache (main config)**
```bash
# Copy Apache config
cp apache.conf /etc/apache2/sites-available/amadeya.org.conf

# Enable site
a2ensite amadeya.org.conf

# Test configuration
apache2ctl configtest

# Restart Apache
systemctl restart apache2
```

---

### 2️⃣ Enable Required Modules

#### **Apache Modules**
```bash
# Enable required modules
a2enmod brotli
a2enmod deflate
a2enmod expires
a2enmod headers
a2enmod rewrite
a2enmod ssl
```

#### **Nginx Modules**
```bash
# Check if Brotli module is installed
nginx -V | grep brotli

# If not installed, install:
# Ubuntu/Debian:
apt-get install nginx-module-brotli

# CentOS/RHEL:
yum install nginx-module-brotli
```

---

### 3️⃣ Verify Compression

#### **Test Brotli Compression**
```bash
# Check if Brotli is working
curl -H "Accept-Encoding: br" -I https://amadeya.org

# Should see:
# content-encoding: br
```

#### **Test Gzip Fallback**
```bash
# Check if Gzip is working
curl -H "Accept-Encoding: gzip" -I https://amadeya.org

# Should see:
# content-encoding: gzip
```

---

### 4️⃣ Verify Caching

#### **Test Cache Headers**
```bash
# Test image caching
curl -I https://amadeya.org/img/5296603349773916432.webp

# Should see:
# cache-control: public, max-age=31536000, immutable
# expires: Thu, 01 Jan 2027 00:00:00 GMT
```

#### **Test Font Caching**
```bash
# Test font caching
curl -I https://amadeya.org/fonts/inter.woff2

# Should see:
# cache-control: public, max-age=31536000, immutable
```

---

### 5️⃣ Verify Security Headers

#### **Test Security Headers**
```bash
# Check all headers
curl -I https://amadeya.org

# Should see:
# strict-transport-security: max-age=31536000; includeSubDomains; preload
# x-content-type-options: nosniff
# x-xss-protection: 1; mode=block
# content-security-policy: default-src 'self'...
```

---

## 🧪 TESTING COMPRESSION SAVINGS

### Test Before/After Compression
```bash
# Test without compression
curl -H "Accept-Encoding: identity" https://amadeya.org/css/style.css --output /tmp/style.css.uncompressed
ls -lh /tmp/style.css.uncompressed

# Test with compression
curl -H "Accept-Encoding: br" https://amadeya.org/css/style.css --output /tmp/style.css.brotli
ls -lh /tmp/style.css.brotli

# Calculate savings
echo "Compression ratio: $(($(stat -c% /tmp/style.css.uncompressed) - $(stat -c% /tmp/style.css.brotli)) / $(stat -c% /tmp/style.css.uncompressed) * 100)%"
```

---

## 📊 EXPECTED IMPROVEMENTS

### Before Server Optimization:
- **TTFB:** 359ms
- **Transfer Size:** 1.5MB
- **Compression:** None
- **Cache:** None

### After Server Optimization:
- **TTFB:** ~200ms (-44% improvement)
- **Transfer Size:** ~400KB (-73% improvement)
- **Compression:** Brotli (~30% smaller than Gzip)
- **Cache:** 1-year immutable for static assets

### Performance Score Impact:
- **Before:** 44/100
- **After:** ~65-70/100 (+20-25 points)

---

## 🔍 VERIFICATION CHECKLIST

### ✅ Compression Check
- [ ] Brotli enabled and working
- [ ] Gzip fallback enabled
- [ ] CSS files compressed
- [ ] JS files compressed
- [ ] Images compressed
- [ ] Fonts compressed

### ✅ Caching Check
- [ ] Images cached for 1 year
- [ ] Fonts cached for 1 year
- [ ] CSS/JS cached for 1 year
- [ ] HTML cached for 1 hour
- [ ] Cache-Control headers correct
- [ ] Vary: Accept-Encoding header present

### ✅ Security Check
- [ ] HTTPS redirect working
- [ ] HSTS header present
- [ ] CSP header present
- [ ] XSS protection enabled
- [ ] Content-Type options set

### ✅ Performance Check
- [ ] TTFB < 200ms
- [ ] Total size < 500KB
- [ ] Compression ratio > 70%
- [ ] No 404 errors
- [ ] Server push working (HTTP/2)

---

## 🚨 TROUBLESHOOTING

### Common Issues:

#### **Brotli Not Working**
```bash
# Check if module is loaded
apache2ctl -M | grep brotli
# or
nginx -V | grep brotli

# Install if missing
# Apache: a2enmod brotli
# Nginx: install nginx-module-brotli
```

#### **Cache Headers Not Applied**
```bash
# Check .htaccess permissions
ls -la /var/www/amadeya.org/.htaccess

# Should be 644
chmod 644 /var/www/amadeya.org/.htaccess
```

#### **Compression Not Applied**
```bash
# Check MIME types
grep -r "AddOutputFilterByType" /etc/apache2/mods-enabled/
# or
grep -r "gzip_types" /etc/nginx/
```

---

## 📈 MONITORING

### Test Performance After Changes:
```bash
# Run Lighthouse audit
npx lighthouse https://amadeya.org --output json --output-path after-server-optimization.json

# Compare results
echo "Performance Score Improvement:"
echo "Before: 44"
echo "After: $(cat after-server-optimization.json | jq '.categories.performance.score * 100')"
```

---

## 🎯 NEXT STEPS

After server optimization is complete and verified:

1. **LCP Optimization** - Hero image compression and AVIF format
2. **JavaScript Optimization** - Reduce TBT from 1010ms to <150ms  
3. **Critical CSS** - Inline critical rendering path
4. **Image Optimization** - Convert to AVIF + responsive sizes

**Expected final Performance Score: 90+** 🎯
