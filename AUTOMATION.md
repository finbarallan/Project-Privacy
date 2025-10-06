# Privacy Policy Automation

This repository includes automation to keep the website JavaScript file in sync with the markdown privacy policy.

## How It Works

### Manual Sync (Recommended)
Run the sync script whenever you update `PRIVACY_POLICY.md`:

```bash
./sync-privacy-policy.sh
```

This script will:
- ✅ Update `privacy/privacy-policy-data.js` with the latest markdown content
- ✅ Update cache busting in `privacy/index.html` to force browser refresh
- ✅ Create a backup copy in `privacy/PRIVACY_POLICY.md`
- ✅ Commit and optionally push changes to GitHub
- ✅ Provide clear feedback on what was updated

### Automatic Sync (GitHub Actions)
The repository also includes a GitHub Action that automatically runs the sync script when you push changes to `PRIVACY_POLICY.md`.

### Files Structure
```
Project-Privacy/
├── PRIVACY_POLICY.md                    # 📝 Source markdown file (edit this)
├── sync-privacy-policy.sh               # 🔄 Sync script
├── privacy/
│   ├── index.html                       # 🌐 Website HTML
│   ├── privacy-policy-data.js           # 📊 Auto-generated JS content
│   ├── script.js                        # ⚙️ Website JavaScript
│   └── PRIVACY_POLICY.md                # 💾 Backup copy
└── .github/workflows/
    └── sync-privacy-policy.yml          # 🤖 GitHub Actions workflow
```

## Usage

1. **Edit the privacy policy**: Make changes to `PRIVACY_POLICY.md`
2. **Run sync script**: Execute `./sync-privacy-policy.sh`
3. **Website updates**: GitHub Pages will rebuild with new content (1-3 minutes)

## Benefits

- 🔒 **No manual mistakes**: Eliminates the need to manually update JavaScript
- ⚡ **Cache busting**: Automatically updates version numbers to force browser refresh
- 📝 **Git integration**: Automatically commits and optionally pushes changes
- 🤖 **GitHub Actions**: Optional automatic sync when markdown file changes
- 💾 **Backups**: Keeps synced copies in the privacy folder

## Cache Busting

The script automatically updates cache-busting parameters in the HTML file to ensure browsers load the latest content:

- CSS: `styles.css?v=TIMESTAMP`
- JavaScript: `*.js?v=TIMESTAMP`
- HTML comment: `<!-- Cache bust: DATE -->`

This ensures users always see the updated privacy policy without needing to manually clear their browser cache.