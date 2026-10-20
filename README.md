# Better Together — GitHub Pages + Firebase (free-tier starter)

## What it is
An installable, mobile-friendly private challenge tracker for up to 8 friends with email or Google sign-in, shared check-ins, weekly progress, and a monthly consistency leaderboard.

The default challenges are **entertainment screen time ≤120 minutes/day**, **exercise ≥180 minutes/week**, and **Gayatri mantra ≥11 chants/day**. Everyone can add goals. Values are **self-reported**, not automatically read from phones. To compare screen time fairly, use *entertainment use only*, excluding work/school/navigation. Weekly starts Monday; user phone local timezone is currently used.

**Important: The site is NOT LIVE and its real-time accounts will NOT WORK until the owner sets up Firebase and enables GitHub Pages.** If no Firebase configuration is supplied, the hosted website displays a setup notice. A sample offline demo can be viewed with `?demo=1`; demo data is not shared.

## 1. Create a GitHub Pages website (no server to maintain)

1. Log into https://github.com/ and create a **new public repository** named `better-together-club`. Don't replace your existing repositories.
2. Upload *the contents of this folder*, placing `index.html`, `manifest.webmanifest`, `service-worker.js`, `firestore.rules`, `README.md`, `.nojekyll`, and the `icons` folder at the **repository root**. Never upload passwords, private keys, or Firebase service-account JSON files.
3. Select **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main → Folder: /(root) → Save**.
4. Wait for Pages to report a published URL in the repository's **Settings → Pages**. It often resembles `https://USERNAME.github.io/better-together-club/`, but use the **actual** URL GitHub gives you. Until Firebase is configured the page deliberately says setup is needed.

GitHub Pages on GitHub Free is supported for public repositories. Public GitHub source does **not** make private Firestore check-ins public if the security rules are correctly installed. Do not publish any user data in GitHub.

## 2. Create your Firebase free project

1. Go to https://console.firebase.google.com/ and create a project. Choose **Spark (no-cost)**, avoid choosing or enabling paid services, and skip optional Analytics.
2. Add **Web app** in Project overview (the `</>` icon). Copy the `firebaseConfig` values shown. Do not confuse this public web config with a private service-account key.
3. Firebase → **Authentication → Sign-in method** → enable **Email/Password** and **Google**. For Google sign-in, Firebase may ask for a project support email; provide one.
4. Firebase → **Firestore Database → Create database** → select the free database, a nearby region, and an appropriate security setup. **Do not leave Firestore open in test mode.** Publish the provided `firestore.rules` from **Firestore Database → Rules**, using the rules editor.
5. Open `index.html` in your GitHub repository, click Edit (pencil), and fill the JSON inside the `<script type="application/json" id="firebase-config">` element. Provide `apiKey`, `authDomain`, `projectId`, and `appId` from the Firebase Web app configuration. The web config is meant to be used in client-side code; **do not paste Firebase Admin SDK/service account credentials**. Commit the change; Pages republishes automatically.
6. Firebase → **Authentication → Settings → Authorized domains**: add **only the hosting domain**, like `USERNAME.github.io` (no `https://` and no repository path), if not already authorized.
7. Visit the live GitHub Pages URL and confirm that you see the **registration screen**, rather than the setup notice or local demo.
8. Register yourself, select **Create a group**, and choose a group name. Visit **Friends → Copy invite link** and share that link with the seven other friends. They each register using their own Google/email account and join the group.

### Check before inviting all friends

Use two different browsers or a phone and a computer with *two different test accounts* to confirm signup, invitation join, cross-device progress syncing, and that a second user cannot edit someone else's check-ins. Only then send the invitation link to everyone.

If the website gets a login error, verify your authorized domain, enabled Authentication providers, Firestore database created, the rules published correctly, and the config copied without typographical mistakes.

## Free-tier reality

- GitHub Pages can host a public repository's website for free, subject to GitHub's usage policies.
- Firestore's free quota supports 1 GiB stored, 50,000 document reads/day and 20,000 writes/day for one eligible database; 8 friends doing occasional check-ins should generally fit, but quotas and plan terms may change.
- Firebase Authentication email/password and Google are supported within applicable Spark plan limits. Avoid telephone/SMS authentication and optional paid features.
- If costs matter, do **not** upgrade to Blaze without checking billing. No recurring payments or paid hosting are needed for this starter design under free-tier limits.

Official docs: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site ; https://firebase.google.com/docs/web/setup ; https://firebase.google.com/docs/firestore/security/get-started ; https://firebase.google.com/docs/firestore/pricing

## Mobile installation

**iPhone:** Open your GitHub Pages URL in Safari → Share → Add to Home Screen. **Samsung/Pixel:** Open in Chrome/Samsung Internet → browser menu → Install app / Add to Home Screen. Installation is optional.

## Fair-play / privacy notes

Screen Time or Android Digital Wellbeing numbers cannot be imported automatically from a normal website. All entries are manual. Your 8-person group is limited through Firestore membership transactions/rules; membership slots are permanent to preserve competition history. Friends share group activity numbers, but emails are not displayed. Anyone possessing an invitation code may join before the group fills; keep the link private. A public GitHub Pages URL is visible to everyone, but Firestore group data is restricted to registered members with group membership.

A goal added partway through a week counts from its start date. Past weeks cannot be changed through the app UI, but the current security rules do not make fraud-proof audit logs or guarantee deadlines against advanced users. This is a friends accountability tool, **not** a verified compliance/health tracking system.

## Files
- `index.html`: website and app logic (Firebase web configuration goes here)
- `manifest.webmanifest`, `service-worker.js`, `icons/`: installable app settings and images
- `firestore.rules`: paste into Firebase **Firestore Database → Rules** (GitHub Pages itself cannot apply database rules)
- `.nojekyll`: tells GitHub Pages to publish static files unchanged

No downloads are needed for members once the website and Firebase are configured.