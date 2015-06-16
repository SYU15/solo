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