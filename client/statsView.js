var StatsView = Backbone.View.extend({
  /* Fill out your solution here */

  template: _.template('<h2 class="dumView">Home</h2><h2 class="statsView">Stats</h2><div class="stats"><h2>Name: <%= name %></h2><h2>Type: <%= type %></h2></div>'),

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
    this.collection.forEach(this.renderStats, this);
  },

  renderStats: function(item) {
    this.$el.append(this.template(item.attributes));
    var bardata = [item.attributes.health, item.attributes.age,
    item.attributes.juiciness, item.attributes.intelligence];
    var barvalue = ['health', 'age', 'juiciness', 'intelligence'];
    var width = 300;
    // var height = 400;
    var barWidth = 50;
    var barOffset = 5;
    var colors = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range(['#ffb832', '#c61c6f']);
    var height;
    d3.select(this.el)
      .append('svg')
      .selectAll('rect')
      .data(bardata)
      .enter().append('rect')
      .style('fill', colors)
      .attr('width', barWidth)
      .attr('height', function(d,i){
        height = d * 10;
        return height;
      })
      .attr('x', function(d, i){
        return i * (barWidth + barOffset);
      })
      .attr('y', function(d){
        return height - d;
      });
    d3.select('svg')
    // .append('svg')
    .selectAll('text')
    .data(barvalue)
    .enter().append('text')
    .attr('font-size', '13px')
    .attr('width', 100)
    .attr('x', function(d, i){
        return i * 60;
      })
    .attr('y', 80)
    .text(function(d){
      return d;
    });
  },
  changeToDums: function() {
    this.$el.hide();
    this.collection.trigger('changeDums');
  }
});