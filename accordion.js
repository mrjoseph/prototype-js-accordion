
  	var sa_Customer_Service_accordion = sa_Customer_Service_accordion || {};
  	sa_Customer_Service_accordion = {
      addArrows : function(){
        $$('ul#cs-accordion li').each(function (elem){
        });
      },

  		//Slide Toggle Effect
  		slideToggle : function(elem){
  			Effect.toggle( elem, 'slide', {
  			    duration: 0.5,
  			    beforeStart: function() {
  			        $$('div.show').each( function (el) {
  			            el.removeClassName( 'show' );
                    var arrow = el.up().down('h4').down('span');
                    arrow.removeClassName( 'opened' );
                    arrow.addClassName( 'closed' );
  			            Effect.SlideUp(el, { duration: 0.5 } );
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
      openThisFirst : function(num){
        var 
        accordionLi = document.getElementById('cs-accordion').getElementsByTagName("li"),
        i, 
        result = [],
        firstOpen;
        for(i=0;i<accordionLi.length;i++){
        result.push(accordionLi[i]);  
        }
        firstOpen = result[num].down('div');
        setTimeout(function(){
          sa_Customer_Service_accordion.slideToggle(firstOpen); 
        },2000);
      },

  		init : function(){
        //sa_Customer_Service_accordion.addArrows();
  			//This function adds ids to the containers and adds inline css display none.
  			var i = 0;
  			$$('#cs-accordion li').each( function (link) {
  				var container = link.down('div');
  				if(!container.hasAttribute('id')){
  					container.writeAttribute('id','temp'+ i);
  				}		
  				container.writeAttribute('style','display:none');
  				i++;
  			});

			//Slide down the first slider
      sa_Customer_Service_accordion.openThisFirst(0);

			$$('#cs-accordion li').each( function (link) {
				var container = link.up().down('div');
	             link.observe('click', function(event) {
	                content = event.element().up().down('div.container');
	                sa_Customer_Service_accordion.slideToggle(content);
	            });
	        });
  		}
  	};

	document.observe("dom:loaded", function() {
		
		//Only run if the carousel exsists 
		if($$('#cs-accordion').length > 0){
			sa_Customer_Service_accordion.init();
		} else {
			console.log('accordion does not exsist');
		}
	});
 
  