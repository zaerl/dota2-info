# Dota 2 info

**dota2-info** is a simple module that helps you finding your favorite Dota 2 heroes.

## Install

Install through npm

    npm install dota2-info

## Usage

Require the module

    const dota2Info = require('dota-2-info');

Get a list of all heroes:

    const heroes = dota2Info.getHeroes();

Example output (we show only the first element):

    [
      {
        id: 1,
        code: 'npc_dota_hero_antimage',
        name: 'Anti-Mage',
        aliases: ['am'],
        team: 'dire',
        roles: { carry: 3, escape: 3, nuker: 1 },
        primaryAttribute: 'agility',
        attack: 'melee',
        attackRate: 1,
        attackRange: 150,
        projectileSpeed: 0,
        movementSpeed: 315,
        movementTurnRate: 0.5,
        cmEnabled: true,
        complexity: 1,
        url: 'https://www.dota2.com/hero/Anti-Mage/'
      }, ...
    ]

The `getHeroes(opts)` accept various options:

    {
        id: <int>, // 1 - 114
        code: <string>, // npc_dota_hero_antimage, npc_dota_hero_axe, etc.
        name: <string>, // Anti-Mage, Axe and aliases such as am, qop, etc.
        roles: <object>, // { carry: 1/2/3 } Multiple roles can be specified
        // roles: carry, escape, nuker, initiator, durable, disabler, jungler
        attack: <string>, // 'melee' or 'ranged'
        primaryAttribute: <string> // 'agility', 'strength' or 'intellect'
    }

## License

MIT
