var StatsView = Backbone.View.extend({
  /* Fill out your solution here */

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
  // shouldShow: {
  //   value: false
  // },
  initialize: function(){
    $('body').append(this.$el);
    // this.collection.on('change', this.checkRender, this);
    this.collection.on('changeStats', this.render, this);
  },
  // checkRender: function(){
  //   if(this.shouldShow.value){
  //     this.render();
  //   }
  // },

  render: function() {
    this.$el.show();
    this.$el.children().detach();
    this.collection.forEach(this.renderStats, this);
    // this.shouldShow.set('value', true);
  },

  renderStats: function(item) {
    this.$el.append(this.template(item.attributes));
    var bardata = [item.attributes.health, item.attributes.age,
    item.attributes.juiciness, item.attributes.intelligence];
    var barvalue = ['health', 'age', 'juiciness', 'intelligence'];
    var width = 800;
    // var height = 400;
    var barWidth = 50;
    var barOffset = 5;
    var colors = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range(['#ffb832', '#c61c6f']);
    var height;
    d3.select(this.el)
      .append('svg')
      .attr('height', 400)
      .attr('width', 800)
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