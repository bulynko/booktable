Meteor.startup(function () {
  if (Locations.find().count() === 0) {
    var loc = [
      {'name': 'QATAR',      'description': 'GBM Qatar'},
        
      {'name': 'DUBAI-HO',   'description': 'GBM Dubai UCMC'},

      {'name': 'ABU-DHABI',  'description': 'GBM Abu Dhabi'},        
        
      {'name': 'OMAN',    'description': 'GBM Oman'},
        
      {'name': 'KUWAIT',  'description': 'GBM Kuwait'},

      {'name': 'BAHRAIN', 'description': 'GBM Bahrain'},
        
      {'name': 'GBM-HO',   'description': 'GBM Dubai HO'}
    ];
    for (var i = 0; i < loc.length; i++)
      Locations.insert({name: loc[i].name, description: loc[i].description});
  }
});
