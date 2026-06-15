---
name: Soft Logic
colors:
  surface: '#f7f9ff'
  surface-dim: '#d1dbe7'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf4ff'
  surface-container: '#e5effb'
  surface-container-high: '#dfe9f5'
  surface-container-highest: '#d9e4ef'
  on-surface: '#131d25'
  on-surface-variant: '#55423f'
  inverse-surface: '#28313a'
  inverse-on-surface: '#e7f2fe'
  outline: '#89726f'
  outline-variant: '#dcc0bc'
  surface-tint: '#9c4237'
  primary: '#9c4237'
  on-primary: '#ffffff'
  primary-container: '#ff8e7f'
  on-primary-container: '#76261d'
  inverse-primary: '#ffb4a9'
  secondary: '#256b3e'
  on-secondary: '#ffffff'
  secondary-container: '#a8f0b7'
  on-secondary-container: '#2a6f41'
  tertiary: '#5e5e5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#afaeab'
  on-tertiary-container: '#41423f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4a9'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#7e2b22'
  secondary-fixed: '#abf3b9'
  secondary-fixed-dim: '#8fd69f'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#025228'
  tertiary-fixed: '#e4e2de'
  tertiary-fixed-dim: '#c8c6c3'
  on-tertiary-fixed: '#1b1c1a'
  on-tertiary-fixed-variant: '#474744'
  background: '#f7f9ff'
  on-background: '#131d25'
  surface-variant: '#d9e4ef'
  coral-main: '#FF8E7F'
  mint-accent: '#A0E8AF'
  warm-ivory: '#FDFBF7'
  deep-slate: '#2C363F'
  soft-sky: '#E0F2F1'
  lemon-whisper: '#FFF9C4'
typography:
  display-lg:
    fontFamily: Quicksand
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Quicksand
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.5rem      #  8px
  md: 1rem        # 16px
  lg: 1.5rem      # 24px — cards, inputs, sections
  xl: 2rem        # 32px — bottom sheets (góc trên)
  2xl: 3rem       # 48px — accent lớn, hiếm dùng
  full: 9999px    # pill — buttons, badges, navbar, tags
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-xs: 4px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is built on the "Soft Logic" philosophy—a harmony between functional precision and emotional warmth. It targets the Vietnamese market, focusing on lifestyle, education, or wellness applications that require a friendly yet organized interface. 

The aesthetic is a blend of **Minimalism** and **Glassmorphism**, characterized by expansive white space, a soothing pastel palette, and physical metaphors such as "floating" layers. The goal is to reduce cognitive load and evoke a sense of calm, optimism, and approachability. Every interaction should feel soft and forgiving, moving away from the rigid structures of traditional enterprise software toward a more human-centric experience.

