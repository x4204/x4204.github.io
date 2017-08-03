// health ----------------------------------------------------------------------
let upgradeShopPoints = document.querySelector(`#c_upgrPts`);
let btnIncreaseHealth = document.querySelector('#btnIncreaseHealth');
let btnDecreaseHealth = document.querySelector('#btnDecreaseHealth');
let shopCurrHealth = document.querySelector('#c_health');

btnIncreaseHealth.addEventListener('mousedown', function() {
  if (Game.health.default >= Game.health.max)
    alert('You have reached max health');
  else if (Game.upgrades.current == 0)
    alert('You have no upgrade points left');
  else {
    Game.health.default += Game.health.factor;
    shopCurrHealth.innerHTML = Game.health.default / 100;
    Game.upgrades.current--;
    upgradeShopPoints.innerHTML = Game.upgrades.current;
  }
});

btnDecreaseHealth.addEventListener('mousedown', function() {
  if (Game.health.default <= Game.health.min)
    alert('You have reached min health');
  else {
    Game.health.default -= Game.health.factor;
    shopCurrHealth.innerHTML = Game.health.default / 100;
    Game.upgrades.current++;
    upgradeShopPoints.innerHTML = Game.upgrades.current;
  }
});

// armor -----------------------------------------------------------------------
let btnIncreaseArmor = document.querySelector('#btnIncreaseArmor');
let btnDecreaseArmor = document.querySelector('#btnDecreaseArmor');
let shopCurrArmor = document.querySelector('#c_armor');

btnIncreaseArmor.addEventListener('mousedown', function() {
  if (Game.armor.default >= Game.armor.max)
    alert('You have reached max armor');
  else if (Game.upgrades.current == 0)
    alert('You have no upgrade points left');
  else {
    Game.armor.default += Game.armor.factor;
    shopCurrArmor.innerHTML = Game.armor.default / 100;
    Game.upgrades.current--;
    upgradeShopPoints.innerHTML = Game.upgrades.current;
  }
});

btnDecreaseArmor.addEventListener('mousedown', function() {
  if (Game.armor.default <= Game.armor.min)
    alert('You have reached min armor');
  else {
    Game.armor.default -= Game.armor.factor;
    shopCurrArmor.innerHTML = Game.armor.default / 100;
    Game.upgrades.current++;
    upgradeShopPoints.innerHTML = Game.upgrades.current;
  }
});

// bullet speed ----------------------------------------------------------------
let btnIncreaseBulletSpeed = document.querySelector('#btnIncreaseBulletSpeed');
let btnDecreaseBulletSpeed = document.querySelector('#btnDecreaseBulletSpeed');
let shopCurrBulletSpeed = document.querySelector('#c_bullet_speed');

btnIncreaseBulletSpeed.addEventListener('mousedown', function() {
  if (Game['bullet speed'].default >= Game['bullet speed'].max)
    alert('You have reached max bullet speed');
  else if (Game.upgrades.current == 0)
    alert('You have no upgrade points left');
  else {
    Game['bullet speed'].default += Game['bullet speed'].factor;
    shopCurrBulletSpeed.innerHTML = Game['bullet speed'].default;
    Game.upgrades.current--;
    upgradeShopPoints.innerHTML = Game.upgrades.current;
  }
});

btnDecreaseBulletSpeed.addEventListener('mousedown', function() {
  if (Game['bullet speed'].default <= Game['bullet speed'].min)
    alert('You have reached min bullet speed');
  else {
    Game['bullet speed'].default -= Game['bullet speed'].factor;
    shopCurrBulletSpeed.innerHTML = Game['bullet speed'].default;
    Game.upgrades.current++;
    upgradeShopPoints.innerHTML = Game.upgrades.current;
  }
});

// bullet damage ---------------------------------------------------------------
let btnIncreaseBulletDamage = document.querySelector('#btnIncreaseBulletDamage');
let btnDecreaseBulletDamage = document.querySelector('#btnDecreaseBulletDamage');
let shopCurrBulletDamage = document.querySelector('#c_bullet_damage');

btnIncreaseBulletDamage.addEventListener('mousedown', function() {
  if (Game['bullet damage'].default >= Game['bullet damage'].max)
    alert('You have reached max bullet damage');
  else if (Game.upgrades.current == 0)
    alert('You have no upgrade points left');
  else {
    Game['bullet damage'].default += Game['bullet damage'].factor;
    shopCurrBulletDamage.innerHTML = Game['bullet damage'].default;
    Game.upgrades.current--;
    upgradeShopPoints.innerHTML = Game.upgrades.current;
  }
});

btnDecreaseBulletDamage.addEventListener('mousedown', function() {
  if (Game['bullet damage'].default <= Game['bullet damage'].min)
    alert('You have reached min bullet damage');
  else {
    Game['bullet damage'].default -= Game['bullet damage'].factor;
    shopCurrBulletDamage.innerHTML = Game['bullet damage'].default;
    Game.upgrades.current++;
    upgradeShopPoints.innerHTML = Game.upgrades.current;
  }
});

// max speed -------------------------------------------------------------------
let btnIncreaseMaxSpeed = document.querySelector('#btnIncreaseMaxSpeed');
let btnDecreaseMaxSpeed = document.querySelector('#btnDecreaseMaxSpeed');
let shopCurrMaxSpeed = document.querySelector('#c_max_speed');

btnIncreaseMaxSpeed.addEventListener('mousedown', function() {
  if (Game['max speed'].default >= Game['max speed'].max)
    alert('You have reached max speed limit');
  else if (Game.upgrades.current == 0)
    alert('You have no upgrade points left');
  else {
    Game['max speed'].default += Game['max speed'].factor;
    shopCurrMaxSpeed.innerHTML = Game['max speed'].default;
    Game.upgrades.current--;
    upgradeShopPoints.innerHTML = Game.upgrades.current;
  }
});

btnDecreaseMaxSpeed.addEventListener('mousedown', function() {
  if (Game['max speed'].default <= Game['max speed'].min)
    alert('You have reached min speed limit');
  else {
    Game['max speed'].default -= Game['max speed'].factor;
    shopCurrMaxSpeed.innerHTML = Game['max speed'].default;
    Game.upgrades.current++;
    upgradeShopPoints.innerHTML = Game.upgrades.current;
  }
});
