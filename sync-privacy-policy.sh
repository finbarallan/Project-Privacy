#!/bin/bash

# Sync Privacy Policy Script
# This script updates the JavaScript file with the latest markdown content
# and commits the changes with cache busting

set -e  # Exit on any error

echo "🔄 Syncing Privacy Policy..."

# Check if PRIVACY_POLICY.md exists
if [ ! -f "PRIVACY_POLICY.md" ]; then
    echo "❌ Error: PRIVACY_POLICY.md not found!"
    exit 1
fi

# Read the markdown content and escape it for JavaScript
MARKDOWN_CONTENT=$(cat PRIVACY_POLICY.md)

# Get current date for cache busting
CURRENT_DATE=$(date "+%Y-%m-%d")
TIMESTAMP=$(date "+%Y%m%d%H%M")

# Create the new JavaScript file content
cat > privacy/privacy-policy-data.js << EOF
/**
 * Privacy Policy Content Data
 * This file contains the markdown content as a JavaScript string
 * Auto-generated from PRIVACY_POLICY.md - Updated $CURRENT_DATE
 */

window.PRIVACY_POLICY_CONTENT = \`# Privacy Policy - Opto

$MARKDOWN_CONTENT
\`;
EOF

echo "✅ Updated privacy/privacy-policy-data.js"

# Update cache busting in HTML file
sed -i.bak "s/Cache bust: [^>]*/Cache bust: $CURRENT_DATE-auto/" privacy/index.html
sed -i.bak "s/\\.css?v=[^\"]*/.css?v=$TIMESTAMP/g" privacy/index.html
sed -i.bak "s/\\.js?v=[^\"]*/.js?v=$TIMESTAMP/g" privacy/index.html

# Remove backup file
rm privacy/index.html.bak

echo "✅ Updated cache busting in privacy/index.html"

# Copy the markdown file to the privacy folder for backup
cp PRIVACY_POLICY.md privacy/PRIVACY_POLICY.md

echo "✅ Synced markdown file to privacy folder"

# Check if git is available and we're in a git repo
if command -v git &> /dev/null && git rev-parse --git-dir > /dev/null 2>&1; then
    # Add files to git
    git add privacy/privacy-policy-data.js privacy/index.html privacy/PRIVACY_POLICY.md PRIVACY_POLICY.md
    
    # Check if there are any changes to commit
    if git diff --cached --quiet; then
        echo "ℹ️  No changes to commit"
    else
        # Commit with a descriptive message
        git commit -m "Auto-sync: Update privacy policy content and cache busting ($CURRENT_DATE)"
        echo "✅ Changes committed to git"
        
        # Ask if user wants to push
        read -p "🚀 Push changes to remote? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git push origin main
            echo "✅ Changes pushed to remote"
        else
            echo "ℹ️  Changes committed locally only"
        fi
    fi
else
    echo "ℹ️  Git not available or not in a git repository"
fi

echo "🎉 Privacy policy sync complete!"
echo ""
echo "📋 What was updated:"
echo "   • privacy/privacy-policy-data.js (JavaScript content)"
echo "   • privacy/index.html (cache busting)"
echo "   • privacy/PRIVACY_POLICY.md (backup copy)"
echo ""
echo "🌐 Your website will show updated content after GitHub Pages rebuilds (1-3 minutes)"