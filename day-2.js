const utils = require('./utils.js');

const calculatePosition = (steps, aimFeatureFlag = false) => {
  const c = steps.reduce(({ aim, x, y }, step) => {
    let [movement, units] = step.split(' ');
    units = Number(units);

    switch (movement) {
      case 'up':
        y -= aimFeatureFlag ? 0 : units;
        aim -= aimFeatureFlag ? units : 0;
        break;
      case 'down':
        y += aimFeatureFlag ? 0 : units;
        aim += aimFeatureFlag ? units : 0;
        break;
      case 'forward':
        x += units;
        y += aimFeatureFlag ? aim * units : 0;
        break;
    }

    return { aim, x, y };
  }, {
    aim: 0,
    x: 0,
    y: 0,
  });

  return c.x * c.y;
};

const main = async () => {
  const values = await utils.readInputFile(2, true);

  console.log('Part 1', calculatePosition(values));
  console.log('Part 2', calculatePosition(values, true));
};

main();
