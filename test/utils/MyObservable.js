class MyObservable extends Observable {
  mySubscribe(...args) {
    return this.subscribe(...args);
  }
}

export default MyObservable;
