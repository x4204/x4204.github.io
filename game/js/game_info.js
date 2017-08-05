let Game = {
  "FPS": 60,
  "upgrades": 0,
  "canvas": {
    "width": canvas.width,
    "height": canvas.height
  },
  "time": {
    "default": 60,
    "factor": 5,
    "min": 60,
    "max": 120
  },
  "health": {
    "default": 10000,
    "factor": 2000,
    "min": 10000,
    "max": 20000
  },
  "armor": {
    "default": 0,
    "factor": 1000,
    "min": 0,
    "max": 20000
  },
  "bullet speed": {
    "default": 4,
    "factor": 0.5,
    "min": 4,
    "max": 6
  },
  "bullet damage": {
    "default": 4,
    "factor": 1,
    "min": 4,
    "max": 12
  },
  "max speed": {
    "default": 2,
    "factor": 0.25,
    "min": 2,
    "max": 4
  },
  "rotation speed": {
    "default": 0.04,
    "factor": 0.005,
    "min": 0.04,
    "max": 0.06
  },
  "mass": {
    "default": 1,
    "factor": 0.05,
    "min": 0.6,
    "max": 1
  },
  "target spawn interval": {
    "default": 1000,
    "factor": 50,
    "min": 500,
    "max": 1000
  },
  "drop chance": {
    "default": 0.05, // default 0.05
    "factor": 0.002,
    "min": 0.05,
    "max": 0.1
  },
  "keys": {
    w: false,
    a: false,
    s: false,
    d: false,
    shoot: false
  }
}
