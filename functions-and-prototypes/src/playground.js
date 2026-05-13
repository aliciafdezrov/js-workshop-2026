function Person(age) {
  this.age = age;
}

Person.prototype.sayAge = function() {
  console.log(this.age);
}

Person.prototype.sayDelayedAge = function() {
  setTimeout(function() {
    console.log(this.age);
  }, 1000);
}

const me = new Person(38);
me.sayDelayedAge();