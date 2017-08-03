let Game = {
  "FPS": 60,
  "canvas": {
    "width": canvas.width,
    "height": canvas.height
  },
  "time": {
    "default": 60,
    "current": 60
  },
  "health": {
    "default": 10000,
    "current": 10000,
    "factor": 2000,
    "min": 10000,
    "max": 20000
  },
  "armor": {
    "default": 0,
    "current": 0,
    "factor": 1000,
    "min": 0,
    "max": 20000
  },
  "bullet speed": {
    "default": 4,
    "current": 4,
    "factor": 0.5,
    "min": 4,
    "max": 6
  },
  "bullet damage": {
    "default": 4,
    "current": 4,
    "factor": 1,
    "min": 4,
    "max": 12
  },
  "max speed": {
    "default": 2,
    "current": 2,
    "factor": 0.25,
    "min": 2,
    "max": 4
  },
  "rotation speed": {
    "default": 0.04,
    "current": 0.04
  },
  "mass": {
    "default": 1,
    "current": 1
  },
  "target spawn interval": {
    "default": 1000,
    "current": 1000
  },
  "drop chance": {
    "default": 1, // (this is for testing) default 0.05
    "current": 1
  },
  "keys": {
    w: false,
    a: false,
    s: false,
    d: false,
    shoot: false
  },
  "upgrades": {
    "default": 0,
    "current": 0
  }
}
