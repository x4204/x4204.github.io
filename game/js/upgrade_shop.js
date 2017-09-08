// global ----------------------------------------------------------------------
let upgradeShopPoints = document.querySelector(`#c_upgrPts`);
// functions -------------------------------------------------------------------
let increaseStat = function(stat, shopCurrStat, isInversed, fixed, scale) {
    if (Game[stat].default.toFixed(fixed) >= Game[stat].max)
      alert(`You have reached max ${stat} limit`);
    else if (Game.upgrades == 0)
      alert('You have no upgrade points left');
    else {
      Game[stat].default += Game[stat].factor;
      shopCurrStat.innerHTML = (Game[stat].default / scale).toFixed(fixed);
      if (!isInversed) Game.upgrades--;
      else Game.upgrades++;
      upgradeShopPoints.innerHTML = Game.upgrades;
    }
}

let decreaseStat = function(stat, shopCurrStat, isInversed, fixed, scale) {
    if (Game[stat].default.toFixed(fixed) <= Game[stat].min)
      alert(`You have reached min ${stat} limit`);
    else if (Game.upgrades == 0)
      alert(`You have no upgrade point left`);
    else {
      Game[stat].default -= Game[stat].factor;
      shopCurrStat.innerHTML = (Game[stat].default / scale).toFixed(fixed);
      if (!isInversed) Game.upgrades++;
      else Game.upgrades--;
      upgradeShopPoints.innerHTML = Game.upgrades;
    }
}
// health ----------------------------------------------------------------------
let btnIncreaseHealth = document.querySelector('#btnIncreaseHealth');
let btnDecreaseHealth = document.querySelector('#btnDecreaseHealth');
let shopCurrHealth = document.querySelector('#c_health');

btnIncreaseHealth.addEventListener('mousedown', function() {
  increaseStat('health', shopCurrHealth, false, 0, 100);
});

btnDecreaseHealth.addEventListener('mousedown', function() {
  decreaseStat('health', shopCurrHealth, false, 0, 100);
});

// armor -----------------------------------------------------------------------
let btnIncreaseArmor = document.querySelector('#btnIncreaseArmor');
let btnDecreaseArmor = document.querySelector('#btnDecreaseArmor');
let shopCurrArmor = document.querySelector('#c_armor');

btnIncreaseArmor.addEventListener('mousedown', function() {
  increaseStat('armor', shopCurrArmor, false, 0, 100);
});

btnDecreaseArmor.addEventListener('mousedown', function() {
  decreaseStat('armor', shopCurrArmor, false, 0, 100);
});

// bullet speed ----------------------------------------------------------------
let btnIncreaseBulletSpeed = document.querySelector('#btnIncreaseBulletSpeed');
let btnDecreaseBulletSpeed = document.querySelector('#btnDecreaseBulletSpeed');
let shopCurrBulletSpeed = document.querySelector('#c_bullet_speed');

btnIncreaseBulletSpeed.addEventListener('mousedown', function() {
  increaseStat('bullet speed', shopCurrBulletSpeed, false, 1, 1);
});

btnDecreaseBulletSpeed.addEventListener('mousedown', function() {
  decreaseStat('bullet speed', shopCurrBulletSpeed, false, 1, 1);
});

// bullet damage ---------------------------------------------------------------
let btnIncreaseBulletDamage = document.querySelector('#btnIncreaseBulletDamage');
let btnDecreaseBulletDamage = document.querySelector('#btnDecreaseBulletDamage');
let shopCurrBulletDamage = document.querySelector('#c_bullet_damage');

btnIncreaseBulletDamage.addEventListener('mousedown', function() {
  increaseStat('bullet damage', shopCurrBulletDamage, false, 0, 1);
});

btnDecreaseBulletDamage.addEventListener('mousedown', function() {
  decreaseStat('bullet damage', shopCurrBulletDamage, false, 0, 1);
});

