var Dumpling = Backbone.Model.extend({
  defaults: {
    name: 'Bunny',
    image: 'assets/dumpling.jpg',
    age: 1,
    health: 8,
    intelligence: 15,
    juiciness: 10,
    type: 'xiaolongbao'
  },
  initialize: function(){
    this.on('update', this.setData);
    this.on('getNew', this.retrieve);
  },
  retrieve: function(){
    var newDumpling = this.get('newDum');
    this.getData(newDumpling);
  },
  processData: function(data){
    this.set('name', data.dumpling);
    this.set('age', data.age);
    this.set('health', data.health);
    this.set('intelligence', data.intelligence);
    this.set('juiciness', data.juiciness);
    this.set('type', data.type);
    this.set('image', data.image);
  },
  getData: function(data){
    var that = this;
    var dataObj = {
      'dumpling': data
    };
   $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/data',
      data: dataObj,
      success: function(data) {
        console.log('success');
        that.processData(data);
       },
       error: function(){
        console.log('error');
       }
    });
  },
  setData: function(){
  $.ajax({
     type: 'POST',
     url: 'http://localhost:8080/update',
     data: this.attributes,
     success: function(data) {
       console.log('success setting data');
      },
      error: function(){
       console.log('error');
      }
   });
  }
});