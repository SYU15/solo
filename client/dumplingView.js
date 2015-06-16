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