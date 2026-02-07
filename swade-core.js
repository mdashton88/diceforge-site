// ═══════════════════════════════════════════════════════════════
// SAVAGE WORLDS CORE RULES — Data Module
// ═══════════════════════════════════════════════════════════════
// Self-registering module for CharacterForge engine.
// Contains all character creation options from the SWADE core rulebook.
// ═══════════════════════════════════════════════════════════════

(function() {
  var CF = window.CharacterForge;
  if (!CF || !CF.registerModule) { console.error('CharacterForge engine not loaded'); return; }

  CF.registerModule({
    id: 'swade-core',
    name: 'Savage Worlds Core Rules',
    description: 'Core ancestries, edges, hindrances, powers, and equipment from the Savage Worlds Adventure Edition rulebook.',
    alwaysOn: true,
    colour: '#C4A44A',

    // ── SKILL DEFINITIONS ──
    // Only the core module should define skill links; supplements add to them if needed
    skillLinks: {
      'Athletics':'agility', 'Boating':'agility', 'Driving':'agility', 'Fighting':'agility',
      'Piloting':'agility', 'Riding':'agility', 'Shooting':'agility', 'Stealth':'agility', 'Thievery':'agility',
      'Academics':'smarts', 'Battle':'smarts', 'Common Knowledge':'smarts', 'Electronics':'smarts',
      'Gambling':'smarts', 'Hacking':'smarts', 'Healing':'smarts', 'Language':'smarts',
      'Notice':'smarts', 'Occult':'smarts', 'Repair':'smarts', 'Research':'smarts',
      'Science':'smarts', 'Spellcasting':'smarts', 'Weird Science':'smarts', 'Taunt':'smarts',
      'Faith':'spirit', 'Focus':'spirit', 'Intimidation':'spirit', 'Performance':'spirit',
      'Persuasion':'spirit', 'Survival':'spirit'
    },
    coreSkills: ['Athletics','Common Knowledge','Notice','Persuasion','Stealth'],

    // ── ANCESTRIES ──
    ancestries: {
      'Human': {
        summary: 'Adaptable. One free Novice Edge, +1 attribute point.',
        abilities: ['Adaptable — one free Novice Edge and one additional attribute point'],
        attrBonus: 1, freeEdges: 1, pace: 6, size: 0, toughMod: 0
      },
      'Aquarian': {
        summary: 'Aquatic (Swim Pace 10), Dependency (water), Low Light Vision, Toughness +1.',
        abilities: ['Aquatic — Swim Pace 10, cannot drown','Dependency — immerse in water 1hr/day or Fatigue','Low Light Vision','Tough — +1 Toughness'],
        attrBonus: 0, freeEdges: 0, pace: 6, size: 0, toughMod: 1
      },
      'Avian': {
        summary: 'Flight (Pace 12), Hollow Bones, Keen Eyes, Reduced Pace (4).',
        abilities: ['Flight — Flying Pace 12, Climb 4','Hollow Bones — Toughness -1','Keen Eyes — +2 Notice (sight)','Reduced Pace — Pace 4, d4 running die'],
        attrBonus: 0, freeEdges: 0, pace: 4, size: 0, toughMod: -1, runDie: 4
      },
      'Dwarf': {
        summary: 'Low Light Vision, Slow (Pace 5), Tough (+2 Toughness).',
        abilities: ['Low Light Vision','Slow — Pace 5, d4 running die','Tough — +2 Toughness'],
        attrBonus: 0, freeEdges: 0, pace: 5, size: 0, toughMod: 2, runDie: 4
      },
      'Elf': {
        summary: 'Agile (Agility d6), All Thumbs, Low Light Vision.',
        abilities: ['Agile — Agility starts at d6','All Thumbs — -2 with mechanical devices','Low Light Vision'],
        attrBonus: 0, freeEdges: 0, pace: 6, size: 0, toughMod: 0, startAttrs: {agility: 6}
      },
      'Half-Elf': {
        summary: 'Heritage (one free Edge, may ignore one Rank req), Outsider (Minor).',
        abilities: ['Heritage — one free Novice Edge, may ignore one Rank requirement','Outsider (Minor) — -2 Persuasion with all but own kind'],
        attrBonus: 0, freeEdges: 1, pace: 6, size: 0, toughMod: 0
      },
      'Half-Folk': {
        summary: 'Luck (+1 Benny), Spirited (Spirit d6), Size -1.',
        abilities: ['Luck — +1 Benny per session','Spirited — Spirit starts at d6','Size -1'],
        attrBonus: 0, freeEdges: 0, pace: 6, size: -1, toughMod: 0, startAttrs: {spirit: 6}, bonusBennies: 1
      },
      'Rakashan': {
        summary: 'Bite/Claws (Str+d4), Bloodthirsty (Minor), Low Light Vision, Racial Enemy.',
        abilities: ['Bite/Claws — Str+d4','Bloodthirsty (Minor)','Low Light Vision','Racial Enemy — -4 Charisma with one enemy'],
        attrBonus: 0, freeEdges: 0, pace: 6, size: 0, toughMod: 0
      },
      'Saurian': {
        summary: 'Armour +2, Bite (Str+d4), Environmental Weakness (Cold), Keen Senses, Outsider (Minor).',
        abilities: ['Natural Armour +2','Bite — Str+d4','Environmental Weakness (Cold)','Keen Senses — +2 Notice (smell/taste)','Outsider (Minor)'],
        attrBonus: 0, freeEdges: 0, pace: 6, size: 0, toughMod: 0
      }
    },

    // ── EDGES ──
    edges: [
      // Background
      {name:'Alertness',rank:'N',reqs:'—',cat:'Background'},
      {name:'Ambidextrous',rank:'N',reqs:'Agility d8+',cat:'Background'},
      {name:'Arcane Background',rank:'N',reqs:'Special',cat:'Background'},
      {name:'Arcane Resistance',rank:'N',reqs:'Spirit d8+',cat:'Background'},
      {name:'Aristocrat',rank:'N',reqs:'—',cat:'Background'},
      {name:'Attractive',rank:'N',reqs:'Vigor d6+',cat:'Background'},
      {name:'Berserk',rank:'N',reqs:'—',cat:'Background'},
      {name:'Brave',rank:'N',reqs:'Spirit d6+',cat:'Background'},
      {name:'Brawny',rank:'N',reqs:'Str d6+, Vig d6+',cat:'Background'},
      {name:'Charismatic',rank:'N',reqs:'Spirit d8+',cat:'Background'},
      {name:'Elan',rank:'N',reqs:'Spirit d8+',cat:'Background'},
      {name:'Fleet-Footed',rank:'N',reqs:'Agility d6+',cat:'Background'},
      {name:'Linguist',rank:'N',reqs:'Smarts d6+',cat:'Background'},
      {name:'Luck',rank:'N',reqs:'—',cat:'Background'},
      {name:'Quick',rank:'N',reqs:'Agility d8+',cat:'Background'},
      {name:'Rich',rank:'N',reqs:'—',cat:'Background'},
      // Combat
      {name:'Block',rank:'S',reqs:'Fighting d8+',cat:'Combat'},
      {name:'Brawler',rank:'N',reqs:'Str d8+, Vig d8+',cat:'Combat'},
      {name:'Combat Reflexes',rank:'S',reqs:'—',cat:'Combat'},
      {name:'Counterattack',rank:'S',reqs:'Fighting d8+',cat:'Combat'},
      {name:'Dead Shot',rank:'S',reqs:'Shooting d8+',cat:'Combat'},
      {name:'Dodge',rank:'S',reqs:'Agility d8+',cat:'Combat'},
      {name:'Extraction',rank:'N',reqs:'Agility d8+',cat:'Combat'},
      {name:'Feint',rank:'N',reqs:'Fighting d8+',cat:'Combat'},
      {name:'First Strike',rank:'N',reqs:'Agility d8+',cat:'Combat'},
      {name:'Frenzy',rank:'S',reqs:'Fighting d8+',cat:'Combat'},
      {name:'Hard to Kill',rank:'N',reqs:'Spirit d8+',cat:'Combat'},
      {name:'Level Headed',rank:'S',reqs:'Smarts d8+',cat:'Combat'},
      {name:'Marksman',rank:'S',reqs:'Shooting d8+',cat:'Combat'},
      {name:'Mighty Blow',rank:'S',reqs:'Fighting d8+',cat:'Combat'},
      {name:'Nerves of Steel',rank:'N',reqs:'Vigor d8+',cat:'Combat'},
      {name:'No Mercy',rank:'S',reqs:'—',cat:'Combat'},
      {name:'Sweep',rank:'N',reqs:'Str d8+, Fighting d8+',cat:'Combat'},
      {name:'Trademark Weapon',rank:'N',reqs:'Fighting or Shooting d8+',cat:'Combat'},
      {name:'Two-Fisted',rank:'N',reqs:'Agility d8+',cat:'Combat'},
      // Leadership
      {name:'Command',rank:'N',reqs:'Smarts d6+',cat:'Leadership'},
      {name:'Command Presence',rank:'S',reqs:'Command',cat:'Leadership'},
      {name:'Fervor',rank:'V',reqs:'Command, Spirit d8+',cat:'Leadership'},
      {name:'Hold the Line!',rank:'S',reqs:'Command, Smarts d8+',cat:'Leadership'},
      {name:'Inspire',rank:'S',reqs:'Command',cat:'Leadership'},
      {name:'Natural Leader',rank:'S',reqs:'Command, Spirit d8+',cat:'Leadership'},
      {name:'Tactician',rank:'S',reqs:'Command, Smarts d8+',cat:'Leadership'},
      // Power
      {name:'New Powers',rank:'N',reqs:'Arcane Background',cat:'Power',stackable:true},
      {name:'Power Points',rank:'N',reqs:'Arcane Background',cat:'Power',stackable:true},
      {name:'Rapid Recharge',rank:'S',reqs:'AB, Spirit d6+',cat:'Power'},
      {name:'Soul Drain',rank:'S',reqs:'AB, arcane d10+',cat:'Power'},
      // Professional
      {name:'Acrobat',rank:'N',reqs:'Agility d8+, Athletics d8+',cat:'Professional'},
      {name:'Assassin',rank:'N',reqs:'Agility d8+, Fighting d6+, Stealth d8+',cat:'Professional'},
      {name:'Champion',rank:'N',reqs:'Spirit d8+, Fighting d6+',cat:'Professional'},
      {name:'Healer',rank:'N',reqs:'Spirit d8+',cat:'Professional'},
      {name:'Holy/Unholy Warrior',rank:'N',reqs:'Spirit d8+, Faith d6+',cat:'Professional'},
      {name:'Investigator',rank:'N',reqs:'Smarts d8+, Research d8+',cat:'Professional'},
      {name:'Scholar',rank:'N',reqs:'Smarts d8+',cat:'Professional'},
      {name:'Soldier',rank:'N',reqs:'Str d6+, Vig d6+',cat:'Professional'},
      {name:'Thief',rank:'N',reqs:'Agility d8+, Stealth d6+, Thievery d6+',cat:'Professional'},
      {name:'Woodsman',rank:'N',reqs:'Spirit d6+, Survival d8+',cat:'Professional'},
      // Social
      {name:'Bolster',rank:'N',reqs:'Spirit d8+',cat:'Social'},
      {name:'Common Bond',rank:'N',reqs:'Spirit d8+',cat:'Social'},
      {name:'Connections',rank:'N',reqs:'—',cat:'Social'},
      {name:'Humiliate',rank:'S',reqs:'Taunt d8+',cat:'Social'},
      {name:'Menacing',rank:'N',reqs:'—',cat:'Social'},
      {name:'Provoke',rank:'N',reqs:'Taunt d6+',cat:'Social'},
      {name:'Streetwise',rank:'N',reqs:'Smarts d6+',cat:'Social'},
      {name:'Strong Willed',rank:'N',reqs:'Spirit d8+',cat:'Social'}
    ],

    // ── HINDRANCES ──
    hindrances: [
      {name:'All Thumbs',sev:'Minor'},{name:'Arrogant',sev:'Major'},
      {name:'Bad Eyes',sev:'Minor/Major'},{name:'Bad Luck',sev:'Major'},
      {name:'Big Mouth',sev:'Minor'},{name:'Bloodthirsty',sev:'Major'},
      {name:"Can't Swim",sev:'Minor'},{name:'Cautious',sev:'Minor'},
      {name:'Clueless',sev:'Major'},{name:'Code of Honor',sev:'Major'},
      {name:'Curious',sev:'Major'},{name:'Death Wish',sev:'Minor'},
      {name:'Delusional',sev:'Minor/Major'},{name:'Driven',sev:'Minor/Major'},
      {name:'Elderly',sev:'Major'},{name:'Enemy',sev:'Minor/Major'},
      {name:'Greedy',sev:'Minor/Major'},{name:'Habit',sev:'Minor/Major'},
      {name:'Heroic',sev:'Major'},{name:'Hesitant',sev:'Minor'},
      {name:'Illiterate',sev:'Minor'},{name:'Impulsive',sev:'Major'},
      {name:'Jealous',sev:'Minor/Major'},{name:'Loyal',sev:'Minor'},
      {name:'Mean',sev:'Minor'},{name:'Obese',sev:'Minor'},
      {name:'Obligation',sev:'Minor/Major'},{name:'One Arm',sev:'Major'},
      {name:'One Eye',sev:'Major'},{name:'Outsider',sev:'Minor/Major'},
      {name:'Overconfident',sev:'Major'},{name:'Pacifist',sev:'Minor/Major'},
      {name:'Phobia',sev:'Minor/Major'},{name:'Poverty',sev:'Minor'},
      {name:'Quirk',sev:'Minor'},{name:'Ruthless',sev:'Minor/Major'},
      {name:'Secret',sev:'Minor/Major'},{name:'Slow',sev:'Minor/Major'},
      {name:'Small',sev:'Minor'},{name:'Stubborn',sev:'Minor'},
      {name:'Suspicious',sev:'Minor/Major'},{name:'Ugly',sev:'Minor/Major'},
      {name:'Vengeful',sev:'Minor/Major'},{name:'Vow',sev:'Minor/Major'},
      {name:'Wanted',sev:'Minor/Major'},{name:'Yellow',sev:'Major'},
      {name:'Young',sev:'Minor/Major'}
    ],

    // ── ARCANE BACKGROUNDS ──
    arcaneBGs: [
      {name:'Gifted', skill:'Focus', linked:'spirit', startPP:15, startPowers:1, notes:'Innate ability'},
      {name:'Magic', skill:'Spellcasting', linked:'smarts', startPP:10, startPowers:3, notes:'Learned magic, gestures and words'},
      {name:'Miracles', skill:'Faith', linked:'spirit', startPP:10, startPowers:3, notes:'Divine power, holy symbol'},
      {name:'Weird Science', skill:'Weird Science', linked:'smarts', startPP:15, startPowers:2, notes:'Devices, can malfunction'}
    ],

    // ── POWERS ──
    powers: [
      {name:'Arcane Protection',rank:'N',pp:'1',range:'Smarts',dur:'5'},
      {name:'Banish',rank:'S',pp:'3',range:'Smarts',dur:'Instant'},
      {name:'Barrier',rank:'S',pp:'2',range:'Smarts',dur:'5'},
      {name:'Beast Friend',rank:'N',pp:'Special',range:'Smarts',dur:'10 min'},
      {name:'Blast',rank:'S',pp:'3',range:'Smarts x2',dur:'Instant'},
      {name:'Blind',rank:'N',pp:'2',range:'Smarts',dur:'Instant'},
      {name:'Bolt',rank:'N',pp:'1',range:'Smarts x2',dur:'Instant'},
      {name:'Boost/Lower Trait',rank:'N',pp:'2',range:'Smarts',dur:'5'},
      {name:'Burrow',rank:'N',pp:'2',range:'Smarts',dur:'5'},
      {name:'Burst',rank:'N',pp:'2',range:'Cone',dur:'Instant'},
      {name:'Confusion',rank:'N',pp:'1',range:'Smarts',dur:'Instant'},
      {name:'Damage Field',rank:'S',pp:'4',range:'Smarts',dur:'5'},
      {name:'Darksight',rank:'N',pp:'1',range:'Smarts',dur:'1 hr'},
      {name:'Deflection',rank:'N',pp:'3',range:'Smarts',dur:'5'},
      {name:'Detect/Conceal Arcana',rank:'N',pp:'2',range:'Smarts',dur:'5'},
      {name:'Disguise',rank:'S',pp:'2',range:'Smarts',dur:'10 min'},
      {name:'Dispel',rank:'S',pp:'1',range:'Smarts',dur:'Instant'},
      {name:'Divination',rank:'V',pp:'5',range:'Self',dur:'Instant'},
      {name:'Elemental Manipulation',rank:'N',pp:'1',range:'Smarts',dur:'5'},
      {name:'Empathy',rank:'N',pp:'1',range:'Smarts',dur:'5'},
      {name:'Entangle',rank:'N',pp:'2',range:'Smarts',dur:'Instant'},
      {name:'Environmental Protection',rank:'N',pp:'2',range:'Smarts',dur:'1 hr'},
      {name:'Farsight',rank:'S',pp:'2',range:'Smarts',dur:'5'},
      {name:'Fear',rank:'N',pp:'2',range:'Smarts',dur:'Instant'},
      {name:'Fly',rank:'V',pp:'3',range:'Smarts',dur:'5'},
      {name:'Growth/Shrink',rank:'S',pp:'2',range:'Smarts',dur:'5'},
      {name:'Havoc',rank:'N',pp:'2',range:'Smarts',dur:'Instant'},
      {name:'Healing',rank:'N',pp:'3',range:'Touch',dur:'Instant'},
      {name:'Illusion',rank:'N',pp:'3',range:'Smarts',dur:'5'},
      {name:'Intangibility',rank:'V',pp:'5',range:'Smarts',dur:'5'},
      {name:'Invisibility',rank:'S',pp:'5',range:'Smarts',dur:'5'},
      {name:'Light/Darkness',rank:'N',pp:'2',range:'Smarts',dur:'5'},
      {name:'Mind Link',rank:'N',pp:'1',range:'Smarts',dur:'5'},
      {name:'Mind Reading',rank:'N',pp:'2',range:'Smarts',dur:'Instant'},
      {name:'Mind Wipe',rank:'V',pp:'3',range:'Smarts',dur:'Instant'},
      {name:'Object Reading',rank:'S',pp:'2',range:'Touch',dur:'Instant'},
      {name:'Protection',rank:'N',pp:'1',range:'Smarts',dur:'5'},
      {name:'Puppet',rank:'V',pp:'3',range:'Smarts',dur:'5'},
      {name:'Relief',rank:'N',pp:'1',range:'Smarts',dur:'Instant'},
      {name:'Resurrection',rank:'H',pp:'30',range:'Touch',dur:'Instant'},
      {name:'Shape Change',rank:'N',pp:'Special',range:'Self',dur:'5'},
      {name:'Sloth/Speed',rank:'N',pp:'2',range:'Smarts',dur:'5'},
      {name:'Slumber',rank:'S',pp:'2',range:'Smarts',dur:'1 hr'},
      {name:'Smite',rank:'N',pp:'2',range:'Smarts',dur:'5'},
      {name:'Sound/Silence',rank:'N',pp:'1',range:'Smarts x2',dur:'5'},
      {name:'Speak Language',rank:'N',pp:'1',range:'Smarts',dur:'10 min'},
      {name:'Stun',rank:'N',pp:'2',range:'Smarts',dur:'Instant'},
      {name:'Summon Ally',rank:'N',pp:'Special',range:'Smarts',dur:'5'},
      {name:'Telekinesis',rank:'S',pp:'3',range:'Smarts x2',dur:'5'},
      {name:'Teleport',rank:'S',pp:'2',range:'Smarts',dur:'Instant'},
      {name:'Wall Walker',rank:'N',pp:'2',range:'Smarts',dur:'5'},
      {name:"Warrior's Gift",rank:'S',pp:'4',range:'Smarts',dur:'5'},
      {name:'Zombie',rank:'V',pp:'3',range:'Smarts',dur:'1 hr'}
    ],

    // ── GEAR ──
    gear: {
      melee: [
        {name:'Dagger/Knife',dmg:'Str+d4',cost:25,wt:1,notes:''},
        {name:'Short Sword',dmg:'Str+d6',cost:100,wt:2,notes:''},
        {name:'Long Sword',dmg:'Str+d8',cost:300,wt:3,notes:''},
        {name:'Rapier',dmg:'Str+d4',cost:150,wt:2,notes:'+1 Parry'},
        {name:'Great Sword',dmg:'Str+d10',cost:400,wt:6,notes:'Two hands, -1 Parry'},
        {name:'Axe, Hand',dmg:'Str+d6',cost:100,wt:2,notes:''},
        {name:'Axe, Battle',dmg:'Str+d8',cost:300,wt:4,notes:''},
        {name:'Axe, Great',dmg:'Str+d10',cost:500,wt:7,notes:'Two hands, -1 Parry, AP 2'},
        {name:'Mace',dmg:'Str+d6',cost:100,wt:4,notes:''},
        {name:'Maul',dmg:'Str+d10',cost:400,wt:10,notes:'Two hands, -1 Parry, AP 2'},
        {name:'Flail',dmg:'Str+d6',cost:200,wt:3,notes:'Ignores shield Parry/Cover'},
        {name:'Halberd',dmg:'Str+d8',cost:250,wt:6,notes:'Reach 1, two hands'},
        {name:'Lance',dmg:'Str+d8',cost:300,wt:6,notes:'Reach 2, AP 2 when charging'},
        {name:'Pike',dmg:'Str+d8',cost:200,wt:8,notes:'Reach 2, two hands'},
        {name:'Spear',dmg:'Str+d6',cost:100,wt:3,notes:'Reach 1, +1 Parry'},
        {name:'Staff',dmg:'Str+d4',cost:10,wt:4,notes:'Reach 1, +1 Parry, two hands'},
        {name:'Club',dmg:'Str+d4',cost:5,wt:1,notes:''}
      ],
      ranged: [
        {name:'Bow',dmg:'2d6',cost:250,wt:2,range:'12/24/48',rof:1,notes:''},
        {name:'Longbow',dmg:'2d6',cost:300,wt:3,range:'15/30/60',rof:1,notes:''},
        {name:'Crossbow',dmg:'2d6',cost:250,wt:5,range:'15/30/60',rof:1,notes:'AP 2, Reload 1'},
        {name:'Crossbow, Heavy',dmg:'2d8',cost:400,wt:8,range:'15/30/60',rof:1,notes:'AP 2, Reload 2'},
        {name:'Sling',dmg:'Str+d4',cost:10,wt:1,range:'4/8/16',rof:1,notes:''},
        {name:'Dagger (thrown)',dmg:'Str+d4',cost:25,wt:1,range:'3/6/12',rof:1,notes:''},
        {name:'Javelin',dmg:'Str+d6',cost:50,wt:2,range:'4/8/16',rof:1,notes:''},
        {name:'Axe (thrown)',dmg:'Str+d6',cost:100,wt:2,range:'3/6/12',rof:1,notes:''},
        {name:'Spear (thrown)',dmg:'Str+d6',cost:100,wt:3,range:'3/6/12',rof:1,notes:''}
      ],
      armor: [
        {name:'Leather (torso, arms, legs)',armor:1,cost:50,wt:10,notes:''},
        {name:'Chain Mail (torso, arms, legs)',armor:2,cost:200,wt:20,notes:''},
        {name:'Plate Corselet (torso)',armor:3,cost:400,wt:15,notes:'Torso only'},
        {name:'Plate Arms & Legs',armor:3,cost:200,wt:10,notes:'Arms/legs only'},
        {name:'Full Plate (torso, arms, legs)',armor:3,cost:500,wt:25,notes:''},
        {name:'Pot Helm',armor:3,cost:75,wt:2,notes:'Head, 50% vs head shot'},
        {name:'Full Helm',armor:3,cost:150,wt:4,notes:'Head'}
      ],
      shields: [
        {name:'Small Shield',parry:1,cover:0,cost:50,wt:4,notes:'+1 Parry'},
        {name:'Medium Shield',parry:2,cover:2,cost:100,wt:8,notes:'+2 Parry, +2 Cover vs ranged'},
        {name:'Large Shield',parry:2,cover:4,cost:200,wt:12,notes:'+2 Parry, +4 Cover vs ranged'}
      ],
      general: [
        {name:'Backpack',cost:50,wt:2},{name:'Bedroll',cost:25,wt:4},
        {name:'Canteen',cost:5,wt:1},{name:'Crowbar',cost:10,wt:2},
        {name:'Flint & Steel',cost:3,wt:0.5},{name:'Grappling Hook',cost:100,wt:2},
        {name:'Hammer',cost:10,wt:1},{name:'Lantern',cost:25,wt:3},
        {name:'Lockpicks',cost:200,wt:1},{name:'Oil (1 pint)',cost:2,wt:1},
        {name:'Quiver (20 arrows)',cost:25,wt:2},{name:'Rations (1 week)',cost:10,wt:5},
        {name:'Rope (20 yards)',cost:10,wt:5},{name:'Shovel',cost:5,wt:3},
        {name:'Torch (6)',cost:5,wt:3},{name:'Waterskin',cost:5,wt:1},
        {name:'Whetstone',cost:5,wt:0.5},{name:'Winter Clothing',cost:50,wt:3},
        {name:'Horse',cost:300,wt:0},{name:'War Horse',cost:750,wt:0},
        {name:'Saddle',cost:50,wt:10},{name:'Tent (2 person)',cost:50,wt:5}
      ]
    }
  });
})();
