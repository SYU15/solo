var DumplingView = Backbone.View.extend({
  /* Fill out your solution here */

  template: _.template('<h2 class="dumView">Home</h2><h2 class="statsView">Stats</h2><h2 class="name"><%= name %>, says hi!</h2><div class="dum"><img class="dumImg" src="<%= image %>"/><div>'),

  events: {
    'click .statsView': 'changeToStats'
  },

  initialize: function(){
    this.render();
    $('body').append(this.$el);
    this.collection.on('change', this.render, this);
    this.collection.on('changeDums', this.render, this);
  },

  render: function() {
    this.$el.show();
    this.$el.children().detach();
    this.collection.forEach(this.renderDumpling, this);
  },

  renderDumpling: function(item) {
    this.$el.append(this.template(item.attributes));
  },

  changeToStats: function(){
  this.$el.hide();
  this.collection.trigger('changeStats');
  }
});