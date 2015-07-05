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
var DumplingView = Backbone.View.extend({

  template: _.template('<h2 class="dumView">Home</h2> \
    <h2 class="statsView">Stats</h2><h2 class="feedView">Feed</h2> \
    <h2 class="playView">Play</h2> <h2 class="chooseView">Switch Dumpling</h2> \
    <h3 class="name"><%= name %>, says hi!</h3><img class="dumImg" src="<%= image %>"/>'),

  events: {
    'click .statsView': 'changeToStats',
    'click .feedView': 'changeToFood',
    'click .playView': 'changeToPlay',
    'click .chooseView': 'changeToChoose'
  },

  initialize: function(){
    this.render();
    $('body').append(this.$el);
    this.collection.on('changeDums', this.render, this);
  },

  render: function() {
    this.$el.show();
    this.$el.children().detach();
    this.collection.forEach(this.renderDumpling, this);
    var imgEl = this.$el.children('img')[0];
    var move = function(){d3.select(imgEl)
        .style({'margin-left': '-300px'})
        .transition().duration(2000).ease('quad')
        .style({'margin-left':'300px'})
        .transition().duration(2000).ease('quad')
        .style({'margin-left':'-300px'});
      };
     move();    
      setInterval(move, 4000); 
  },
  renderDumpling: function(item) {
    this.$el.append(this.template(item.attributes));
  },

  changeToStats: function(){
  this.$el.hide();
  this.collection.trigger('changeStats');
  },
  changeToFood: function() {
    this.$el.hide();
    this.collection.trigger('changeFood');
  },
  changeToPlay: function(){
    this.$el.hide();
    this.collection.trigger('changePlay');
  },
  changeToChoose: function(){
    this.$el.hide();
    this.collection.trigger('changeChoose');
  } 
});
var FeedView = Backbone.View.extend({

  template: _.template('<h2 class="dumView">Home</h2> \
    <h2 class="statsView">Stats</h2><h2 class="feedView">Feed</h2> \
    <h2 class="playView">Play</h2> <h2 class="chooseView">Switch Dumpling</h2> \
    <img class="dumImg" src="<%= image %>"/><img class="food" src="assets/food.png"/>'),

  events: {
    'click .dumView': 'changeToDums',
    'click .statsView': 'changeToStats',
    'click .playView': 'changeToPlay',
    'click .chooseView': 'changeToChoose'
  },
  initialize: function(){
    $('body').append(this.$el);
    this.collection.on('changeFood', this.render, this);
  },
  render: function() {
    this.$el.show();
    this.$el.children().detach();
    this.collection.forEach(this.renderDumpling, this);
    this.animateFood();
    this.collection.forEach(this.improveHealth, this);
  },
  renderDumpling: function(item) {
    this.$el.append(this.template(item.attributes));
  },
  animateFood: function(){
    var imgFood = this.$el.children('img')[1];
    d3.select(imgFood)
      .style({'margin-left': '5px'})
      .transition().duration(1000)
      .style({'margin-left':'-5px'})
      .style({'transform': 'scale(1,1)'})
      .transition().duration(1000)
      .style({'transform': 'scale(0,0)'});
  },
  improveHealth: function(item){
    item.set('health', item.get('health') + 3);
    item.trigger('update');
  },
  changeToDums: function() {
    this.$el.hide();
    this.collection.trigger('changeDums');
  },
  changeToStats: function(){
    this.$el.hide();
    this.collection.trigger('changeStats');
  },
  changeToPlay: function(){
    this.$el.hide();
    this.collection.trigger('changePlay');
  },
  changeToChoose: function(){
    this.$el.hide();
    this.collection.trigger('changeChoose');
  }
});
var PlayView = Backbone.View.extend({

  template: _.template('<h2 class="dumView">Home</h2> \
    <h2 class="statsView">Stats</h2><h2 class="feedView">Feed</h2> \
    <h2 class="playView">Play</h2> <h2 class="chooseView">Switch Dumpling</h2> \
    <img class="dumImg" src="<%= image %>"/><img class="game" src="assets/game.png"/> '),

  events: {
    'click .dumView': 'changeToDums',
    'click .statsView': 'changeToStats',
    'click .feedView': 'changeToFood',
    'click .chooseView': 'changeToChoose'
  },
  initialize: function(){
    $('body').append(this.$el);
    this.collection.on('changePlay', this.render, this);
  },
  render: function() {
    this.$el.show();
    this.$el.children().detach();
    this.collection.forEach(this.renderDumpling, this);
    this.collection.forEach(this.improveIntelligence, this);
  },
  renderDumpling: function(item) {
    this.$el.append(this.template(item.attributes));
    this.animateGame();
    this.animateGame();
  },
  animateGame: function(){
    var imgGame = this.$el.children('img')[1];
    d3.select(imgGame)
      .style({'margin-left': '-5px'})
      .style({'transform': 'rotateZ(0deg)'})
      .transition().duration(1000).ease('bounce')
      .style({'margin-left':'5px'})
      .style({'transform': 'rotateZ(180deg)'})
      .transition().duration(1000)
      .style({'transform': 'rotateZ(360deg)'})
      .style({'margin-left':'-5px'});
  },
  improveIntelligence: function(item){
    item.set('intelligence', item.get('intelligence') + 3);
    item.trigger('update');
  },
  changeToDums: function() {
    this.$el.hide();
    this.collection.trigger('changeDums');
  },
  changeToStats: function() {
    this.$el.hide();
    this.collection.trigger('changeStats');
  },
  changeToFood: function() {
    this.$el.hide();
    this.collection.trigger('changeFood');
  },
  changeToChoose: function(){
    this.$el.hide();
    this.collection.trigger('changeChoose');
  }  
});
var StatsView = Backbone.View.extend({

  template: _.template('<h2 class="dumView">Home</h2> \
    <h2 class="statsView">Stats</h2><h2 class="feedView">Feed</h2> \
    <h2 class="playView">Play</h2><h2 class="chooseView">Switch Dumpling</h2><div class="stats"> \
    <h3>Name: <%= name %> </h3><h3>Type: <%= type %></h3></div>'),

  events: {
    'click .dumView': 'changeToDums',
    'click .feedView': 'changeToFood',
    'click .playView': 'changeToPlay',
    'click .chooseView': 'changeToChoose'
  },
  initialize: function(){
    $('body').append(this.$el);
    this.collection.on('changeStats', this.render, this);
  },
  render: function() {
    this.$el.show();
    this.$el.children().detach();
    this.collection.forEach(this.renderStats, this);
  },

  renderStats: function(item) {
    this.$el.append(this.template(item.attributes));
    var bardata = [item.attributes.health, item.attributes.age,
    item.attributes.juiciness, item.attributes.intelligence];
    var barvalue = ['health', 'age', 'juiciness', 'intelligence'];
    var width = 800;
    // var height = 400;
    var barWidth = 100;
    var barOffset = 5;
    var colors = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range(['#ffb832', '#c61c6f']);
    var height =300;
   var barChart = d3.select(this.el)
      .append('svg')
      .attr('height', height)
      .attr('width', 800);

      barChart.selectAll('rect')
      .data(bardata)
      .enter().append('rect')
      .style('fill', colors)
      .attr('width', barWidth)
      .attr('height', function(d,i){
        return d * 25 ;
      })
      .attr('x', function(d, i){
        return i * (barWidth + barOffset);
      })
      .attr('y', function(d){
        return height - d * 25;
      });
    barChart.selectAll('text')
    .data(barvalue)
    .enter().append('text')
    .attr('font-size', '20px')
    .attr('width', 100)
    .attr('x', function(d, i){
        return i * 110;
      })
    .attr('y', height -10)
    .text(function(d){
      return d;
    });
  },
  changeToDums: function() {
    this.$el.hide();
    this.collection.trigger('changeDums');
  },
  changeToFood: function() {
    this.$el.hide();
    this.collection.trigger('changeFood');
  },
  changeToPlay: function(){
    this.$el.hide();
    this.collection.trigger('changePlay');
  },
  changeToChoose: function(){
    this.$el.hide();
    this.collection.trigger('changeChoose');
  } 
});
var ChooseView = Backbone.View.extend({
  /* Fill out your solution here */

  template: _.template('<h2 class="dumView">Home</h2> \
    <h2 class="statsView">Stats</h2><h2 class="feedView">Feed</h2> \
    <h2 class="playView">Play</h2><h2 class="chooseView">Switch Dumpling</h2> \
    <div class="selections"><h1 class ="shumai">Lucy</h1><h1 class ="shrimp">Mark</h1> \
    <h1 class="xiaolongbao">Bunny</h1></div>'),

  events: {
    'click .statsView': 'changeToStats',
    'click .feedView': 'changeToFood',
    'click .playView': 'changeToPlay',
    'click .dumView': 'changeToDums',
    'click .shumai, .shrimp, .xiaolongbao': 'switchIt'   
  },

  initialize: function(){
    $('body').append(this.$el);
    this.collection.on('changeChoose', this.render, this);
  },

  render: function() {
    this.$el.show();
    this.$el.children().detach();
    this.collection.forEach(this.renderChoose, this);
  },
  renderChoose: function(item) {
    this.$el.append(this.template(item.attributes));
  },
  switchIt: function(ev){
    var dumplingId = $(ev.target).text();
    if(dumplingId === 'Lucy'){
      this.collection.forEach(this.triggerLucy, this);
    } else if(dumplingId === 'Mark') {
      this.collection.forEach(this.triggerMark, this);
    } else if (dumplingId === 'Bunny'){
      this.collection.forEach(this.triggerBunny, this);
    }
  },
  triggerMark: function(item){
    item.set('newDum', 'Mark');
    item.trigger('getNew');
  },
  triggerLucy: function(item){
    item.set('newDum', 'Lucy');
    item.trigger('getNew');
  },
  triggerBunny: function(item){
    item.set('newDum', 'Bunny');
    item.trigger('getNew');
  },
  changeToStats: function(){
  this.$el.hide();
  this.collection.trigger('changeStats');
  },
  changeToFood: function() {
    this.$el.hide();
    this.collection.trigger('changeFood');
  },
  changeToPlay: function(){
    this.$el.hide();
    this.collection.trigger('changePlay');
  },
  changeToDums: function(){
  this.$el.hide();
  this.collection.trigger('changeDums');
  }, 
});