// max speed -------------------------------------------------------------------
let btnIncreaseMaxSpeed = document.querySelector('#btnIncreaseMaxSpeed');
let btnDecreaseMaxSpeed = document.querySelector('#btnDecreaseMaxSpeed');
let shopCurrMaxSpeed = document.querySelector('#c_max_speed');

btnIncreaseMaxSpeed.addEventListener('mousedown', function() {
  increaseStat('max speed', shopCurrMaxSpeed, false, 2, 1);
});

btnDecreaseMaxSpeed.addEventListener('mousedown', function() {
  decreaseStat('max speed', shopCurrMaxSpeed, false, 2, 1);
});

// rotation speed --------------------------------------------------------------
let btnIncreaseRotationSpeed = document.querySelector('#btnIncreaseRotationSpeed');
let btnDecreaseRotationSpeed = document.querySelector('#btnDecreaseRotationSpeed');
let shopCurrRotationSpeed = document.querySelector('#c_rotation_speed');

btnIncreaseRotationSpeed.addEventListener('mousedown', function() {
  increaseStat('rotation speed', shopCurrRotationSpeed, false, 3, 1);
});

btnDecreaseRotationSpeed.addEventListener('mousedown', function() {
  decreaseStat('rotation speed', shopCurrRotationSpeed, false, 3, 1);
});

// acceleration ----------------------------------------------------------------
let btnIncreaseAcceleration = document.querySelector('#btnIncreaseAcceleration');
let btnDecreaseAcceleration = document.querySelector('#btnDecreaseAcceleration');
let shopCurrAcceleration = document.querySelector('#c_acceleration');

btnIncreaseAcceleration.addEventListener('mousedown', function() {
  increaseStat('acceleration', shopCurrAcceleration, false, 3, 1);
});

btnDecreaseAcceleration.addEventListener('mousedown', function() {
  decreaseStat('acceleration', shopCurrAcceleration, false, 3, 1);
});

// mass ------------------------------------------------------------------------
let btnIncreaseMass = document.querySelector('#btnIncreaseMass');
let btnDecreaseMass = document.querySelector('#btnDecreaseMass');
let shopCurrMass = document.querySelector('#c_mass');

btnIncreaseMass.addEventListener('mousedown', function() {
  increaseStat('mass', shopCurrMass, true, 2, 1);
});

btnDecreaseMass.addEventListener('mousedown', function() {
  decreaseStat('mass', shopCurrMass, true, 2, 1);
});

// time ------------------------------------------------------------------------
let btnIncreaseTime = document.querySelector('#btnIncreaseTime');
let btnDecreaseTime = document.querySelector('#btnDecreaseTime');
let shopCurrTime = document.querySelector('#c_time');

btnIncreaseTime.addEventListener('mousedown', function() {
  increaseStat('time', shopCurrTime, false, 0, 1);
});

btnDecreaseTime.addEventListener('mousedown', function() {
  decreaseStat('time', shopCurrTime, false, 0, 1);
});

// target spawn interval -------------------------------------------------------
let btnIncreaseTSI = document.querySelector('#btnIncreaseTSI');
let btnDecreaseTSI = document.querySelector('#btnDecreaseTSI');
let shopCurrTSI = document.querySelector('#c_target_spawn_interval');

btnIncreaseTSI.addEventListener('mousedown', function() {
  increaseStat('target spawn interval', shopCurrTSI, true, 0, 1);
});

btnDecreaseTSI.addEventListener('mousedown', function() {
  decreaseStat('target spawn interval', shopCurrTSI, true, 0, 1);
});

// drop chance -----------------------------------------------------------------
let btnIncreaseDropChance = document.querySelector('#btnIncreaseDropChance');
let btnDecreaseDropChance = document.querySelector('#btnDecreaseDropChance');
let shopCurrDropChance = document.querySelector('#c_drop_chance');

btnIncreaseDropChance.addEventListener('mousedown', function() {
  increaseStat('drop chance', shopCurrDropChance, false, 3, 1);
});

btnDecreaseDropChance.addEventListener('mousedown', function() {
  decreaseStat('drop chance', shopCurrDropChance, false, 3, 1);
});
