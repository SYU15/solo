var PlayView = Backbone.View.extend({
  /* Fill out your solution here */

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
  // shouldShow: {
  //   value: false
  // },
  initialize: function(){
    $('body').append(this.$el);
    // this.collection.on('change', this.checkRender, this);
    this.collection.on('changePlay', this.render, this);
  },
  // checkRender: function(){
  //   if(this.shouldShow.value){
  //     this.render();
  //   }
  // },

  render: function() {
    this.$el.show();
    this.$el.children().detach();
    this.collection.forEach(this.renderDumpling, this);
    // this.shouldShow.set('value', true);
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
      .transition().duration(1000)
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