const GildedDoghouse = require('./gilded_doghouse')

describe('GildedDoghouse', () => {
  describe('normal item', () => {
    test('before sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Normal item',
        daysRemaining: 5,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 4,
        quality: 9,
      })
    })

    test('on sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Normal item',
        daysRemaining: 0,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -1,
        quality: 8,
      })
    })

    test('after sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Normal item',
        daysRemaining: -10,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -11,
        quality: 8,
      })
    })

    test('of zero quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Normal item',
        daysRemaining: 5,
        quality: 0,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 4,
        quality: 0,
      })
    })
  })

  describe('Aged Bone', () => {
    test('before sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Aged Bone',
        daysRemaining: 5,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 4,
        quality: 11,
      })
    })

    test('with max quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Aged Bone',
        daysRemaining: 5,
        quality: 50,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 4,
        quality: 50,
      })
    })

    test('on sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Aged Bone',
        daysRemaining: 0,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -1,
        quality: 12,
      })
    })

    test('on sell date near max quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Aged Bone',
        daysRemaining: 0,
        quality: 49,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -1,
        quality: 50,
      })
    })

    test('on sell date with max quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Aged Bone',
        daysRemaining: 0,
        quality: 50,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -1,
        quality: 50,
      })
    })

    test('after sell date with max quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Aged Bone',
        daysRemaining: -10,
        quality: 50,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -11,
        quality: 50,
      })
    })
  })

  describe('Sulfuras', () => {
    test('before sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Coursedog Mascot',
        daysRemaining: 5,
        quality: 80,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 5,
        quality: 80,
      })
    })

    test('on sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Coursedog Mascot',
        daysRemaining: 0,
        quality: 80,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 0,
        quality: 80,
      })
    })

    test('after sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Coursedog Mascot',
        daysRemaining: -10,
        quality: 80,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -10,
        quality: 80,
      })
    })
  })

  describe('Training Session', () => {
    test('long before sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: 11,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 10,
        quality: 11,
      })
    })

    test('long before sell date at max quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: 11,
        quality: 50,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 10,
        quality: 50,
      })
    })

    test('medium close to sell date upper bound', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: 10,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 9,
        quality: 12,
      })
    })

    test('medium close to sell date upper bound at max quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: 10,
        quality: 50,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 9,
        quality: 50,
      })
    })

    test('medium close to sell date lower bound', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: 6,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 5,
        quality: 12,
      })
    })

    test('medium close to sell date lower bound at max quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: 6,
        quality: 50,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 5,
        quality: 50,
      })
    })

    test('very close to sell date upper bound', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: 5,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 4,
        quality: 13,
      })
    })

    test('very close to sell date upper bound at max quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: 5,
        quality: 50,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 4,
        quality: 50,
      })
    })

    test('very close to sell date lower bound', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: 1,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 0,
        quality: 13,
      })
    })

    test('very close to sell date lower bound at max quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: 1,
        quality: 50,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 0,
        quality: 50,
      })
    })

    test('on sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: 0,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -1,
        quality: 0,
      })
    })

    test('after sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Training Session',
        daysRemaining: -10,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -11,
        quality: 0,
      })
    })
  })

  describe('Beef Cake', () => {
    test.skip('before sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Beef Cake',
        daysRemaining: 5,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 4,
        quality: 8,
      })
    })

    test.skip('before sell date at zero quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Beef Cake',
        daysRemaining: 5,
        quality: 0,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: 4,
        quality: 0,
      })
    })

    test.skip('on sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Beef Cake',
        daysRemaining: 0,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -1,
        quality: 6,
      })
    })

    test.skip('on sell date at zero quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Beef Cake',
        daysRemaining: 0,
        quality: 0,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -1,
        quality: 0,
      })
    })

    test.skip('after sell date', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Beef Cake',
        daysRemaining: -10,
        quality: 10,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -11,
        quality: 6,
      })
    })

    test.skip('after sell date at zero quality', () => {
      const gildedDoghouse = new GildedDoghouse({
        name: 'Beef Cake',
        daysRemaining: -10,
        quality: 0,
      })

      gildedDoghouse.tick()

      expect(gildedDoghouse).toMatchObject({
        daysRemaining: -11,
        quality: 0,
      })
    })
  })
})
