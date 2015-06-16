var StatsView = Backbone.View.extend({

  template: _.template('<h2 class="dumView">Home</h2> \
    <h2 class="statsView">Stats</h2><h2 class="feedView">Feed</h2> \
    <h2 class="playView">Play</h2><h2 class="chooseView">Switch Dumpling</h2><div class="stats"> \
    <h3>Name: <%= name %> </h3><h3>Type: <%= type %></h3></div>'),

  events: {
    'click .dumView': 'changeToDums',
    'click .feedView': 'changeToFood',
    'click .playView': 'changeToPlay',
    'click .chooseView': 'changeToChoose'
  },
  initialize: function(){
    $('body').append(this.$el);
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
    var width = 800;
    // var height = 400;
    var barWidth = 100;
    var barOffset = 5;
    var colors = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range(['#ffb832', '#c61c6f']);
    var height =300;
   var barChart = d3.select(this.el)
      .append('svg')
      .attr('height', height)
      .attr('width', 800);

      barChart.selectAll('rect')
      .data(bardata)
      .enter().append('rect')
      .style('fill', colors)
      .attr('width', barWidth)
      .attr('height', function(d,i){
        return d * 25 ;
      })
      .attr('x', function(d, i){
        return i * (barWidth + barOffset);
      })
      .attr('y', function(d){
        return height - d * 25;
      });
    barChart.selectAll('text')
    .data(barvalue)
    .enter().append('text')
    .attr('font-size', '20px')
    .attr('width', 100)
    .attr('x', function(d, i){
        return i * 110;
      })
    .attr('y', height -10)
    .text(function(d){
      return d;
    });
  },
  changeToDums: function() {
    this.$el.hide();
    this.collection.trigger('changeDums');
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