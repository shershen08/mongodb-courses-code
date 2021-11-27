var pipeline = [
    {
      $project: {
        _id:0,
        gravity: '$gravity.value'
      }
    },
    {
        $limit: 3
    },
    {
        $count: "summary:"
    },
    {
        $sort: "Name"
    }
  ]
  /*
  aggregate  - takes 1 {} with fields
  */
db.getSiblingDB("aggregations").solarSystem.aggregate(pipeline).pretty()


  var pipeline2 = [
    {},
    {
        _id:0,
        gravity: '$gravity.value'
    }
  ]
  /*
  find takes 2 arguments
  */
  db.getSiblingDB("aggregations").solarSystem.find(...pipeline2).skip(5)

  db.getSiblingDB("aggregations").solarSystem.find(...pipeline2).sort().skip(5);


  var pipeline3 = [
    {
      $sample: {
          size: 5
        }
    }
  ]
  db.getSiblingDB("aggregations").movies.aggregate(pipeline3).pretty()
