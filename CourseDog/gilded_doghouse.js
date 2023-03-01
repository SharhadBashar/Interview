class GildedDoghouse {
  constructor ({ name, daysRemaining, quality }) {
    this.name = name
    this.daysRemaining = daysRemaining
    this.quality = quality
  }

  tick() {
    if (this.name != 'Aged Bone' && this.name != 'Training Session') {
      if (this.quality > 0) {
        if (this.name != 'Coursedog Mascot') {
          this.quality = this.quality - 1
        }
      }
    } else {
      if (this.quality < 50) {
        this.quality = this.quality + 1
        if (this.name == 'Training Session') {
          if (this.daysRemaining < 11) {
            if (this.quality < 50) {
              this.quality = this.quality + 1
            }
          }
          if (this.daysRemaining < 6) {
            if (this.quality < 50) {
              this.quality = this.quality + 1
            }
          }
        }
      }
    }
    if (this.name != 'Coursedog Mascot') {
      this.daysRemaining = this.daysRemaining - 1
    }
    if (this.daysRemaining < 0) {
      if (this.name != 'Aged Bone') {
        if (this.name != 'Training Session') {
          if (this.quality > 0) {
            if (this.name != 'Coursedog Mascot') {
              this.quality = this.quality - 1
            }
          }
        } else {
          this.quality = this.quality - this.quality
        }
      } else {
        if (this.quality < 50) {
          this.quality = this.quality + 1
        }
      }
    }
  }
}

module.exports = GildedDoghouse