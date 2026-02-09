// ═══════════════════════════════════════════════════════════════
// SAVAGE WORLDS BUILD RULES ENGINE v1.0
// ═══════════════════════════════════════════════════════════════
// Single source of truth for character validation.
// Used by: builder.html, character-db.html
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  var DICE = [4, 6, 8, 10, 12];

  // Cost to raise a die from `from` to `to` in single steps
  function dieCost(from, to) {
    var fi = from > 12 ? 4 + (from - 12) : DICE.indexOf(from);
    var ti = to > 12 ? 4 + (to - 12) : DICE.indexOf(to);
    return Math.max(0, ti - fi);
  }

  // ── ATTRIBUTE BUDGET ──
  // Base 5 points + ancestry bonus + hindrance attr allocations.
  // Each step above starting die costs 1 point.
  function calcAttributeBudget(attrs, ancestryData, hindAllocAttrs) {
    var anc = ancestryData || {};
    var base = 5 + (anc.attrBonus || 0) + (hindAllocAttrs || 0);
    var starts = anc.startAttrs || {};
    var spent = 0;
    ['agility', 'smarts', 'spirit', 'strength', 'vigor'].forEach(function(a) {
      var startDie = starts[a] || 4;
      var current = attrs[a] || 4;
      spent += dieCost(startDie, current);
    });
    return { total: base, spent: spent, remaining: base - spent };
  }

  // ── SKILL BUDGET ──
  // 12 base + hindrance skill allocations.
  // Core skills (Athletics, Common Knowledge, Notice, Persuasion, Stealth)
  // start at d4 free — no cost for d4 on core skills.
  // Each step costs 1 if target <= linked attribute die, 2 if above.
  function calcSkillBudget(skills, attrs, skillLinks, coreSkills, hindAllocSkills) {
    var spent = 0;
    Object.keys(skills).forEach(function(sk) {
      var die = skills[sk];
      if (die <= 0) return;

      var linked = skillLinks[sk];
      var linkedDie = linked ? (attrs[linked] || 4) : 4;
      var isCore = coreSkills.indexOf(sk) >= 0;

      if (!isCore) {
        // Non-core: d4 costs 1 point, then each step after
        var cost = 1;
        var cur = 4;
        while (cur < die) {
          var next = DICE[DICE.indexOf(cur) + 1];
          cost += (next > linkedDie) ? 2 : 1;
          cur = next;
        }
        spent += cost;
      } else {
        // Core: d4 is free, each step above d4 costs normally
        var cur2 = 4;
        while (cur2 < die) {
          var next2 = DICE[DICE.indexOf(cur2) + 1];
          spent += (next2 > linkedDie) ? 2 : 1;
          cur2 = next2;
        }
      }
    });
    return { total: 12 + (hindAllocSkills || 0), spent: spent, remaining: 12 + (hindAllocSkills || 0) - spent };
  }

  // ── HINDRANCE POINTS ──
  // Major = 2 points, Minor = 1. Capped at 4 effective.
  function calcHindrancePoints(hindrances, severities) {
    var majorCount = 0, minorCount = 0;

    if (severities) {
      // Builder style: array of names + separate severities object
      hindrances.forEach(function(h) {
        if (severities[h] === 'Major') majorCount++;
        else minorCount++;
      });
    } else {
      // NPC Database style: array of strings possibly containing "(Major)" or "(Minor)"
      hindrances.forEach(function(h) {
        if (/major/i.test(h)) majorCount++;
        else minorCount++;
      });
    }

    var raw = majorCount * 2 + minorCount;
    return {
      raw: raw,
      effective: Math.min(raw, 4),
      majorCount: majorCount,
      minorCount: minorCount
    };
  }

  // ── EDGE BUDGET ──
  // 1 base + ancestry free edges + hindrance edge allocations (2 pts each).
  function calcEdgeBudget(edgeCount, ancestryData, hindAllocEdges) {
    var anc = ancestryData || {};
    var total = 1 + (anc.freeEdges || 0) + (hindAllocEdges || 0);
    return { total: total, spent: edgeCount, remaining: total - edgeCount };
  }

  // ── DERIVED STATISTICS ──
  function calcDerived(attrs, skills, ancestryData, gear) {
    var anc = ancestryData || { pace: 6, size: 0, toughMod: 0 };
    var fightingDie = skills['Fighting'] || 0;
    var shieldParry = 0;
    var wornArmor = 0;

    if (gear && gear.length) {
      gear.forEach(function(g) {
        if (g.parry && g.parry > shieldParry) shieldParry = g.parry;
        if (g.armor && g.armor > wornArmor) wornArmor = g.armor;
      });
    }

    return {
      pace: anc.pace || 6,
      parry: (fightingDie > 0 ? 2 + Math.floor(fightingDie / 2) : 2) + shieldParry,
      toughness: 2 + Math.floor((attrs.vigor || 4) / 2) + (anc.toughMod || 0) + (anc.size || 0),
      armor: wornArmor + (anc.naturalArmor || 0),
      size: anc.size || 0,
      runDie: anc.runDie || 6
    };
  }

  // ── FULL BUILD AUDIT ──
  // Returns array of { section, label, pass, detail } objects.
  // Works with both builder data and NPC database data.
  function runBuildAudit(opts) {
    var attrs = opts.attrs || { agility: 4, smarts: 4, spirit: 4, strength: 4, vigor: 4 };
    var skills = opts.skills || {};
    var edges = opts.edges || [];
    var hindrances = opts.hindrances || [];
    var tier = opts.tier || 'Wild Card';
    var ancestryData = opts.ancestryData || { attrBonus: 1, freeEdges: 1, pace: 6, size: 0, toughMod: 0 };
    var skillLinks = opts.skillLinks || {};
    var coreSkills = opts.coreSkills || ['Athletics', 'Common Knowledge', 'Notice', 'Persuasion', 'Stealth'];
    var severities = opts.hindranceSeverities || null;
    var hindAlloc = opts.hindAlloc || null;
    var currentPace = opts.pace;
    var currentParry = opts.parry;
    var currentToughness = opts.toughness;
    var currentToughnessArmor = opts.toughnessArmor || 0;
    var gear = opts.gear || [];

    var results = [];

    // ── Derived Statistics ──
    var derived = calcDerived(attrs, skills, ancestryData, gear);

    if (typeof currentPace === 'number') {
      results.push({
        section: 'Derived Statistics',
        label: 'Pace ' + currentPace,
        pass: currentPace === derived.pace,
        detail: currentPace === derived.pace ? '✓' : 'Expected ' + derived.pace
      });
    }
    if (typeof currentParry === 'number') {
      var fDie = skills['Fighting'] || 0;
      results.push({
        section: 'Derived Statistics',
        label: 'Parry ' + currentParry + ' = 2 + ' + (fDie > 0 ? 'd' + fDie : '—') + '÷2',
        pass: currentParry === derived.parry,
        detail: currentParry === derived.parry ? '✓' : 'Expected ' + derived.parry
      });
    }
    if (typeof currentToughness === 'number') {
      var expTough = derived.toughness + currentToughnessArmor;
      results.push({
        section: 'Derived Statistics',
        label: 'Toughness ' + currentToughness,
        pass: currentToughness === expTough,
        detail: currentToughness === expTough ? '✓' : 'Expected ' + expTough
      });
    }

    // ── Attribute Budget ──
    var hindAllocAttrs = hindAlloc ? hindAlloc.attrs : 0;
    // If no explicit hindrance allocation, try to infer from overspend
    var attrBudget = calcAttributeBudget(attrs, ancestryData, hindAllocAttrs);
    if (!hindAlloc && attrBudget.spent > attrBudget.total) {
      // Infer: each 2 hindrance points can buy 1 attr point
      var hindPts = calcHindrancePoints(hindrances, severities);
      var attrOverspend = attrBudget.spent - attrBudget.total;
      var possibleFromHindrances = Math.floor(hindPts.effective / 2);
      if (attrOverspend <= possibleFromHindrances) {
        attrBudget = calcAttributeBudget(attrs, ancestryData, attrOverspend);
      }
    }
    results.push({
      section: 'Attribute Budget',
      label: 'Attribute points: ' + attrBudget.spent + '/' + attrBudget.total,
      pass: attrBudget.spent <= attrBudget.total,
      detail: attrBudget.spent <= attrBudget.total ? '✓' : 'Over budget'
    });

    // ── Hindrance Limits ──
    var hindPtsResult = calcHindrancePoints(hindrances, severities);
    results.push({
      section: 'Hindrance Limits',
      label: 'Hindrance points: ' + hindPtsResult.effective + '/4 effective (' + hindPtsResult.majorCount + ' Major, ' + hindPtsResult.minorCount + ' Minor)',
      pass: hindPtsResult.effective <= 4,
      detail: hindPtsResult.effective <= 4 ? '✓' : 'Max 4 effective points'
    });

    // ── Skill Budget ──
    var hindAllocSkills = hindAlloc ? hindAlloc.skills : 0;
    var skillBudget = calcSkillBudget(skills, attrs, skillLinks, coreSkills, hindAllocSkills);
    if (!hindAlloc && skillBudget.spent > skillBudget.total) {
      // Infer: each 1 hindrance point can buy 1 skill point
      var hindPts2 = calcHindrancePoints(hindrances, severities);
      var skillOverspend = skillBudget.spent - skillBudget.total;
      var hindPtsRemaining = hindPts2.effective - (attrBudget.total - 5 - (ancestryData.attrBonus || 0)) * 2;
      if (hindPtsRemaining < 0) hindPtsRemaining = hindPts2.effective;
      if (skillOverspend <= hindPtsRemaining) {
        skillBudget = calcSkillBudget(skills, attrs, skillLinks, coreSkills, skillOverspend);
      }
    }
    results.push({
      section: 'Skill Budget',
      label: 'Skill points: ' + skillBudget.spent + '/' + skillBudget.total,
      pass: skillBudget.spent <= skillBudget.total,
      detail: skillBudget.spent <= skillBudget.total ? '✓' : (skillBudget.spent <= skillBudget.total + 4 ? 'Over — hindrance spend?' : 'Significantly over')
    });

    // ── Combined Hindrance Spend ──
    if (!hindAlloc) {
      var hindPts3 = calcHindrancePoints(hindrances, severities);
      var inferredAttrSpend = Math.max(0, attrBudget.total - 5 - (ancestryData.attrBonus || 0));
      var inferredSkillSpend = Math.max(0, skillBudget.total - 12);
      var edgeOverspend = Math.max(0, edges.length - 1 - (ancestryData.freeEdges || 0));
      var totalHindSpend = inferredAttrSpend * 2 + inferredSkillSpend + edgeOverspend * 2;
      results.push({
        section: 'Combined Hindrance Spend',
        label: 'Hindrance allocation: ' + totalHindSpend + '/' + hindPts3.effective + ' pts used' +
          (inferredAttrSpend > 0 ? ' (' + inferredAttrSpend + ' attr×2)' : '') +
          (inferredSkillSpend > 0 ? ' (' + inferredSkillSpend + ' skill)' : '') +
          (edgeOverspend > 0 ? ' (' + edgeOverspend + ' edges×2)' : ''),
        pass: totalHindSpend <= hindPts3.effective,
        detail: totalHindSpend <= hindPts3.effective ? '✓' : 'Over hindrance budget'
      });
    }

    // ── Edge Budget ──
    var hindAllocEdges = hindAlloc ? hindAlloc.edges : 0;
    var edgeBudget = calcEdgeBudget(edges.length, ancestryData, hindAllocEdges);
    if (!hindAlloc && edgeBudget.spent > edgeBudget.total) {
      // Infer edge purchases from hindrances
      var hindPts4 = calcHindrancePoints(hindrances, severities);
      var edgeOver = edgeBudget.spent - edgeBudget.total;
      edgeBudget = calcEdgeBudget(edges.length, ancestryData, edgeOver);
    }
    results.push({
      section: 'Edge Budget',
      label: 'Edge count: ' + edgeBudget.spent + '/' + edgeBudget.total +
        ' (' + (1 + (ancestryData.freeEdges || 0)) + ' base' +
        (hindAllocEdges || (edgeBudget.total - 1 - (ancestryData.freeEdges || 0)) > 0 ?
          ' + ' + (edgeBudget.total - 1 - (ancestryData.freeEdges || 0)) + ' from Hindrances' : '') + ')',
      pass: edgeBudget.spent <= edgeBudget.total,
      detail: edgeBudget.spent <= edgeBudget.total ? '✓' : 'Check budget'
    });

    // ── Optimisation Warnings ──
    var ancestry = opts.ancestry || '';
    if (!ancestry || ancestry === '' || ancestry === '?') {
      results.push({
        section: 'Optimisation',
        label: 'Ancestry not set',
        pass: true, warn: true,
        detail: 'Set ancestry — affects attribute budget and free edges'
      });
    }

    // Unspent attribute points
    var attrUnspent = attrBudget.total - attrBudget.spent;
    if (attrUnspent > 0) {
      results.push({
        section: 'Optimisation',
        label: attrUnspent + ' attribute point' + (attrUnspent > 1 ? 's' : '') + ' unspent',
        pass: true, warn: true,
        detail: attrBudget.spent + '/' + attrBudget.total + ' used'
      });
    }

    // Unspent skill points
    var skillUnspent = skillBudget.total - skillBudget.spent;
    if (skillUnspent > 0) {
      results.push({
        section: 'Optimisation',
        label: skillUnspent + ' skill point' + (skillUnspent > 1 ? 's' : '') + ' unspent',
        pass: true, warn: true,
        detail: skillBudget.spent + '/' + skillBudget.total + ' used'
      });
    }

    // Unspent hindrance points
    if (!hindAlloc) {
      var hindTotal = hindPtsResult.effective;
      var inferAttr2 = Math.max(0, attrBudget.total - 5 - (ancestryData.attrBonus || 0));
      var inferSkill2 = Math.max(0, skillBudget.total - 12);
      var inferEdge2 = Math.max(0, edges.length - 1 - (ancestryData.freeEdges || 0));
      var hindSpent = inferAttr2 * 2 + inferSkill2 + inferEdge2 * 2;
      var hindUnspent = hindTotal - hindSpent;
      if (hindUnspent > 0) {
        results.push({
          section: 'Optimisation',
          label: hindUnspent + ' hindrance point' + (hindUnspent > 1 ? 's' : '') + ' unallocated',
          pass: true, warn: true,
          detail: hindSpent + '/' + hindTotal + ' used — could buy ' +
            (hindUnspent >= 2 ? Math.floor(hindUnspent / 2) + ' attr or ' + Math.floor(hindUnspent / 2) + ' edges, or ' : '') +
            hindUnspent + ' skill pts'
        });
      }
    }

    return results;
  }

  // ── EXPORT ──
  window.SWADERules = {
    DICE: DICE,
    dieCost: dieCost,
    calcAttributeBudget: calcAttributeBudget,
    calcSkillBudget: calcSkillBudget,
    calcHindrancePoints: calcHindrancePoints,
    calcEdgeBudget: calcEdgeBudget,
    calcDerived: calcDerived,
    runBuildAudit: runBuildAudit
  };

})();
