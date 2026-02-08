// ═══════════════════════════════════════════════════════════════
// AMMARIA — The Merchant Realms Data Module v1.0
// ═══════════════════════════════════════════════════════════════
// Self-registering supplement module for DiceForge tools.
// Generated from verified canonical JSON data files.
// All data verified against Ammaria regional module (published).
// ═══════════════════════════════════════════════════════════════

(function() {
  var CF = window.CharacterForge;
  if (!CF || !CF.registerModule) { console.error('CharacterForge engine not loaded'); return; }

  CF.registerModule({
    id: 'ammaria',
    name: 'Ammaria — The Merchant Realms',
    description: 'Regional edges, hindrances, and signature equipment from the Ammaria supplement.',
    alwaysOn: false,
    colour: '#C49A4A',

    // ── EDGES (18) ──
    edges: [
      // Combat Edges (5)
      {name:'Ammarian Halberd Guard',rank:'Novice',type:'Combat',reqs:'Fighting d6+',summary:'When wielding a halberd, polearm, or staff, enemies moving adjacent from outside Reach provoke a free Fighting attack. On Shake or wound, their action ends. One such attack per round.'},
      {name:'Caravan Guard',rank:'Novice',type:'Combat',reqs:'Fighting d6+ or Shooting d6+',summary:'+1 Notice to detect ambushes. +1 Fighting or Shooting (chosen at purchase) during the first round of any combat beginning as an ambush.'},
      {name:'Repeating Crossbow Training',rank:'Novice',type:'Combat',reqs:'Shooting d6+',summary:'Unlocks ROF 2 with repeating crossbows. +2 to Repair or Shooting rolls when clearing jams.'},
      {name:'Repeating Crossbow Mastery',rank:'Seasoned',type:'Combat',reqs:'Repeating Crossbow Training, Shooting d8+',summary:'Ignore Recoil penalty when firing a repeating crossbow at ROF 2.'},
      {name:'War Boar Rider',rank:'Seasoned',type:'Combat',reqs:'Riding d8+',summary:'+2 to Riding rolls involving war boars. Berserk control difficulty reduced by 2. Access to guild breeding stock at 400\u20A1.'},
      // Professional Edges (8)
      {name:'Appraiser',rank:'Novice',type:'Professional',reqs:'Smarts d6+, Notice d6+',summary:'+2 to Notice or Common Knowledge to detect forgeries, identify quality, or estimate fair prices.'},
      {name:'Blackmarket Broker',rank:'Novice',type:'Professional',reqs:'Common Knowledge d6+, Persuasion d6+',summary:'+2 to Common Knowledge to locate buyers or sellers for contraband, stolen property, or restricted items.'},
      {name:'Guild Journeyman',rank:'Novice',type:'Professional',reqs:'Smarts d6+ or Agility d6+, relevant trade skill d6+',summary:'+1 primary trade skill in guild structures. +1 Common Knowledge for guild matters and commercial law. Guild facilities provide lodging and credit.'},
      {name:'Guildmaster',rank:'Seasoned',type:'Professional',reqs:'Guild Journeyman, relevant trade skill d8+',summary:'+2 Persuasion invoking guild authority. Once per session: legal representation, emergency credit (500\u20A1), influential introductions, or guild intelligence.'},
      {name:'Moneylender',rank:'Seasoned',type:'Professional',reqs:'Smarts d8+, Persuasion d6+',summary:'+2 Persuasion involving debt, loans, or financial obligations. Notice roll to spot financial distress in others.'},
      {name:'Photographic Memory',rank:'Novice',type:'Professional',reqs:'Smarts d8+',summary:'+2 Smarts to recall names, faces, documents, maps, and previously encountered information.'},
      {name:'Sailor\'s Edge',rank:'Novice',type:'Professional',reqs:'Boating d6+, Athletics d4+',summary:'Ignore 1 point of unstable platform penalties. +1 Fighting aboard ships. +1 Persuasion with seafarers.'},
      {name:'Smuggler\'s Eye',rank:'Novice',type:'Professional',reqs:'Notice d6+',summary:'+2 Notice to detect hidden compartments, smuggled goods, or concealed weapons.'},
      // Social Edges (2)
      {name:'Patron',rank:'Novice',type:'Social',reqs:'\u2014',summary:'Monthly stipend of 50\u20A1, access to patron\'s social circles, occasional gifts. Must advance patron\'s interests in return.'},
      {name:'Reputation (Commerce)',rank:'Seasoned',type:'Social',reqs:'Persuasion d6+',summary:'+2 Persuasion with merchants, guild members, and anyone who values commercial success.'},
      // Magic Edges (3)
      {name:'Guild Trained',rank:'Novice',type:'Power',reqs:'Arcane Background (any), Smarts d6+',summary:'+2 arcane skill in proper workshop or laboratory. Can jury-rig workspace with Smarts roll.'},
      {name:'Commercial Caster',rank:'Novice',type:'Power',reqs:'Arcane Background (any), Persuasion d6+',summary:'+1 arcane skill for paying clients. +2 Persuasion when negotiating magical service fees.'},
      {name:'Oath-Binder',rank:'Novice',type:'Power',reqs:'Arcane Background (any), Smarts d6+',summary:'+2 arcane skill for powers that bind, compel, detect deception, or enforce agreements.'}
    ],

    // ── HINDRANCES (11 entries, 12 with Minor/Major split) ──
    hindrances: [
      {name:'Collaborator\'s Blood',type:'Minor',summary:'Family suspected of Glasryan service. -1 Persuasion with anyone who\'s heard the stories.'},
      {name:'Country-Born',type:'Minor',summary:'-2 Common Knowledge for guild politics, urban customs, city geography, social etiquettes.'},
      {name:'Dark Reputation',type:'Minor',summary:'-1 Persuasion with anyone who\'s heard the stories. Spreads further the longer you stay in one area.'},
      {name:'Former Slave',type:'Minor/Major',summary:'Minor: Manumitted. -2 Persuasion with respectable Ammarians, legal restrictions. Major: Escaped. As Minor, plus actively hunted.'},
      {name:'Gang Debt',type:'Major',summary:'Owe criminals. -2 vs their Intimidation. Spirit roll to refuse direct requests. Debt may be sold.'},
      {name:'Guild Blacklisted',type:'Major',summary:'Expelled from guild system. Cannot conduct legal trade. Must operate through shadow economy.'},
      {name:'Guild Obligations',type:'Minor',summary:'50\u20A1 annual dues, one week per month guild business, fines for neglect. Called upon at inconvenient times.'},
      {name:'Poverty-Marked',type:'Minor',summary:'-1 Persuasion with social betters. Visible marks of poverty.'},
      {name:'Soft Heart',type:'Minor',summary:'Spirit roll to ignore suffering or prioritise profit over principle.'},
      {name:'Tribute-Touched',type:'Major',summary:'-2 Persuasion vs Glasryans. Spirit roll to resist acting against Imperial interests.'},
      {name:'Unguilded',type:'Minor',summary:'-2 Persuasion in commerce with guild members. Cannot legally practise regulated trades.'}
    ],

    // ── GEAR ──
    gear: {
      ranged: [
        {name:'Repeating Crossbow',range:'15/30/60',dmg:'2d6',ap:3,rof:1,cost:600,wt:12,notes:'Magazine 6, ROF 2 with Training edge, Jam on critical failure'},
        {name:'Hand Crossbow',range:'5/10/20',dmg:'2d4',ap:0,rof:1,cost:150,wt:2,notes:'Concealable (-2 to spot)'},
        {name:'Dock Bow',range:'10/20/40',dmg:'2d6',ap:1,rof:1,cost:60,wt:4,notes:'Marine standard, shortbow'}
      ],
      melee: [
        {name:'Guild Halberd',dmg:'Str+d8',cost:100,wt:12,notes:'AP 1, Reach 1, two hands'},
        {name:'Guild Knife',dmg:'Str+d4',cost:25,wt:1,notes:'+1 Stealth to conceal'},
        {name:'Slaver\'s Club',dmg:'Str+d4',cost:15,wt:3,notes:'Non-lethal'},
        {name:'Sap',dmg:'Str+d4',cost:10,wt:1,notes:'Non-lethal, +2 Stealth to conceal'},
        {name:'Boat Hook',dmg:'Str+d6',cost:20,wt:4,notes:'Reach 1'}
      ],
      armor: [
        {name:'Padded Jacket',armor:1,cost:25,wt:4,notes:'Worn under clothing'},
        {name:'Guild Leathers',armor:2,cost:100,wt:8,notes:'Standard militia issue'},
        {name:'Sailor\'s Coat',armor:1,cost:75,wt:5,notes:'Water-resistant, -1 swimming penalty (not -2)'},
        {name:'Ammarian Breastplate',armor:4,cost:900,wt:15,notes:'-1 run penalty (not -2), +1 Intimidation'},
        {name:'Guild Champion Plate',armor:5,cost:2500,wt:25,notes:'Full plate, guild elite only'}
      ],
      shields: [
        {name:'Boarding Shield',parry:1,cost:50,wt:6,notes:'Can be used to shove (opposed Strength)'}
      ],
      general: [
        {name:'Ammarian Lockpicks',cost:100,wt:1,notes:'+1 Thievery'},
        {name:'Guild Scales',cost:25,wt:2,notes:'+1 to appraise weight and purity'},
        {name:'Strongbox',cost:50,wt:8,notes:'Lockable, Toughness 10'},
        {name:'Manacles',cost:15,wt:2,notes:'Strength roll at -2 to break free'},
        {name:'Smoke Bombs (\u00d73)',cost:30,wt:1,notes:'Concealment in Small Burst Template, 3 rounds'}
      ]
    }
  });
})();
