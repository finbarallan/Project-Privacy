# Sync Script

The `sync-privacy-policy.sh` script keeps the website JavaScript file in sync with the markdown privacy policy.

## Usage

```bash
./sync-privacy-policy.sh
```

This updates the JavaScript content, handles cache busting, and commits changes automatically.

## Automation

GitHub Actions automatically runs the sync script when `PRIVACY_POLICY.md` is updated.