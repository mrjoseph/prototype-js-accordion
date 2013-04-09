
  	var prototypeAccordion = prototypeAccordion || {};
  	prototypeAccordion = {
  		//Slide Toggle Effect
  		slideToggle : function(elem,speed){
  			Effect.toggle( elem, 'slide', {
  			    duration: speed,
  			    beforeStart: function() {
  			        $$('div.show').each( function (el) {
  			            el.removeClassName( 'show' );
                    var arrow = el.up().down('h4').down('span');
                    arrow.removeClassName( 'opened' );
                    arrow.addClassName( 'closed' );
  			            Effect.SlideUp(el, { duration: speed } );
  			        });
  			    },
  			    afterFinish: function() {
  			        if( elem.visible() ) {
  			            elem.addClassName( 'show' );
                    var arrow = elem.up().down('h4').down('span');
                    arrow.removeClassName( 'closed' );
                    arrow.addClassName( 'opened' );
                    
  			        }
  			    }
  			});
  		},

      //Slide down the first slider
      openThisFirst : function(accordion,speed,delay,first){
         console.log(first);
        var 
        accordionLi = document.getElementById(accordion).getElementsByTagName("li"),
        i, 
        result = [],
        firstOpen;
        for(i=0;i<accordionLi.length;i++){
        result.push(accordionLi[i]);  
        }
        firstOpen = result[first].down('div');
        setTimeout(function(){
          prototypeAccordion.slideToggle(firstOpen,speed); 
        },delay);
      },

  		init : function(accordion,speed,delay,first){
        //prototypeAccordion.addArrows();
  			//This function adds ids to the containers and adds inline css display none.
  			var i = 0;
  			$$('#'+ accordion +' li').each( function (link) {
  				var container = link.down('div');
  				if(!container.hasAttribute('id')){
  					container.writeAttribute('id','temp'+ i);
  				}		
  				i++;
  			});

			//Slide down the first slider
     
      if(typeof first == "number"){
        prototypeAccordion.openThisFirst(accordion,speed,delay,first);
      }
      
			$$('#'+ accordion +' li').each( function (link) {
				var container = link.up().down('div');
	             link.observe('click', function(event) {
	                content = event.element().up().down('div.container');
	                prototypeAccordion.slideToggle(content,speed);
	            });
	        });
  		}
  	};

	document.observe("dom:loaded", function() {
		
var LoadAccordion = function(accordion,speed,delay,first){
  if($$('#'+accordion ).length > 0){
    prototypeAccordion.init(accordion,speed,delay,first);
  } else {
    console.log('accordion does not exsist');
  }
};
/*
  @description:
  To use accordion more than once create another instance of the LoadAccordion()
  @peram:
  1. Dom element
  2. sopeed
  3. delay before first slide
  4. container to slide open. If removed will not slide open any containers

*/
  LoadAccordion('accordion',.3,500,2);
	});
 
  