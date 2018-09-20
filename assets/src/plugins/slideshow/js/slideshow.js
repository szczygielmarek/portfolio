(function (root, factory) {
  if ( typeof define === 'function' && define.amd ) {
    define([], factory(root));
  } else if ( typeof exports === 'object' ) {
    module.exports = factory(root);
  } else {
    root.Slideshow = factory(root);
  }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
  'use strict';

  var supports = !!document.querySelector && !!window.addEventListener && !!window.getComputedStyle;

  var defaults = {
    autoplay: true,
    nav: true,
    pagination: true,
    animation: 'slide', // slide, fade
    speed: 5000,
    duration: 1000
  }

  Slideshow.prototype = {
    
    goToSlide: function( index ) {
      if( index < 0 )
        index = this.length - 1;  
      if( index >= this.length )
        index = 0;  

      var direction = index - this.current;   
      this.current = index;

      if( this.oldDirection != null )
        this.directionHasChanged = ( this.oldDirection != direction ) ? true : false;
      this.oldDirection = direction;

      removeClass( this.slides, "slideshow__slide--current" );
      this.slides[ this.current ].classList.add( "slideshow__slide--current" );

      this._animate();

      if( this.settings.pagination ) {
        var pageIndex = this.current;
        if( this.length != this.initialLength ) {
          if( this.current == 0 ) pageIndex = this.initialLength - 1;
          else if( this.current == 1 ) pageIndex = 0;
          else if( this.current == this.initialLength ) pageIndex = pageIndex - 1;
          else if( this.current == this.initialLength + 1 ) pageIndex = 0;
          else pageIndex = pageIndex - 1;
        }
        this._updatePagination( pageIndex );
      }
    },

    slidePrev: function() {
      this.goToSlide( this.current - 1 );
    },

    slideNext: function() {
      this.goToSlide( this.current + 1 );
    },

    _animate: function() {
      this.animated = setTimeout( function() {
        this.animated = false;
      }.bind( this ), this.settings.duration );

      switch( this.settings.animation ) {
        case "slide":
          this._slide();
          break;    
        default:
          break;  
      }
    },

    _slide: function() {
      if( this.current > 0 && this.current < this.length - 1 ) {
        this.sliderWrapper.classList.add( "slideshow--animated" );
      } else {
        
        if(this.directionHasChanged) { 
          this.sliderWrapper.classList.add( "slideshow--animated" );
          this.sliderWrapper.style.marginLeft = -( this.current ) * this.slideWidth + "px";
        }

        setTimeout( function() {
          this.sliderWrapper.classList.remove( "slideshow--animated" );
  
          if( this.current == this.length - 1 ) {
            this.sliderWrapper.style.marginLeft = -this.slideWidth + "px";
            this.current = 1;
          }
          if( this.current == 0 ) {
            this.sliderWrapper.style.marginLeft = -( this.length - 2 ) * this.slideWidth + "px";
            this.current = this.length - 2;
          }
          
        }.bind( this ), this.settings.duration );
      } 
      
      this.sliderWrapper.style.marginLeft = -( this.current ) * this.slideWidth + "px";
    },

    _setInterval: function() {      
      this.interval = setTimeout( function() {
        this.slideNext();
        this._setInterval();
      }.bind( this ), this.settings.speed );
    },

    _addNav: function() {
      this.navPrev = createHTMLElement("div", {
        "class": "slideshow__prev",
        "text": "&larr;"
      });
      this.navNext = createHTMLElement("div", {
        "class": "slideshow__next",
        "text": "&rarr;"
      });

      var nav = createHTMLElement("nav", {"class": "slideshow__nav"});
      nav.appendChild( this.navPrev );
      nav.appendChild( this.navNext );

      this.slider.appendChild( nav );
    },

    _handleClickPrev: function( event ) {
      if( this.animated )
        return false;

      clearTimeout( this.interval );
      this.interval = null;

      this.slidePrev();

      if( this.settings.autoplay )  
        this._setInterval();  
    },

    _handleClickNext: function( event ) {
      if( this.animated )
        return false;

      clearTimeout( this.interval );
      this.interval = null;

      this.slideNext();

      if( this.settings.autoplay )  
        this._setInterval();  
    },

    _addPagination: function() {
      this.pagination = createHTMLElement("nav", {
        "class": "slideshow__pagination",
      });

      for( var i = 0; i < this.initialLength; i++ ) {
        this.pagination.appendChild( document.createElement( "div" ) );
      }

      this._updatePagination( 0 );

      this.slider.appendChild( this.pagination );
    },

    _handleClickPagination: function( event ) {
      if( this.animated )
        return false;

      clearTimeout( this.interval );
      this.interval = null;
      
      var index = getElementIndex( event.target );

      if( this.length != this.initialLength )
        index = getElementIndex( event.target ) + 1;
      
      this.goToSlide( index );
        
      if( this.settings.autoplay )  
        this._setInterval();  
    },

    _updatePagination: function( index ) {
      var pages = this.pagination.querySelectorAll( "div" );  
      removeClass( pages, "active" );
      pages[ index ].classList.add( "active" );
    },

    _handleKeyEvents: function( e ) {
      if( this.animated )
        return false;

      clearTimeout( this.interval );
      this.interval = null;

      if( e.keyCode == 37 )
        this.slidePrev();
      if( e.keyCode == 39 )
        this.slideNext();
        
      if( this.settings.autoplay )  
        this._setInterval();  
    },

    _handleResizeEvent: function( e ) {
      if( this.sliderWrapper ) {
        this.slideWidth = this.slider.offsetWidth;
        this.sliderWrapper.style.width = this.length * this.slideWidth + "px"; 
        this.sliderWrapper.style.marginLeft = -( this.current ) * this.slideWidth + "px";
      } else {
        this.slideWidth = this.slides[ 0 ].offsetWidth;
      }  
    },

    _addWrapper: function() {
      this.sliderWrapper = wrap( "slideshow__wrapper", this.slides );
      
      var firstClone = this.slides[ 0 ].cloneNode( true );
      firstClone.classList.add( "slideshow__slide--clone" );
      var lastClone = this.slides[ this.length - 1 ].cloneNode( true );
      lastClone.classList.add( "slideshow__slide--clone" );
      this.slides[ 0 ].parentNode.insertBefore( lastClone, this.slides[ 0 ] );
      this.slides[ 0 ].parentNode.appendChild( firstClone );
      
      this.slides = this.slider.querySelectorAll( ".slideshow__slide" );
      this.length = this.length + 2;
      this.current = 1;

      this.sliderWrapper.style.width = this.length * this.slideWidth + "px";
      this.sliderWrapper.style.marginLeft = -( this.current ) * this.slideWidth + "px";
    },

    init: function( options ) {
      if ( !supports ) return;

      this.settings = extend( defaults, options || {} );

      var htmlOptions = booleanDataset( this.slider.dataset, this.settings );
      this.settings = extend( this.settings, htmlOptions );

      if( "slideshow--fade" in this.slider.classList ) {
        this.settings.animation = "fade";
      } else if( "slideshow--slide" in this.slider.classList  ) {
        this.settings.animation = "slide";
      } else {
        this.slider.classList.add( "slideshow--" + this.settings.animation );
      }
      this.slides[ this.current ].classList.add( "slideshow__slide--current" );
      
      var cssOptions = getCSSProperties( getComputedStyle( this.slider ), this.settings );
      this.settings = extend( this.settings, cssOptions );      

      if( this.settings.animation !== "fade" ) 
        this._addWrapper();
      
      if( this.settings.autoplay )
        this._setInterval();

      if( this.settings.nav ) {
        this._addNav();
        
        this.navPrev.addEventListener( "click", this._handleClickPrev.bind( this ) );
        this.navNext.addEventListener( "click", this._handleClickNext.bind( this ) );
      }
        
      if( this.settings.pagination ) {
        this._addPagination();

        forEach( this.pagination.querySelectorAll( "div" ), function( btn ) {
          btn.addEventListener( "click", this._handleClickPagination.bind( this ) );
        }, this );
      }

      this.slider.setAttribute( "tabindex", "-1" );  
      this.slider.addEventListener( "keydown", this._handleKeyEvents.bind( this ) );
      
      window.addEventListener( "resize", debounce( 250, this._handleResizeEvent ).bind( this ) );

    }

  };
  
  function Slideshow( slider, options ) {
    this.slider = slider;
    this.sliderWrapper = null;
    this.slides = slider.querySelectorAll( ".slideshow__slide" );
    this.slideWidth = this.slides[ 0 ].offsetWidth;  
    this.initialLength = this.slides.length;  
    this.length = this.slides.length;
    this.current = 0;
   
    this.settings = Object.create( null );
    this.interval = null;
    this.animated = false;

    this.oldDirection = null;
    this.directionHasChanged = false;

    this.navPrev = null;
    this.navNext = null;
    this.pagination = null;

    this.init( options );
  }

  return Slideshow;





  /* HELPERS */
  function forEach(collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === '[object Object]') {
      for (var prop in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, prop)) {
          callback.call(scope, collection[prop], prop, collection);
        }
      }
    } else {
      for (var i = 0, len = collection.length; i < len; i++) {
        callback.call(scope, collection[i], i, collection);
      }
    }
  };

  function extend( defaults, options ) {
    var extended = Object.create(null);

    forEach(defaults, function( value, prop ) {
      extended[prop] = defaults[prop];
    });

    forEach(options, function( value, prop ) {
      extended[prop] = options[prop];
    });

    return extended;
  };

  function debounce( delay, callback ) {
    var timeout = null; 

    return function() { 
      var context = this, args = arguments;
      
      clearTimeout( timeout );
      timeout = setTimeout( function() {
        callback.apply( context, args );
      }, delay );
    }

  };

  function getElementIndex( node ) {
    var index = 0;
    while ( (node = node.previousElementSibling) )
      index++;
    return index;
  };

  function removeClass( collection, name ) {
    var names = name.split(" ");

    forEach(collection, function ( element ) {
      names.forEach(function( className ) {
        element.classList.remove( className );
      });
    });
  }

  function wrap( className, collection ) {
    var container = document.createElement("div"),
        parent = collection[0].parentNode;
    container.className = className;
    forEach(collection, function(slide) {
      container.appendChild(slide);
    });
    parent.appendChild(container);
    return container;
  }

  function createHTMLElement( el, attr ) {
    var _el = document.createElement( el );
    
    if( attr !== null && typeof attr === "object" ) {
      for( var key in attr ) {
        if( attr.hasOwnProperty( key ) ) {
          switch( key ) {
            case "text":
              _el.innerHTML = attr[ key ];
              break;
            case "class":
              _el.className = attr[ key ];
              break;
            default:
              _el.setAttribute( key, attr[ key ] );  
          }
        }
      }
    }

    return _el;
  }

  function booleanDataset( dataset, refObj ) {
    var newObj = Object.create( null );

    for( var prop in dataset ) {
      if( prop in refObj ) {
        newObj[ prop ] = ( dataset[ prop ] === "true" );
      }
    }

    return newObj;
  }

  function getCSSProperties( styleObj, refObj ) {
    var newObj = Object.create( null );

    for( var prop in refObj ) {
      var val = parseInt( styleObj.getPropertyValue( "--" + prop ) );
      if( val ) newObj[ prop ] = val;
    }

    return newObj;
  }

});