GameInfo = new Mongo.Collection('gameInfos');
var se = null,time=20,you=0,arr=new Array('Stone','Paper','Scissors');
			function p(n){
				you = n;
				document.getElementById('you').innerHTML=s(n);
				document.getElementById('st').disabled=true;
				document.getElementById('mb').disabled=true;
				document.getElementById('jz').disabled=true;
				document.getElementById('cu').innerHTML = '...';
				se = setInterval('t()',50);
			}
			function agin(){
				document.getElementById('st').disabled=false;
				document.getElementById('mb').disabled=false;
				document.getElementById('jz').disabled=false;		
				document.getElementById('la').style.display = 'none';
				document.getElementById('you').innerHTML = '';		
				document.getElementById('pc').innerHTML = '';
				document.getElementById('cu').innerHTML = '';
				document.getElementById('you').innerHTML= 'Please choose';		
			}
			function bt(){
				var pc = Math.floor(Math.random() * 3 + 1);
				document.getElementById('pc').innerHTML = s(pc);
				var str='';
				if(pc==you){
					str += 'Draw';	
				}else{
					var b = pc-you;
					if(b>0){
						if(b==1){
							str += 'AI Win';	
						}else{
							str += 'You Win';	
						}				
					}else{
						b = b*-1;	
						if(b==1){
							str += 'You Win';	
						}else{
							str += 'AI Win';	
						}	
					}		
				}
				document.getElementById('la').style.display = 'block';
				document.getElementById('cu').innerHTML = str;
			}
			function t(){
				if(time>0){
					document.getElementById('pc').innerHTML = arr[time%3];
					time--;
				}else{
					clearInterval(se);
					se = null;
					time = 20;
					bt();
				}
			}
			function s(n){
				if(n==1){
					return 'Stone';	
				}else if(n==2){
					return 'Paper';	
				}else{
					return 'Scissors';	
				}
			}
if (Meteor.isClient) {
  Template.body.helpers({
    scoreOne: function(){      
      
      return GameInfo.find({},{'ownerPoints':1})
    },
    scoreTwo: function(){
      return GameInfo.findOne({},{'guestPoints':1})
    },
   
    arenaA: function(){
      return GameInfo.findOne({},{'ownerAction':1})
    },
    arenaB: function(){
      return  GameInfo.findOne({},{'guestAction':1})
    }    
  })
  
  Template.controller.events({
    'click .start-to-play':function(){    
    if (GameInfo.find()==null) {
        GameInfo.insert({
        count: 1,
        owner: Meteor.user().username,
        guest: null,
        ownerAction: null,
        guestAction: null,
        ownerPoints: 0,
        guestPoints: 0,
        createdAt: new Date()
      })
        return GameInfo.find(owner)
    }
    else if (GameInfo.find({count:2})){
        return "Room is full"
    }
    else GameInfo.update(this._id,{$set:{count:2}},{$set:{guest:Meteor.user().username}})
        return GameInfo.find(guest)
    }
    })  
/*   Template.controller.events({
    'click .clear-the-game':function(){
      Arena.remove({}) //remove all the post in Arena collection      
    }    
    })
   //Events to update the current guestures in game.
   Template.stone.events({
    '.click .stone-btn':function(){
         currentUser=Meteor.user().username
      if (GameInfo.findOne().owner==currentUser) {
        GameInfo.update({        
        ownerAction: "stone",
        createdAt: new Date()
      })
      }
      else GameInfo.update({
        guestAction: "stone",
        createdAt: new Date()
        })    
    }
    
    })
    Template.paper.events({
    '.click .paper-btn':function(){
          currentUser=Meteor.user().username
      if (GameInfo.findOne().owner==currentUser) {
        GameInfo.update({        
        ownerAction: "paper",
        createdAt: new Date()
      })
      }
      else GameInfo.update({
        guestAction: "paper",
        createdAt: new Date()
        })   
    }
    
    })
     Template.scissors.events({
    '.click .scissors-btn':function(){
         currentUser=Meteor.user().username
      if (GameInfo.findOne().owner==currentUser) {
        GameInfo.update({        
        ownerAction: "scissors",
        createdAt: new Date()
      })
      }
      else GameInfo.update({
        guestAction: "scissors",
        createdAt: new Date()
        })   
    }    
    })  
    
   Template.body.events({  
   
  
    })*/
  //Arena room, check if there is anybody in the game or nobody there
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
