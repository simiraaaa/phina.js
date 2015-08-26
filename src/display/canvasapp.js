
phina.namespace(function() {

  /**
   * @class phina.display.CanvasApp
   * 
   */
  phina.define('phina.display.CanvasApp', {
    superClass: 'phina.display.DomApp',

    /**
     * @constructor
     */
    init: function(params) {
      this.superInit(params.query);

      this.canvas = phina.graphics.Canvas(this.domElement);
      this.canvas.setSize(params.width, params.height);

      this.fitScreen();
    },

    _draw: function() {
      this.canvas.clear();

      this.currentScene._render();

      var c = this.currentScene.canvas;
      this.canvas.context.drawImage(c.domElement, 0, 0, c.width, c.height);
    },

    fitScreen: function() {
      this.canvas.fitScreen();
    },

  });
});
