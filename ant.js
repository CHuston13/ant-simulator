class Ant {
    constructor(x, y, colony) {
      this.x = x;
      this.y = y;
      this.size = 10;
      this.speed = 4;
      this.health = 100;
      this.colony = colony;
      this.hunger = 50;
    }
  
    move(ants, foods) {
      // Move towards the nearest food source
      let nearestFood = null;
      let closestFoodDistance = Infinity;
  
      for (const food of foods) {
        const distance = Math.sqrt((this.x - food.x) ** 2 + (this.y - food.y) ** 2);
        if (distance < closestFoodDistance) {
          closestFoodDistance = distance;
          nearestFood = food;
        }
      }
  
      if (nearestFood) {
        const angle = Math.atan2(nearestFood.y - this.y, nearestFood.x - this.x);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
  
        if (closestFoodDistance < this.size) {
          this.health = Math.min(this.health + 20, 100);
          foods.splice(foods.indexOf(nearestFood), 1);
          this.hunger = 100; // Reset hunger when eating
        }
      } else {
        // Move randomly if no food nearby
        this.x += (Math.random() - 0.5) * this.speed;
        this.y += (Math.random() - 0.5) * this.speed;
  
        // Decrease hunger over time
        this.hunger = Math.max(this.hunger - 0.1, 0);
      }
  
      this.x = Math.min(Math.max(this.x, 0), canvas.width);
      this.y = Math.min(Math.max(this.y, 0), canvas.height);
  
      // Check if ant should split
      if (this.health >= 150) {
        this.split(ants);
      }
    }
  
    split(ants) {
      // Create a new ant with half the health
      const newAnt = new Ant(this.x, this.y, this.colony);
      newAnt.health = this.health / 2;
      this.health /= 2;
  
      // Add the new ant to the array
      ants.push(newAnt);
    }
  
    compete(otherAnt) {
      const distance = Math.sqrt((this.x - otherAnt.x) ** 2 + (this.y - otherAnt.y) ** 2);
      if (distance < this.size / 2 + otherAnt.size / 2 && this.colony !== otherAnt.colony) {
        // Ants from different colonies are close and compete
        if (Math.random() < 0.5) {
          // Reduce the size of the losing ant
          otherAnt.size = Math.max(otherAnt.size - 5, 0);
        } else {
          this.size = Math.max(this.size - 5, 0);
        }
      }
    }
  
    draw() {
      // Draw health bar
      const healthBarHeight = 8;
      ctx.fillStyle = 'black';
      ctx.fillRect(this.x - this.size / 2, this.y - this.size - healthBarHeight - 2, this.size, healthBarHeight);
  
      // Draw filled health based on percentage
      const healthPercentage = this.health / 100;
      const fillColor = `rgb(${Math.round(255 * (1 - healthPercentage))}, ${Math.round(255 * healthPercentage)}, 0)`;
      ctx.fillStyle = fillColor;
      ctx.fillRect(this.x - this.size / 2, this.y - this.size - healthBarHeight - 2, this.size * healthPercentage, healthBarHeight);
  
      // Draw ant
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.colony.color;
      ctx.fill();
      ctx.closePath();
    }
  }