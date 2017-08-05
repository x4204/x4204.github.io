// health ----------------------------------------------------------------------
let upgradeShopPoints = document.querySelector(`#c_upgrPts`);
let btnIncreaseHealth = document.querySelector('#btnIncreaseHealth');
let btnDecreaseHealth = document.querySelector('#btnDecreaseHealth');
let shopCurrHealth = document.querySelector('#c_health');

btnIncreaseHealth.addEventListener('mousedown', function() {
  if (Game.health.default >= Game.health.max)
    alert('You have reached max health limit');
  else if (Game.upgrades == 0)
    alert('You have no upgrade points left');
  else {
    Game.health.default += Game.health.factor;
    shopCurrHealth.innerHTML = Game.health.default / 100;
    Game.upgrades--;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

btnDecreaseHealth.addEventListener('mousedown', function() {
  if (Game.health.default <= Game.health.min)
    alert('You have reached min health limit');
  else {
    Game.health.default -= Game.health.factor;
    shopCurrHealth.innerHTML = Game.health.default / 100;
    Game.upgrades++;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

// armor -----------------------------------------------------------------------
let btnIncreaseArmor = document.querySelector('#btnIncreaseArmor');
let btnDecreaseArmor = document.querySelector('#btnDecreaseArmor');
let shopCurrArmor = document.querySelector('#c_armor');

btnIncreaseArmor.addEventListener('mousedown', function() {
  if (Game.armor.default >= Game.armor.max)
    alert('You have reached max armor limit');
  else if (Game.upgrades == 0)
    alert('You have no upgrade points left');
  else {
    Game.armor.default += Game.armor.factor;
    shopCurrArmor.innerHTML = Game.armor.default / 100;
    Game.upgrades--;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

btnDecreaseArmor.addEventListener('mousedown', function() {
  if (Game.armor.default <= Game.armor.min)
    alert('You have reached min armor limit');
  else {
    Game.armor.default -= Game.armor.factor;
    shopCurrArmor.innerHTML = Game.armor.default / 100;
    Game.upgrades++;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

// bullet speed ----------------------------------------------------------------
let btnIncreaseBulletSpeed = document.querySelector('#btnIncreaseBulletSpeed');
let btnDecreaseBulletSpeed = document.querySelector('#btnDecreaseBulletSpeed');
let shopCurrBulletSpeed = document.querySelector('#c_bullet_speed');

btnIncreaseBulletSpeed.addEventListener('mousedown', function() {
  if (Game['bullet speed'].default >= Game['bullet speed'].max)
    alert('You have reached max bullet speed limit');
  else if (Game.upgrades == 0)
    alert('You have no upgrade points left');
  else {
    Game['bullet speed'].default += Game['bullet speed'].factor;
    shopCurrBulletSpeed.innerHTML = Game['bullet speed'].default;
    Game.upgrades--;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

btnDecreaseBulletSpeed.addEventListener('mousedown', function() {
  if (Game['bullet speed'].default <= Game['bullet speed'].min)
    alert('You have reached min bullet speed limit');
  else {
    Game['bullet speed'].default -= Game['bullet speed'].factor;
    shopCurrBulletSpeed.innerHTML = Game['bullet speed'].default;
    Game.upgrades++;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

// bullet damage ---------------------------------------------------------------
let btnIncreaseBulletDamage = document.querySelector('#btnIncreaseBulletDamage');
let btnDecreaseBulletDamage = document.querySelector('#btnDecreaseBulletDamage');
let shopCurrBulletDamage = document.querySelector('#c_bullet_damage');

btnIncreaseBulletDamage.addEventListener('mousedown', function() {
  if (Game['bullet damage'].default >= Game['bullet damage'].max)
    alert('You have reached max bullet damage limit');
  else if (Game.upgrades == 0)
    alert('You have no upgrade points left');
  else {
    Game['bullet damage'].default += Game['bullet damage'].factor;
    shopCurrBulletDamage.innerHTML = Game['bullet damage'].default;
    Game.upgrades--;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

btnDecreaseBulletDamage.addEventListener('mousedown', function() {
  if (Game['bullet damage'].default <= Game['bullet damage'].min)
    alert('You have reached min bullet damage limit');
  else {
    Game['bullet damage'].default -= Game['bullet damage'].factor;
    shopCurrBulletDamage.innerHTML = Game['bullet damage'].default;
    Game.upgrades++;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

// max speed -------------------------------------------------------------------
let btnIncreaseMaxSpeed = document.querySelector('#btnIncreaseMaxSpeed');
let btnDecreaseMaxSpeed = document.querySelector('#btnDecreaseMaxSpeed');
let shopCurrMaxSpeed = document.querySelector('#c_max_speed');

btnIncreaseMaxSpeed.addEventListener('mousedown', function() {
  if (Game['max speed'].default >= Game['max speed'].max)
    alert('You have reached max speed limit');
  else if (Game.upgrades == 0)
    alert('You have no upgrade points left');
  else {
    Game['max speed'].default += Game['max speed'].factor;
    shopCurrMaxSpeed.innerHTML = Game['max speed'].default;
    Game.upgrades--;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

btnDecreaseMaxSpeed.addEventListener('mousedown', function() {
  if (Game['max speed'].default <= Game['max speed'].min)
    alert('You have reached min speed limit');
  else {
    Game['max speed'].default -= Game['max speed'].factor;
    shopCurrMaxSpeed.innerHTML = Game['max speed'].default;
    Game.upgrades++;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

// rotation speed --------------------------------------------------------------
let btnIncreaseRotationSpeed = document.querySelector('#btnIncreaseRotationSpeed');
let btnDecreaseRotationSpeed = document.querySelector('#btnDecreaseRotationSpeed');
let shopCurrRotationSpeed = document.querySelector('#c_rotation_speed');

btnIncreaseRotationSpeed.addEventListener('mousedown', function() {
  if (Game['rotation speed'].default.toFixed(3) >= Game['rotation speed'].max)
    alert('You have reached max rotation speed limit');
  else if (Game.upgrades == 0)
    alert('You have no upgrade points left');
  else {
    Game['rotation speed'].default += Game['rotation speed'].factor;
    shopCurrRotationSpeed.innerHTML = Game['rotation speed'].default.toFixed(3);
    Game.upgrades--;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

btnDecreaseRotationSpeed.addEventListener('mousedown', function() {
  if (Game['rotation speed'].default.toFixed(3) <= Game['rotation speed'].min)
    alert('You have reached min rotation speed limit');
  else {
    Game['rotation speed'].default -= Game['rotation speed'].factor;
    shopCurrRotationSpeed.innerHTML = Game['rotation speed'].default.toFixed(3);
    Game.upgrades++;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

// acceleration ----------------------------------------------------------------
let btnIncreaseAcceleration = document.querySelector('#btnIncreaseAcceleration');
let btnDecreaseAcceleration = document.querySelector('#btnDecreaseAcceleration');
let shopCurrAcceleration = document.querySelector('#c_acceleration');

btnIncreaseAcceleration.addEventListener('mousedown', function() {
  if (Game['acceleration'].default.toFixed(3) >= Game['acceleration'].max)
    alert('You have reached max acceleration limit');
  else if (Game.upgrades == 0)
    alert('You have no upgrade points left');
  else {
    Game['acceleration'].default += Game['acceleration'].factor;
    shopCurrAcceleration.innerHTML = Game['acceleration'].default.toFixed(3);
    Game.upgrades--;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

btnDecreaseAcceleration.addEventListener('mousedown', function() {
  if (Game['acceleration'].default.toFixed(3) <= Game['acceleration'].min)
    alert('You have reached min acceleration limit');
  else {
    Game['acceleration'].default -= Game['acceleration'].factor;
    shopCurrAcceleration.innerHTML = Game['acceleration'].default.toFixed(3);
    Game.upgrades++;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

// mass ------------------------------------------------------------------------
let btnIncreaseMass = document.querySelector('#btnIncreaseMass');
let btnDecreaseMass = document.querySelector('#btnDecreaseMass');
let shopCurrMass = document.querySelector('#c_mass');

btnIncreaseMass.addEventListener('mousedown', function() {
  if (Game['mass'].default.toFixed(2) >= Game['mass'].max)
    alert('You have reached max mass limit');
  else if (Game.upgrades == 0)
    alert('You have no upgrade points left');
  else {
    Game['mass'].default += Game['mass'].factor;
    shopCurrMass.innerHTML = Game['mass'].default.toFixed(2);
    Game.upgrades--;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

btnDecreaseMass.addEventListener('mousedown', function() {
  if (Game['mass'].default.toFixed(2) <= Game['mass'].min)
    alert('You have reached min mass limit');
  else {
    Game['mass'].default -= Game['mass'].factor;
    shopCurrMass.innerHTML = Game['mass'].default.toFixed(2);
    Game.upgrades++;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

// time ------------------------------------------------------------------------
let btnIncreaseTime = document.querySelector('#btnIncreaseTime');
let btnDecreaseTime = document.querySelector('#btnDecreaseTime');
let shopCurrTime = document.querySelector('#c_time');

btnIncreaseTime.addEventListener('mousedown', function() {
  if (Game['time'].default >= Game['time'].max)
    alert('You have reached max time limit');
  else if (Game.upgrades == 0)
    alert('You have no upgrade points left');
  else {
    Game['time'].default += Game['time'].factor;
    shopCurrTime.innerHTML = Game['time'].default;
    Game.upgrades--;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

btnDecreaseTime.addEventListener('mousedown', function() {
  if (Game['time'].default <= Game['time'].min)
    alert('You have reached min time limit');
  else {
    Game['time'].default -= Game['time'].factor;
    shopCurrTime.innerHTML = Game['time'].default;
    Game.upgrades++;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

// target spawn interval -------------------------------------------------------
let btnIncreaseTSI = document.querySelector('#btnIncreaseTSI');
let btnDecreaseTSI = document.querySelector('#btnDecreaseTSI');
let shopCurrTSI = document.querySelector('#c_target_spawn_interval');

btnIncreaseTSI.addEventListener('mousedown', function() {
  if (Game['target spawn interval'].default >= Game['target spawn interval'].max)
    alert('You have reached max target spawn interval limit');
  else if (Game.upgrades == 0)
    alert('You have no upgrade points left');
  else {
    Game['target spawn interval'].default += Game['target spawn interval'].factor;
    shopCurrTSI.innerHTML = Game['target spawn interval'].default;
    Game.upgrades--;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

btnDecreaseTSI.addEventListener('mousedown', function() {
  if (Game['target spawn interval'].default <= Game['target spawn interval'].min)
    alert('You have reached min target spawn interval limit');
  else {
    Game['target spawn interval'].default -= Game['target spawn interval'].factor;
    shopCurrTSI.innerHTML = Game['target spawn interval'].default;
    Game.upgrades++;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

// drop chance -----------------------------------------------------------------
let btnIncreaseDropChance = document.querySelector('#btnIncreaseDropChance');
let btnDecreaseDropChance = document.querySelector('#btnDecreaseDropChance');
let shopCurrDropChance = document.querySelector('#c_drop_chance');

btnIncreaseDropChance.addEventListener('mousedown', function() {
  if (Game['drop chance'].default.toFixed(3) >= Game['drop chance'].max)
    alert('You have reached max drop chance limit');
  else if (Game.upgrades == 0)
    alert('You have no upgrade points left');
  else {
    Game['drop chance'].default += Game['drop chance'].factor;
    shopCurrDropChance.innerHTML = Game['drop chance'].default.toFixed(3);
    Game.upgrades--;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});

btnDecreaseDropChance.addEventListener('mousedown', function() {
  if (Game['drop chance'].default.toFixed(3) <= Game['drop chance'].min)
    alert('You have reached min drop chance limit');
  else {
    Game['drop chance'].default -= Game['drop chance'].factor;
    shopCurrDropChance.innerHTML = Game['drop chance'].default.toFixed(3);
    Game.upgrades++;
    upgradeShopPoints.innerHTML = Game.upgrades;
  }
});
