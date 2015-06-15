var DumplingView = Backbone.View.extend({
  /* Fill out your solution here */

  template: _.template('<h2 class="dumView">Home</h2><h2 class="statsView">Stats</h2><h2 class="name"><%= name %>, says hi!</h2><img class="dumImg" src="<%= image %>"/>'),

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
    // console.log(this.$el.children('img'));
    var imgEl = this.$el.children('img')[0];
    var move = function(){d3.select(imgEl)
        .style({'margin-left': '-300px'})
        .transition().duration(2000)
        .style({'margin-left':'300px'})
        .transition().duration(2000)
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
  }
});