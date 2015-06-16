var ChooseView = Backbone.View.extend({
  /* Fill out your solution here */

  template: _.template('<h2 class="dumView">Home</h2> \
    <h2 class="statsView">Stats</h2><h2 class="feedView">Feed</h2> \
    <h2 class="playView">Play</h2><h2 class="chooseView">Switch Dumpling</h2> \
    <div class="selections"><h3 class ="shumai">Lucy</h3><h3 class ="shrimp">Mark</h3> \
    <h3 class="xiaolongbao">Bunny</h3></div>'),

  events: {
    'click .statsView': 'changeToStats',
    'click .feedView': 'changeToFood',
    'click .playView': 'changeToPlay',
    'click .dumView': 'changeToDums'
  },

  initialize: function(){
    $('body').append(this.$el);
    // this.collection.on('change', this.render, this);
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