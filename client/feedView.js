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