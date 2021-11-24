
var pipeline = [
    {$match : {
    'imdb.rating': { $gte: 7},
      $and: [
          {languages: {$in: [ 'Japanese' ]}},
          {languages: {$in: [ 'English' ]}}
          ],
      $or: [{ rated: 'PG' }, { rated: 'G' }],
      
      genres:{
        $not: {$in: [ 'Crime']},
        $not: {$in: [ 'Horror']}
      }
    }},
    {$project: {
      title:1,
      rated:1
    }}
]

 // coreect answer

  var pipeline = [
    {
      $match: {
        "imdb.rating": { $gte: 7 },
        genres: { $nin: [ "Crime", "Horror" ] } ,
        rated: { $in: ["PG", "G" ] },
        languages: { $all: [ "English", "Japanese" ] }
      },
      $project: {
        title:1,
        rated:1
      }
    }
  ]