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
    // this.getData();
    // this.on('update', this.setData);
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
  },
  createData: function(){
    var dataObj = {
      'dumpling': this.get('name'),
      'age': this.get('age'),
      'health': this.get('health'),
      'intelligence': this.get('intelligence'),
      'juiciness': this.get('juiciness'),
      'type': this.get('type'),
      'image': this.get('image')
    };
    return dataObj;
  },
  setData: function(){
  var data = this.createData();
  $.ajax({
     type: 'POST',
     url: 'http://localhost:8080/data',
     data: data,
     success: function(data) {
       console.log('success');
      },
      error: function(){
       console.log('error');
      }
   });
  }
});