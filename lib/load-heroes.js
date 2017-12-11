'use strict';

const fs = require('fs');
const vdf = require('vdf');
const whereIsSteam = require('where-is-steam');

const dotaPath = '/dota 2 beta/game/dota/scripts/npc/npc_heroes.txt';
const baseURL = 'https://www.dota2.com/hero/';

function getRoles(hero) {
  let i;
  let roles = {};
  const roleNames = hero.Role.toLowerCase().split(',');
  const roleLevels = hero.Rolelevels.toLowerCase().split(',');

  for(i = 0; i < roleNames.length; ++i) {
    roles[roleNames[i]] = parseInt(roleLevels[i]);
  }

  return roles;
}

function getAttribute(hero) {
  if(hero.AttributePrimary === 'DOTA_ATTRIBUTE_AGILITY') return 'agility';
  if(hero.AttributePrimary === 'DOTA_ATTRIBUTE_STRENGTH') return 'strength';
  if(hero.AttributePrimary === 'DOTA_ATTRIBUTE_INTELLECT') return 'intellect';
}

function getAliases(hero) {
  if(typeof hero.NameAliases === 'string') {
    let i;
    let aliases = hero.NameAliases;
    const separator = aliases.indexOf(';') !== -1 ? ';' : ',';

    aliases = aliases.split(separator);

    for(i = 0; i < aliases.length; ++i) {
      aliases[i] = aliases[i].trim();
    }

    return aliases;
  }

  return [];
}

function generate(data) {
  data = vdf.parse(data);
  data = data.DOTAHeroes;
  let heroes = [];

  for(let i in data) {
    if(i === 'Version' || i === 'npc_dota_hero_base' ||
      i === 'npc_dota_hero_target_dummy' || data[i].Enabled === '0') {
      continue;
    }

    heroes.push({
      id: parseInt(data[i].HeroID),
      code: i,
      name: data[i].workshop_guide_name,//data[i].url.replace(/_/g, ' '),
      aliases: getAliases(data[i]),
      team: data[i].Team === 'Good' ? 'radiant' : 'dire',
      roles: getRoles(data[i]),
      primaryAttribute: getAttribute(data[i]),
      attack: data[i].AttackCapabilities === 'DOTA_UNIT_CAP_MELEE_ATTACK' ?
        'melee' : 'ranged',
      attackRate: parseInt(data[i].AttackRate),
      attackRange: parseInt(data[i].AttackRange),
      projectileSpeed: parseInt(typeof data[i].ProjectileSpeed !== 'undefined' ?
        data[i].ProjectileSpeed : 0),
      movementSpeed: parseInt(data[i].MovementSpeed),
      movementTurnRate: parseFloat(data[i].MovementTurnRate),
      cmEnabled: !!data[i].CMEnabled,
      complexity: parseInt(data[i].Complexity)
    });
  }

  fs.writeFileSync('./lib/heroes.json', JSON.stringify(heroes, null, '  '),
    'utf-8');
}

function load() {
  whereIsSteam().then((path) => {
    const data = fs.readFileSync(`${path}${dotaPath}`, 'utf-8');
    generate(data);
  }).catch((err) => {
    console.error(err);
  });
}

load();
