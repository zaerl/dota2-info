'use strict';

let heroes = require('./heroes.json');

function filterHero(element, options) {
  if(typeof options.id !== 'undefined') return element.id == options.id;

  if(typeof options.code === 'string') return element.code === options.code;

  if(typeof options.name === 'string' &&
    !filterHeroByName(element, options.name)) {
    return false;
  }

  if(typeof options.roles === 'object' &&
    !filterHeroByRole(element, options.roles)) {
    return false;
  }

  if(typeof options.attack === 'string' &&
    element.attack !== options.attack) {
    return false;
  }

  if(typeof options.primaryAttribute === 'string' &&
    element.primaryAttribute !== options.primaryAttribute) {
    return false;
  }

  return true;
}

function filterHeroByName(element, name) {
  let query = name.toLowerCase();
  let i;

  if(element.name.toLowerCase().indexOf(query) === 0) return true;

  for(i = 0; i < element.aliases.length; ++i) {
    if(element.aliases[i].toLowerCase().indexOf(query) === 0) return true;
  }

  return false;
}

function filterHeroByRole(element, roles) {
  let i;

  for(i in roles) {
    if(typeof element.roles[i] !== 'undefined') {
      if(element.roles[i] < roles[i]) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
}

// Get heroes (filtered)
module.exports.getHeroes = function(options) {
  let to = typeof options;

  if(to === 'undefined') {
    return heroes;
  } else if(to === 'object') {
    return heroes.filter((element) => filterHero(element, options));
  }
};

