# Website Form and Backout Plan

## Current Form Surface
The Astro site does not host or process first-party form submissions.

- Driver application CTA: `https://intelliapp.driverapponline.com/c/mns1express?r=CompanyWebsite`
- Recruiting phone: `tel:6302463280`
- Recruiting email: `recruiting@mns1express.com`
- General email: `info@mns1express.com`
- Contact page apply path: `/apply/`, which sends drivers to the IntelliApp CTA

Because applications stay on IntelliApp, public cutover does not move driver application storage or processing into GitHub Pages.

## Pre-Cutover Checks
Run these before the final cutover PR is approved:

1. Build and verify the Astro site.
2. Confirm `/apply/` exposes the IntelliApp CTA, recruiting phone, and recruiting email.
3. Confirm `/contact/` exposes recruiting phone, recruiting email, general email, and the `/apply/` path.
4. Confirm no first-party `<form>`, `<iframe>`, or third-party form script was added without a separate reviewed integration plan.
5. Confirm the pre-Astro backup archive is readable and still contains the previous apply/contact pages.

The current automated cutover checks cover the CTA path verification. The backup archive verification was confirmed with:

```bash
shasum -a 256 /Users/jarvis/.openclaw/workspace/backups/mns1-website-pre-astro-20260523-1038-3fe60dbc5088.tar.gz
tar -tzf /Users/jarvis/.openclaw/workspace/backups/mns1-website-pre-astro-20260523-1038-3fe60dbc5088.tar.gz | rg '(^|/)(apply|contact)(/index)?\\.(html|txt)$|(^|/)apply/$|(^|/)contact/$'
```

Expected SHA256:

```text
5b22b635c1b7e4df81f167f4fd51feee167a4a3c0d2c4b1c3e09ca4c228015dd
```

Expected archived apply/contact entries include:

```text
mns1-website-3fe60dbc5088/apply.html
mns1-website-3fe60dbc5088/apply.txt
mns1-website-3fe60dbc5088/apply/index.html
mns1-website-3fe60dbc5088/contact.html
mns1-website-3fe60dbc5088/contact.txt
mns1-website-3fe60dbc5088/contact/index.html
```

## Backout Procedure
If the final public cutover exposes an application/contact problem:

1. Stop further DNS or GitHub Pages custom-domain changes.
2. Restore DNS to the pre-cutover records documented in the final DNS plan.
3. If repository rollback is needed, restore the previous public site from the backup tag or archive.
4. Verify the restored public apply/contact pages return HTTP 200.
5. Verify recruiting phone, recruiting email, and the driver application path are reachable.
6. Record the failed check and keep the Astro custom-domain cutover paused until a reviewed fix PR passes.

Primary rollback sources:

- Git tag: `backup/mns1-website-pre-astro-20260523-1038`
- Archive: `/Users/jarvis/.openclaw/workspace/backups/mns1-website-pre-astro-20260523-1038-3fe60dbc5088.tar.gz`
- SHA256: `5b22b635c1b7e4df81f167f4fd51feee167a4a3c0d2c4b1c3e09ca4c228015dd`
