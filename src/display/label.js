
phina.namespace(function() {

  /**
   * @class phina.display.Label
   * 
   */
  phina.define('phina.display.Label', {
    superClass: 'phina.display.Shape',

    init: function(options) {
      if (typeof arguments[0] === 'string') {
        options = { text: arguments[0], };
      }
      else {
        options = arguments[0];
      }

      options = (options || {}).$safe({
        backgroundColor: 'transparent',

        fill: 'black',
        stroke: '#222',
        strokeWidth: 2,

        // 
        text: 'Hello, world!',
        // 
        fontSize: 32,
        fontWeight: '',
        fontFamily: "'HiraKakuProN-W3'", // Hiragino or Helvetica,
        // 
        align: 'center',
        baseline: 'middle',
        lineHeight: 1.2,
      });

      this.superInit(options);

      this.text = options.text;
      this.fontSize = options.fontSize;
      this.fontWeight = options.fontWeight;
      this.fontFamily = options.fontFamily;
      this.align = options.align;
      this.baseline = options.baseline;
      this.lineHeight = options.lineHeight;
    },

    calcWidth: function() {
      var width = 0;
      var canvas = this.canvas;
      this._lines.forEach(function(line) {
        var w = canvas.context.measureText(line).width;
        if (width < w) {
          width = w;
        }
      }, this);
      if (this.align !== 'center') width*=2;
      return width;
    },

    calcHeight: function() {
      var height = this.fontSize * this._lines.length;
      if (this.baseline !== 'middle') height*=2;
      return height*this.lineHeight;
    },

    _render: function() {
      var canvas = this.canvas;
      var context = canvas.context;

      var fontSize = this.fontSize;
      var font = "{fontWeight} {fontSize}px {fontFamily}".format(this);
      var lines = this._lines = this.text.split('\n');
      canvas.context.font = font;

      canvas.width = this.calcWidth() + this.padding*2;
      canvas.height = this.calcHeight() + this.padding*2;
      canvas.clearColor(this.backgroundColor);

      canvas.transformCenter();
      context.font = font;
      context.textAlign = this.align;
      context.textBaseline = this.baseline;

      context.fillStyle = this.fill;
      context.strokeStyle = this.stroke;
      context.lineWidth = this.strokeWidth;

      context.lineJoin = "round";

      var lineSize = fontSize*this.lineHeight;
      var offset = -Math.floor(lines.length/2)*lineSize;
      offset += ((lines.length+1)%2) * (lineSize/2);

      if (this.stroke) {
        context.shadowBlur = 0;
        lines.forEach(function(line, i) {
          context.strokeText(line, 0, i*lineSize+offset);
        }, this);
      }

      if (this.shadow) {
        context.shadowColor = this.shadow;
        context.shadowBlur = this.shadowBlur;
      }
      lines.forEach(function(line, i) {
        context.fillText(line, 0, i*lineSize+offset);
      }, this);
    },

    _accessor: {
      text: {
        get: function() { return this._text; },
        set: function(v) { this._dirtyDraw = true; this._text = v; },
      },
      fontSize: {
        get: function() { return this._fontSize; },
        set: function(v) { this._dirtyDraw = true; this._fontSize = v; },
      },
      fontWeight: {
        get: function() { return this._fontWeight; },
        set: function(v) { this._dirtyDraw = true; this._fontWeight = v; },
      },
      fontFamily: {
        get: function() { return this._fontFamily; },
        set: function(v) { this._dirtyDraw = true; this._fontFamily = v; },
      },
      align: {
        get: function() { return this._align; },
        set: function(v) { this._dirtyDraw = true; this._align = v; },
      },
      baseline: {
        get: function() { return this._baseline; },
        set: function(v) { this._dirtyDraw = true; this._baseline = v; },
      },
      lineHeight: {
        get: function() { return this._lineHeight; },
        set: function(v) { this._dirtyDraw = true; this._lineHeight = v; },
      },
    }
  });

});

