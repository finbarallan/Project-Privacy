# 🎨 Opto Brand Design System

## 🎯 **Core Design Elements**

### **1. Brand Gradient**
```swift
LinearGradient(
    colors: [.blue, .purple],
    startPoint: .topLeading,
    endPoint: .bottomTrailing
)
```
**CSS/Web Equivalent:**
```css
background: linear-gradient(135deg, #007AFF 0%, #AF52DE 100%);
```
**Hex Colors:**
- Start: `#007AFF` (iOS Blue)
- End: `#AF52DE` (iOS Purple)

### **2. App Logo Variants**

#### **Intro/Welcome Screen (Large)**
```swift
HStack(spacing: 0) {
    Text("O")
        .font(.system(size: 80, weight: .bold, design: .rounded))
        .foregroundStyle(
            LinearGradient(
                colors: [.blue, .purple],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
    
    Text("pto")
        .font(.system(size: 80, weight: .bold, design: .rounded))
        .foregroundStyle(
            LinearGradient(
                colors: [.blue, .purple],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
}
```

#### **Main App Header (Medium)**
```swift
HStack(spacing: 0) {
    Text("O")
        .font(.system(size: 48, weight: .bold))
        .foregroundColor(.primary)
    
    Text("pto")
        .font(.system(size: 48, weight: .bold))
        .foregroundColor(.primary)
}
```

#### **Splash Screen (Localized)**
```swift
Text(NSLocalizedString("app.name", comment: "App name displayed on splash screen"))
    .font(.system(size: 54, weight: .bold))
    .fontWeight(.bold)
    .foregroundStyle(
        LinearGradient(
            gradient: Gradient(colors: [Color.blue, Color.purple]),
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    )
```

### **3. App Icon Design**

#### **SVG Structure (Light Mode)**
```svg
<svg width="1024" height="1024" viewBox="0 0 1024 1024">
  <!-- Warm cream background -->
  <rect width="1024" height="1024" fill="#FEFCF7"/>
  
  <!-- Gradient definition -->
  <defs>
    <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#007AFF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#AF52DE;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Donut shape -->
  <circle cx="512" cy="512" r="400" fill="url(#donutGradient)"/>
  <circle cx="512" cy="512" r="200" fill="#FEFCF7"/>
</svg>
```

#### **SVG Structure (Dark Mode)**
```svg
<svg width="1024" height="1024" viewBox="0 0 1024 1024">
  <!-- Very dark blue background -->
  <rect width="1024" height="1024" fill="#1A1D26"/>
  
  <!-- Same gradient definition -->
  <defs>
    <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#007AFF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#AF52DE;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Donut shape -->
  <circle cx="512" cy="512" r="400" fill="url(#donutGradient)"/>
  <circle cx="512" cy="512" r="200" fill="#1A1D26"/>
</svg>
```

#### **Icon Proportions**
- **Canvas**: 1024×1024px
- **Outer Circle**: r=400px (78% of canvas)
- **Inner Circle**: r=200px (39% of canvas)
- **Ring Width**: 200px (19.5% of canvas)
- **Mathematical Ratio**: 1:2 (inner:outer radius)

### **4. Color Palette**

#### **Primary Colors**
```swift
// Light Mode
WarmBackground: #FEFCF7    // RGB(254, 252, 247)
CardBackground: #FFFFFF     // RGB(255, 255, 255)

// Dark Mode  
WarmBackground: #1A1D26    // RGB(26, 29, 38) - Very dark blue
CardBackground: #2A2B36    // RGB(42, 43, 54) - Dark blue-gray

// Accent Color
AccentColor: #007AFF       // iOS Blue (same in both modes)
```

#### **Gradient Colors**
```swift
Blue:   #007AFF  // RGB(0, 122, 255)
Purple: #AF52DE  // RGB(175, 82, 222)
```

### **5. Typography Hierarchy**

#### **Logo Text Sizes**
- **Intro Screen**: 80pt, bold, rounded design
- **Splash Screen**: 54pt, bold
- **Main Header**: 48pt, bold
- **All use system font**: `.system(size:, weight: .bold, design: .rounded)`

#### **Supporting Text**
- **Subtitle**: 16pt, medium weight, secondary color

### **6. Web/HTML Implementation**

#### **CSS for Gradient Text**
```css
.opto-logo {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  font-weight: bold;
  font-size: 80px;
  background: linear-gradient(135deg, #007AFF 0%, #AF52DE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.opto-logo-rounded {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Rounded', system-ui, sans-serif;
  /* Use SF Pro Rounded if available */
}
```

#### **HTML Structure**
```html
<div class="opto-logo">
  <span>O</span><span>pto</span>
</div>
```

### **7. Design Generation Rules**

#### **Logo Generation Logic**
1. **Split "Opto" into "O" and "pto"** for animation flexibility
2. **Apply gradient to both parts** consistently
3. **Use rounded font design** for friendlier appearance
4. **Maintain zero spacing** between letter groups
5. **Scale proportionally** for different sizes

#### **Icon Generation Logic**
1. **Start with 1024×1024 canvas**
2. **Center circle at (512, 512)**
3. **Outer radius = 400px** (78% coverage)
4. **Inner radius = 200px** (1:2 ratio)
5. **Apply gradient top-left to bottom-right**
6. **Background matches app's theme colors**

### **8. Usage Guidelines**

#### **When to Use Each Variant**
- **Gradient Version**: Welcome screens, branding moments, hero sections
- **Primary Color Version**: Headers, navigation, everyday UI
- **Icon**: App representation, favicons, social media

#### **Consistency Rules**
- **Always use the exact gradient** (no variations)
- **Maintain proportional scaling** (don't stretch)
- **Keep letter spacing at zero** for "Opto"
- **Use rounded font design** when available

This system ensures your Opto brand looks consistent across your app, icons, and privacy policy website! 🎨✨