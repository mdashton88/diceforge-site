# Vehicle Forge Armour v2 — Design Specification
## Frozen: v6.7 (commit 15093f7, tag v6.7)

---

## OVERVIEW

Replace the current Armour Technology buttons + Hull Plating/Composite Layering/Reinforced Frame
mods with two intuitive sliders plus overflow buttons.

**Design Philosophy:** Match the weapon UX — see it, adjust it, done. No material descriptions,
no tech tiers. Labels describe relative protection, not construction. The fiction is the GM's.

---

## TWO SLIDERS

### 1. Toughness Slider
- Controls structural mass/solidity (the non-armour portion of total Toughness)
- Range: -5 to +5 with overflow +/- buttons
- Base (position 0) = Size + 5 (universal across domains)
- Step size = max(1, round(Size / 4) + 1)
- Labels: Fragile / Flimsy / Lightweight / Light / Slightly Light / **Standard** / Sturdy / Robust / Very Tough / Extremely Tough / Ironclad
- Overflow: "Ironclad +1", "Ironclad +2" etc.

### 2. Armour Slider
- Controls protective plating (the parenthetical value, what AP reduces)
- Range: -5 to +5 with overflow +/- buttons
- Base and step are DOMAIN-AWARE (keyed off locomotion group)
- Labels: Unprotected / Minimal / Light / Below Average / Modest / **Standard** / Reinforced / Heavy / Superior / Extreme / Maximum
- Overflow: "Maximum +1", "Maximum +2" etc. (like d12+X)

---

## DOMAIN-AWARE ARMOUR BASELINES

### Ground / Walker
| Size | Base | Step | -5 | 0 | +5 |
|------|------|------|----|---|-----|
| 0 | 2 | 1 | -3 | 2 | 7 |
| 3 | 3 | 1 | -2 | 3 | 8 |
| 4 | 4 | 2 | -6 | 4 | 14 |
| 6 | 12 | 2 | 2 | 12 | 22 |
| 8 | 16 | 3 | 1 | 16 | 31 |
| 10 | 20 | 4 | 0 | 20 | 40 |
| 12 | 24 | 5 | -1 | 24 | 49 |
| 14 | 28 | 6 | -2 | 28 | 58 |

Full table:
```
{-2:1, -1:1, 0:2, 1:2, 2:2, 3:3, 4:4, 5:5,
 6:12, 7:14, 8:16, 9:18, 10:20, 11:22, 12:24, 13:26, 14:28}
Step: {-2:1, -1:1, 0:1, 1:1, 2:1, 3:1, 4:2, 5:2,
       6:2, 7:3, 8:3, 9:4, 10:4, 11:4, 12:5, 13:5, 14:6}
```

### Water
| Size | Base | Step | Notes |
|------|------|------|-------|
| 0-11 | 1-5 | sz/3 | Small craft, patrol boats |
| 12-16 | 6-8 | 4 | Corvettes, frigates |
| 17+ | 18-46 | 4 | Destroyers through carriers |

Full table:
```
{0:1, 2:2, 4:4, 6:4, 7:4, 8:5, 11:5,
 12:6, 15:7, 16:8,
 17:18, 18:20, 19:28, 20:36, 21:38, 22:40, 23:42, 24:44, 25:46}
Step: sz<=11: max(1,round(sz/3)), sz<=16: 4, sz>16: 4
```

### Space
| Size | Base | Step |
|------|------|------|
| 16 | 10 | 2 |
| 17-25 | 20-50 | 4 |

Full table:
```
{16:10, 17:20, 18:24, 19:32, 20:40, 21:42, 22:44, 23:46, 24:48, 25:50}
Step: sz<=16: 2, sz>16: 4
```

---

## TOUGHNESS DISPLAY FORMAT

**Savage Worlds canonical format:** Total (Armour)
- "Toughness: 32 (16)" = total 32, of which 16 is Armour
- Total = Structural + Armour
- Structural = struct_base + (t_pos × struct_step)
- Armour = arm_base + (a_pos × arm_step)
- AP reduces Armour only, never structural

**Current tool is BACKWARDS** — displays base (total). Must fix.

---

## CANON VALIDATION

94.1% accuracy within 2 points across 102 canon vehicles.
Only 6 vehicles need overflow beyond ±5 (max overflow: +10 for SFC Battleship).

Key mappings:
- Car → Toughness Standard, Armour Modest
- Sherman → Toughness Sturdy, Armour Standard
- Abrams → Toughness Robust, Armour Maximum
- SFC MBT → Toughness Robust, Armour Heavy
- SFC Destroyer → Toughness Sturdy, Armour Maximum +3
- SFC Battleship → Toughness Standard, Armour Maximum +5
- Future MBT → Toughness Robust, Armour Maximum

---

## WHAT TO REMOVE

- Armour Technology buttons (Primitive/Forged/Industrial/Composite/Nanoweave/Exotic)
- AT_INFO data structure
- Hull Plating mod
- Composite Layering mod
- Reinforced Frame mod
- All armourTech references in state/save/load/export/undo/redo

---

## WHAT TO ADD

- Toughness slider (HTML range input -5 to +5)
- Toughness +/- overflow buttons
- Armour slider (HTML range input -5 to +5)
- Armour +/- overflow buttons
- Label display for each slider (updates live)
- Description display for each slider (contextual guidance)
- Armour bonus display showing actual value
- Domain-aware base/step calculation functions
- Updated calcArmor() using new system
- Updated calcTough() using new system (or new calcStructural)
- Fixed display format: Total (Armour) not Base (Total)

---

## STATE CHANGES

Replace `S.armourTech` (integer 0-5) with:
- `S.toughLevel` (integer, default 0, no min/max — overflow allowed)
- `S.armourLevel` (integer, default 0, no min/max — overflow allowed)

---

## OPEN QUESTION (Next Session)

Does overflow beyond +5 consume mod slots? Options:
1. All slider positions are free, overflow costs mods
2. Everything is free (simplest)
3. Positions beyond 0 cost progressively more mods
4. Only extreme overflow (beyond +7?) costs mods

---

## COST SCALING (To Design)

How does armour level affect vehicle cost? Options:
1. Cost multiplier per position (current AT system approach)
2. Flat cost per step
3. Escalating cost (each additional step costs more)
4. Free within slider, cost only on overflow

---

## FILES TO MODIFY

- combat-vehicle-forge.html (main tool)
- VF-Companion-Guide (manual — needs v7 update)

