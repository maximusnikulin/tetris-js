export default class Statistic {
  data: { scores: number; speed: number }
  constructor() {
    this.data = {
      scores: 0,
      speed: 1,
    }
  }

  update(data: any) {
    this.data = {
      ...this.data,
      ...data,
    }
  }
}
