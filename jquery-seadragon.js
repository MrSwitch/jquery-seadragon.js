/**
 * Adds the sea dragon script to your webpage
 * Requires JQuery
 * @author Andrew Dodson
 */

(function ($){


	$.fn.seadragon = (function(url){
		
		if(!"Seadragon" in window ){
			try{
				console.error("Please include the seadragon script, e.g. ");
			}catch(e){
				
			}
		}
	
		function log() {
			if (typeof(console) === 'undefined'||typeof(console.log) === 'undefined') return;
			if (typeof console.log === 'function') {
				console.log.apply(console, arguments); // FF, CHROME, Webkit
			}
			else{
				console.log(Array.prototype.slice.call(arguments)); // IE
			}
			
			// we print out to a div for debugging on iOS
			var log = document.getElementById("log");
			if(log){
				log.innerHTML = Array.prototype.slice.call(arguments) + "<br />" + log.innerHTML; 
			}
		}
	
		return $(this).each(function(){
	
			var viewer = new Seadragon.Viewer(this);
	
			$.getJSON("http://api.zoom.it/v1/content/?url="+encodeURIComponent(url)+"&callback=?", function(r){
				viewer.openDzi(r.content.dzi);
			});
	
			function coord(e) {
			    // iOS devices expose "changedTouches"
		    	var t = e.touches;
			    if(t){
			    	if(t.length>1){
			    		e = {
			    			clientX : t[0].clientX + ((t[0].clientX-t[1].clientX)/2),
			    			clientY : t[0].clientY + ((t[0].clientY-t[1].clientY)/2)
			    		};
			    	}
					else
						e = e.changedTouches[0];
	
			    }
			    return e;
			}
		
		
			/**
			 * We dont want to attach these events to the parent because then the buttons are fudged!
			 * Bind to the #container
			 */
			$(" > div > div:eq(0)", this)
			.bind('touchstart', function(e){
				var p = coord(e.originalEvent);
				p.start = true;
				p.scale = 1;
				$(this).data(p);
				log("touchstart", p.clientX, p.clientY);
		
				e.preventDefault();
				e.stopPropagation();
			})
			.bind('touchmove', function(e){
				log("touchmove" );
				var p = coord(e.originalEvent),
					d = $(this).data(),
					v = viewer.viewport,
					b = v.getBounds(),
					c = v.getCenter(),
					s = v.getContainerSize(),
					dx = p.clientX - d.clientX,
					dy = p.clientY - d.clientY,
					dX = (b.width/s.x);
				log("touchmove", p.length, dX );
	
				// SCALE
				if(e.originalEvent.scale&&e.originalEvent.scale!==1){
	
					var i = Math.pow(1+(e.originalEvent.scale-d.scale), 0.5);
					log("scale", i, e.originalEvent.scale, d.scale, (p.clientX*dX), (p.clientY*dX) );
					if(i>0){
						viewer.viewport.zoomBy(i, new Seadragon.Point(b.x+(p.clientX*dX), b.y+(p.clientY*dX)), true);
					}
				}
	
				// MOVE
				else {
					viewer.viewport.panTo(new Seadragon.Point(c.x-(dx*dX), c.y-(dy*dX)));
				}
	
				// save defaults
				p.start = false;
				p.scale = e.originalEvent.scale;
	
				$(this).data(p);
	
				log("touchmove", p.clientX, p.clientY);
				
				viewer.viewport.applyConstraints();
	
				e.preventDefault();
				e.stopPropagation();
			})
			.bind("touchend", function(e){
	
				log("touchend",e.originalEvent.changedTouches.length);
				
				var p = coord(e.originalEvent),
					d = $(this).data(),
					c = viewer.viewport.getCenter(),
					b = viewer.viewport.getBounds(),
					dX = (b.width/viewer.viewport.getContainerSize().x);
	
	
				/**
				 * We check whether the start event was the last event fired.
				 * And then we can treat this as a mouse "click"
				 * Android 2.1 fires a touchmove in between, but we'll work on that another time.
				 */
	
				if(d.start){
					viewer.viewport.zoomBy(1.5,new Seadragon.Point(b.x+(p.clientX*dX), b.y+(p.clientY*dX)));
					log("zoom", b.x+(p.clientX*dX), b.y+(p.clientY*dX));
				}
				viewer.viewport.applyConstraints();
			});
		});
		
	});

})(jQuery);