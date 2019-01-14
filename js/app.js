/**
 ** Entry point.
 **/

class App {
  constructor() {
    console.log(this.getHello());
  }

  getHello() {
    return "Hello Travis";
  }
}

window.onload = () => {
  const app = new App();
}
