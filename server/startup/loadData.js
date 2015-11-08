Meteor.startup(function () {

  if (Locations.find().count() === 0) {
    var loc = [
      {'name': 'QATAR',      'description': 'GMM Qatar'},
      {'name': 'DUBAI-UCC',   'description': 'GMM Dubai UCC'},
      {'name': 'ABU-DHABI',  'description': 'GMM Abu Dhabi'},        
      {'name': 'OMAN',    'description': 'GMM Oman'},
      {'name': 'KUWAIT',  'description': 'GMM Kuwait'},
      {'name': 'BAHRAIN', 'description': 'GMM Bahrain'},
      {'name': 'GMM-HO',   'description': 'GMM Dubai HO'}
    ];
    for (var i = 0; i < loc.length; i++)
      Locations.insert({name: loc[i].name, description: loc[i].description});
  }
  
    
  if (Rooms.find().count() === 0) {
    var room = [
      { 'name': 'VC1',  'loc': 'QATAR',      'description': 'VC','capacity': 5, 'attr': 'projector, Video'},
      { 'name': 'Board',  'loc': 'QATAR',      'description': 'Board Room','capacity': 15, 'attr': 'projector, Video'},
            
      { 'name': 'Board', 'loc': 'DUBAI-UCC',   'description': 'Board room','capacity': 25, 'attr': 'projector'},
      { 'name': 'RXN', 'loc': 'DUBAI-UCC',   'description': 'Roxana','capacity': 8, 'attr': 'projector,white board'},
            
      { 'name': 'VC', 'loc': 'ABU-DHABI',  'description': 'VC','capacity': 5, 'attr': 'projector, Video'},        
      { 'name': 'VC', 'loc': 'OMAN',    'description': 'VC','capacity': 5, 'attr': 'projector, Video'},
      { 'name': 'VC', 'loc': 'KUWAIT',  'description': 'VC','capacity': 5, 'attr': 'projector, Video'},
      { 'name': 'VC', 'loc': 'BAHRAIN', 'description': 'VC','capacity': 5, 'attr': 'projector, Video'},
     
      { 'name': 'VC', 'loc': 'GMM-HO',   'description': 'VC','capacity': 10, 'attr': 'projector, Video, white board'},
      { 'name': 'BS', 'loc': 'GMM-HO',   'description': 'VC','capacity': 5, 'attr': 'projector,  white board'},
      { 'name': 'Board', 'loc': 'GMM-HO',   'description': 'VC','capacity': 15, 'attr': 'projector, white board'}
  
    ];
    
    for (var i = 0; i < room.length; i++)
      Rooms.insert({name: room[i].name, loc: room[i].loc, description: room[i].description,capacity: room[i].capacity,attr: room[i].attr});
  }  
  
    
});
