# Website DNS Cutover Plan

## Status
This is a readiness plan only. Do not change DNS, GitHub Pages custom-domain settings, or add a `CNAME` file until the final reviewed cutover PR is approved by Mike.

Current public DNS observed before cutover:

```text
mns1express.com.      3600  IN  A  35.233.163.33
mns1express.com.      no AAAA answer observed
www.mns1express.com.  no CNAME answer observed
www.mns1express.com.  no A answer observed
```

Current GitHub Pages default target:

```text
mns1mike.github.io.  IN  A  185.199.108.153
mns1mike.github.io.  IN  A  185.199.109.153
mns1mike.github.io.  IN  A  185.199.110.153
mns1mike.github.io.  IN  A  185.199.111.153
```

## Cutover Target
Use `www.mns1express.com` as the canonical GitHub Pages custom domain, with apex `mns1express.com` also pointed at GitHub Pages so GitHub can redirect between apex and `www`.

This follows GitHub's current Pages guidance:

- GitHub recommends using a `www` subdomain and setting up the apex domain too.
- `www` should be a `CNAME` to the Pages default domain, excluding the repository name.
- Apex should use all GitHub Pages `A` records and, if IPv6 is used, all GitHub Pages `AAAA` records.
- DNS may take up to 24 hours to propagate.
- Wildcard DNS records should not be used.

Reference: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>

## Pre-Cutover DNS Prep
At least one business day before cutover:

1. Confirm domain verification is complete in GitHub for `mns1express.com`.
2. Confirm no wildcard record such as `*.mns1express.com` exists.
3. Reduce TTL for affected records to `300` seconds if the DNS provider supports it.
4. Re-confirm current rollback records immediately before editing DNS.
5. Confirm `docs/website/FORM_BACKOUT.md` and `docs/website/CUTOVER.md` are complete.

## Final GitHub Pages Settings
In the final cutover PR and GitHub Pages settings:

1. Remove the preview-only `npm run prepare:pages-preview` step from `.github/workflows/deploy-pages.yml` so custom-domain production deploys use root-relative paths.
1. Add the custom domain in repository Pages settings: `www.mns1express.com`.
2. Add `public/CNAME` with exactly:

   ```text
   www.mns1express.com
   ```

3. Merge only after review and explicit approval.
4. After DNS resolves and certificate issuance is available, enable or confirm Enforce HTTPS.

The site deploys through a custom GitHub Actions workflow, so repository settings and the deployed artifact are the operational source of truth during cutover.

## DNS Records To Set
Set these records during the approved cutover window.

### Apex

```text
Name:  @
Type:  A
TTL:   300 during cutover, 3600 after stable
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

Optional IPv6 records, only if the DNS provider and monitoring path support IPv6:

```text
Name:  @
Type:  AAAA
TTL:   300 during cutover, 3600 after stable
Value: 2606:50c0:8000::153
Value: 2606:50c0:8001::153
Value: 2606:50c0:8002::153
Value: 2606:50c0:8003::153
```

### WWW

```text
Name:  www
Type:  CNAME
TTL:   300 during cutover, 3600 after stable
Value: mns1mike.github.io
```

Do not point `www` to the apex. Do not include the repository name in the `CNAME` target.

## Records To Remove Or Replace
During the approved cutover window:

```text
Remove/replace: mns1express.com A 35.233.163.33
Remove: any mns1express.com AAAA records not listed above
Remove: any www.mns1express.com A records
Remove: any www.mns1express.com CNAME target other than mns1mike.github.io
Remove: any wildcard records covering *.mns1express.com
```

## Verification Commands
Run these after DNS changes:

```bash
dig mns1express.com +noall +answer -t A
dig mns1express.com +noall +answer -t AAAA
dig www.mns1express.com +noall +answer -t CNAME
curl -I https://www.mns1express.com/
curl -I https://mns1express.com/
curl -I https://www.mns1express.com/sitemap.xml
curl -I https://www.mns1express.com/apply/
```

Expected DNS answers:

```text
mns1express.com A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
www.mns1express.com CNAME: mns1mike.github.io
```

Expected HTTP behavior:

```text
https://www.mns1express.com/         returns 200
https://mns1express.com/             returns 200 or redirects to www
https://www.mns1express.com/sitemap.xml returns 200
https://www.mns1express.com/apply/   returns 200 and exposes the IntelliApp CTA
TLS certificate is valid for www.mns1express.com and mns1express.com
```

## Rollback Records
If cutover fails, restore the prior public DNS:

```text
Name:  @
Type:  A
TTL:   300 during rollback, 3600 after stable
Value: 35.233.163.33
```

```text
Name:  @
Type:  AAAA
Action: remove GitHub Pages AAAA records unless a prior provider-specific AAAA value is confirmed
```

```text
Name:  www
Type:  CNAME
Action: remove the mns1mike.github.io CNAME and restore the prior provider value if one is found before cutover
Current observed pre-cutover state: no www CNAME or A answer
```

After rollback:

```bash
dig mns1express.com +noall +answer -t A
dig www.mns1express.com +noall +answer -t CNAME
curl -I https://mns1express.com/
```

Expected rollback result:

```text
mns1express.com A returns 35.233.163.33
www either returns the documented prior value or no answer, matching pre-cutover state
https://mns1express.com/ returns the existing live site
```
