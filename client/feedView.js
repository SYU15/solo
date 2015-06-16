var FeedView = Backbone.View.extend({
  /* Fill out your solution here */

  template: _.template('<h2 class="dumView">Home</h2> \
    <h2 class="statsView">Stats</h2><h2 class="feedView">Feed</h2> \
    <h2 class="playView">Play</h2> <img class="food" src="assets/food.png"/> \
    <img class="feedImg" src="<%= image %>"/>'),

  events: {
    'click .dumView': 'changeToDums',
    'click .statsView': 'changeToStats',
    'click .playView': 'changeToPlay'
  },
  shouldShow: {
    value: false
  },
  initialize: function(){
    $('body').append(this.$el);
    this.collection.on('change', this.checkRender, this);
    this.collection.on('changeFood', this.render, this);
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
  changeToStats: function(){
    this.$el.hide();
    this.collection.trigger('changeStats');
  },
  changeToPlay: function(){
    this.$el.hide();
    this.collection.trigger('changePlay');
  }
});