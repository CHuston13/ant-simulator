const canvas = document.getElementById('antCanvas');
const ctx = canvas.getContext('2d');

const colonies = [
  new Colony('#FF0000'), // Red colony
  new Colony('#00FF00'), // Green colony
  new Colony('#0000FF'), // Blue colony
];

const ants = [];
const foods = [];

function checkFoodAvailability() {
  const minimumFoodCount = 5;

  if (foods.length < minimumFoodCount) {
    const newFoodCount = minimumFoodCount - foods.length;

    for (let i = 0; i < newFoodCount; i++) {
      const newFood = new Food(Math.random() * canvas.width, Math.random() * canvas.height);
      foods.push(newFood);
    }
  }
}

function simulate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  checkFoodAvailability();

  let aliveAnts = false;

  for (const ant of ants) {
    ant.move(ants, foods);

    for (const otherAnt of ants) {
      if (ant !== otherAnt) {
        ant.compete(otherAnt);
      }
    }

    ant.draw();

    if (ant.health > 0) {
      aliveAnts = true;
    }
  }

  for (const food of foods) {
    food.draw();
  }

  if (!aliveAnts) {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Ant violence isn\'t cool, man.', canvas.width / 2 - 200, canvas.height / 2);
  } else {
    requestAnimationFrame(simulate);
  }
}

// Initialize ants
for (let i = 0; i < 100; i++) {
  const colony = colonies[Math.floor(Math.random() * colonies.length)];
  const ant = new Ant(Math.random() * canvas.width, Math.random() * canvas.height, colony);
  ants.push(ant);
}

// Initialize food sources
for (let i = 0; i < 10; i++) {
  const food = new Food(Math.random() * canvas.width, Math.random() * canvas.height);
  foods.push(food);
}

simulate();