## Colors
The palette is anchored by **Coral** (#FF8E7F), used for primary actions and brand emphasis. **Mint** serves as a refreshing secondary color for success states or supporting highlights. **Warm Ivory** acts as the primary background surface in light mode to provide a softer look than pure white, while **Deep Slate** provides high-contrast legibility for typography.

In **Dark Mode**, Deep Slate becomes the primary surface, while the primary Coral is slightly desaturated to maintain accessibility. Surface colors should use high-transparency overlays of the brand colors to maintain the "Soft Logic" feel even in dark environments. Pastel variations of the primary and secondary colors should be used for background washes in chips or alerts.

## Typography
This design system utilizes a dual-font approach optimized for Vietnamese legibility. **Quicksand** is used for headings and display text; its rounded terminals perfectly complement the shape language. **Nunito Sans** is used for body copy and UI labels, offering high readability with its balanced proportions and open counters.

Headlines should use tighter tracking to appear cohesive, while labels and small captions should have a slight positive letter spacing for clarity. In mobile views, display sizes scale down significantly to ensure text does not wrap awkwardly on smaller screens.

## Layout & Spacing
The layout follows a **Fluid Grid** model with an 8px base unit. Layouts are airy, prioritizing generous vertical spacing ("stacking") to create a sense of breathing room. 

- **Desktop:** 12-column grid, 24px gutters, 64px minimum side margins.
- **Tablet:** 8-column grid, 20px gutters, 40px side margins.
- **Mobile:** 4-column grid, 16px gutters, 20px side margins.

Content groups should use the "Stack" tokens to maintain vertical rhythm. Larger components like cards or hero sections should utilize `stack-lg` for separation, while internal card elements use `stack-sm`.

## Elevation & Depth
Depth is achieved through **Ambient Shadows** and **Tonal Layers**. This system avoids harsh shadows, opting for multi-layered, diffused blurs that mimic natural light falling on soft surfaces.

1.  **Level 0 (Base):** Warm Ivory surface.
2.  **Level 1 (Floating):** Used for cards. Shadow: `0 8px 24px rgba(44, 54, 63, 0.04)`.
3.  **Level 2 (Interactive):** Used for hovered elements or active chips. Shadow: `0 12px 32px rgba(255, 142, 127, 0.12)`.
4.  **Level 3 (Modal/Overlay):** Used for dialogs. Requires a backdrop blur (12px) to create a glassmorphic separation from the content below.

Edges are never sharp; use subtle 1px inner strokes in a lighter tint of the neutral color to define boundaries on white backgrounds.

## Shapes
The shape language is soft and rounded, but **not pill-shaped for large surfaces**. The standard corner radius for cards and inputs is **24px**. Buttons, badges, and tags use **full pill** (`rounded-full`).

### Radius tokens (Design System)

| Token | Giá trị | Tailwind (Ankiva) | Dùng cho |
|-------|---------|-------------------|----------|
| `sm` | 8px | `rounded-sm` | Checkbox, element UI nhỏ |
| `md` | 16px | `rounded-md` | Panel con, highlight, icon box, sort panel |
| `lg` | **24px** | `rounded-lg` | **Cards, sections, inputs, search bar, dialog** |
| `xl` | 32px | `rounded-xl` | Bottom sheet — chỉ bo góc trên |
| `2xl` | 48px | `rounded-2xl` | Accent lớn — **hiếm dùng**, tránh dùng cho card |
| `full` | pill | `rounded-full` | **Buttons, badges, navbar, chips/tags** |

> **Lưu ý triển khai (Ankiva Web):** Không dùng `rounded-2xl` / `rounded-3xl` cho card — các class này map tới 48px và làm card trông bo tròn quá mức. Utility `.rounded-card` trong `globals.css` = `rounded-lg` (24px).

### Quy tắc nhanh

- **Cards / sections** → `rounded-lg` (24px)
- **Input, search bar** → `rounded-lg` (24px)
- **Panel con, highlight, icon box** → `rounded-md` (16px)
- **Buttons, badges, navbar, tags** → `rounded-full` (pill)

Container elements that sit at the bottom of the screen (like mobile sheets) should only have the top corners rounded to **32px** (`rounded-xl`), creating a "cradle" effect for content.

## Components
- **Buttons:** Primary buttons use the Coral (#FF8E7F) fill with white text. They are **pill-shaped** (`rounded-full`) and feature a subtle bottom-heavy shadow. On press, they should slightly scale down (98%).
- **Input Fields:** Use **24px** corner radius (`rounded-lg`). Background should be a very faint tint of the Neutral color (5% opacity) or pure white with a soft 1px border. Focus states use a Mint (#A0E8AF) glow.
- **Cards:** The signature "Floating" element. Cards must have a **24px** radius (`rounded-lg`), white or light ivory background, and Level 1 shadow. Padding inside cards should be generous (default 32px).
- **Chips/Tags:** Use secondary pastel colors (e.g., light Mint or soft Coral) with high-contrast text. They are fully rounded (`rounded-full`).
- **Floating Action Buttons (FAB):** Highly recommended for primary workflows. These should use the Level 2 shadow and the Primary Coral color.
- **Progress Bars:** Use thick (12px), fully rounded tracks. The filled portion should use a gradient of Primary to Secondary colors to denote energy and movement.