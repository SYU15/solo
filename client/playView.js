var PlayView = Backbone.View.extend({
  /* Fill out your solution here */

  template: _.template('<h2 class="dumView">Home</h2> \
    <h2 class="statsView">Stats</h2><h2 class="feedView">Feed</h2> \
    <h2 class="playView">Play</h2> <img class="game" src="assets/game.png"/> \
    <img class="playImg" src="<%= image %>"/>'),

  events: {
    'click .dumView': 'changeToDums',
    'click .statsView': 'changeToStats',
    'click .feedView': 'changeToFood'
  },
  shouldShow: {
    value: false
  },
  initialize: function(){
    $('body').append(this.$el);
    this.collection.on('change', this.checkRender, this);
    this.collection.on('changePlay', this.render, this);
  },
  checkRender: function(){
    if(this.shouldShow.value){
      this.render();
    }
  },

  render: function() {
    this.$el.show();
    this.$el.children().detach();
    this.collection.forEach(this.renderDumpling, this);
    this.shouldShow.set('value', true);
  },
  renderDumpling: function(item) {
    this.$el.append(this.template(item.attributes));
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
  }  
});