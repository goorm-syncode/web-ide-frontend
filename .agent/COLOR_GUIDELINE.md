# SaaS IDE Color Guideline (v3.0 - Final)

## 1. Global Theme Variables (Design Tokens)

### Light Theme (Premium SaaS)
- **Primary**: `#6366F1` (Indigo 500)
- **Primary Hover**: `#4F46E5` (Indigo 600)
- **Background (Page)**: `#F8FAFC` (Slate 50) - *Subtle gray for depth*
- **Background (Card/GNB)**: `#FFFFFF` (Pure White) - *Raised elements*
- **Text (Primary)**: `#0F172A` (Slate 900)
- **Text (Muted)**: `#94A3B8` (Slate 400)
- **Border**: `#E2E8F0` (Slate 200)

### Dark Theme (Slate Depth)
- **Primary**: `#818CF8` (Indigo 400)
- **Primary Hover**: `#6366F1` 
- **Background (Page)**: `#0F172A` (Deep Slate 900)
- **Background (Card/GNB)**: `#1E293B` (Slate 800)
- **Background (Global Input)**: `#0F172A` (Standard Dark)
- **Text (Primary)**: `#F8FAFC` (Slate 50)
- **Text (Muted)**: `#94A3B8` (Slate 400)

---

## 2. Component Specific Palette

### Difficulty Badges (Classic Premium)
| Level | Color | HEX | Mood |
| :--- | :--- | :--- | :--- |
| **Easy** | Emerald Green | `#10B981` | Intuitive, standard |
| **Medium** | Vibrant Cyan | `#06B6D4` | Modern, clean |
| **Hard** | Deep Crimson | `#BE123C` | Challenging, classic |

### Status Indicators (Brand Aligned)
| Status | Color | HEX | Implementation |
| :--- | :--- | :--- | :--- |
| **Solved** | Primary Indigo | `#6366F1` | **Brand Success** (Aligned with Primary) |
| **In Progress** | Blue | `#3B82F6` | Professional Blue |
| **Not Started** | Slate | `#64748B` | Low emphasis |

---

## 3. Interactive Elements (Premium UX)

### Problem Card Motion & Style
- **Hover Motion**: Subtle Lift (**6px**) with **Deep Purple Border (`#6D28D9`)**.
- **Hover Glow**: Soft Violet shadow tint (`rgba(109, 40, 217, 0.2)`).
- **Code Review Button**: 
  - Light Mode: `Indigo 50` BG + `Indigo 600` Text.
  - Dark Mode: `Indigo 900` BG + `Indigo 200` Text.

### Specialized Inputs
- **Home Search Bar**: **Forced White (`#FFFFFF`) Background** with **Forced Dark Text (`#0F172A`)** even in Dark Mode for maximum visibility.
- **Global Form Inputs**: Follow standard theme background (Dark in dark mode).

### IDE Toolbar (Mission Page)
- **Action Buttons (Test/Submit)**: Hover maintains **Solid White Text** (with `!important` priority).
- **Utility Buttons (Save/Reset)**: Hover switches text to `Primary Indigo` for a sophisticated feel.

---

## 4. Typography Rules
- **Headings**: `Pretendard`, 800 weight for Titles.
- **Letter Spacing**: `-0.04em` on all headings for a premium SaaS look.
- **Branding**: "Learn Code" utilizes `Primary Indigo` highlighting.
