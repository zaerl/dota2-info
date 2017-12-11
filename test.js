import test from 'ava';
import m from './lib';

test('get heroes', t => {
  t.true(Array.isArray(m.getHeroes()));
  t.is(m.getHeroes().length, 115);
});

test('get hero by ID', t => {
  t.deepEqual(m.getHeroes({ id: 0 }), []);
  t.is(typeof m.getHeroes({ id: 1 })[0], 'object');
  t.is(m.getHeroes({ id: 1 })[0].name, 'Anti-Mage');
});

test('get heroes by name', t => {
  t.true(Array.isArray(m.getHeroes({ name: 'Anti' })));
  t.is(m.getHeroes({ name: 'Anti' }).length, 1);
  t.is(m.getHeroes({ name: 'Anti' }).length, 1);
  t.is(m.getHeroes({ name: 'am' }).length, 1);
  t.is(m.getHeroes({ name: 'Und' }).length, 2);
  t.true(m.getHeroes({ name: 'wk' })[0].name ===
    m.getHeroes({ name: 'snk' })[0].name);

  // Wraith (Skeleton) king, Sand king, Skywrath Mage
  t.is(m.getHeroes({ name: 'sk' }).length, 3);
});

test('get heroes by role', t => {
  t.is(m.getHeroes({ roles: { carry: 1 } }).length, 63);
  t.is(m.getHeroes({ roles: { carry: 2 } }).length, 42);
  t.is(m.getHeroes({ roles: { carry: 3 } }).length, 13);
  t.is(m.getHeroes({ roles: { jungler: 1 } }).length, 15);
  t.is(m.getHeroes({ roles: { jungler: 3 } }).length, 4);
  t.is(m.getHeroes({ roles: { carry: 3, support: 1 } }).length, 1);
});

test('get heroes by attack type', t => {
  t.is(m.getHeroes({ attack: 'melee' }).length, 55);
  t.is(m.getHeroes({ attack: 'ranged' }).length, 60);
});

test('get heroes by code', t => {
  t.is(m.getHeroes({ code: 'npc_dota_hero_drow_ranger' }).length, 1);
});

test('get heroes by primary attribute', t => {
  t.is(m.getHeroes({ primaryAttribute: 'strength' }).length, 37);
  t.is(m.getHeroes({ primaryAttribute: 'agility' }).length, 37);
  t.is(m.getHeroes({ primaryAttribute: 'intellect' }).length, 41);
});

test('get heroes mixed', t => {
  t.is(m.getHeroes({ roles: { carry: 1 }, attack: 'ranged' }).length, 29);
  t.is(m.getHeroes({ roles: { carry: 1 }, attack: 'melee', name: 'Br' }).
    length, 3);
  t.is(m.getHeroes({ roles: { carry: 1, support: 1 }, attack: 'ranged' }).
    length, 5);
  t.is(m.getHeroes({ roles: { carry: 1, support: 1 }, attack: 'ranged',
    primaryAttribute: 'agility' }).length, 1);
});
