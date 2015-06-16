var Dumpling = Backbone.Model.extend({
  defaults: {
    name: 'Bunny',
    image: 'assets/dumpling.jpg',
    age: 0,
    health: 5,
    intelligence: 10,
    juiciness: 15,
    type: 'xiaolongbao'
  },
  initialize: function(){
    this.getData();
  },
  processData: function(data){
    this.set('name', data.dumpling);
    this.set('age', data.age);
    this.set('health', data.health);
    this.set('intelligence', data.intelligence);
    this.set('juiciness', data.juiciness);
    this.set('type', data.type);
  },
  getData: function(){
    var that = this;
   $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/data',
      success: function(data) {
        console.log(this);
        console.log(data);
        console.log('success');
        that.processData(data);
       },
       error: function(){
        console.log('error');
       }
    });
  }
});