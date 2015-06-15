var StatsView = Backbone.View.extend({
  /* Fill out your solution here */

  template: _.template('<h2 class="dumView">Home</h2><h2 class="statsView">Stats</h2><div class="stats"><%= name %><%= age %><%= health %><div>'),

  events: {
    'click .dumView': 'changeToDums'
  },

  initialize: function(){
    $('body').append(this.$el);
    this.collection.on('change', this.render, this);
    this.collection.on('changeStats', this.render, this);
  },

  render: function() {
    this.$el.show();
    this.$el.children().detach();
    this.collection.forEach(this.renderDumpling, this);
  },

  renderDumpling: function(item) {
    this.$el.append(this.template(item.attributes));
  },
  changeToDums: function() {
    this.$el.hide();
    this.collection.trigger('changeDums');
  }
});