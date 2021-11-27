var favorites = [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney"];

var pipeline = [
    // { $unwind: { path: "$cast", preserveNullAndEmptyArrays: true } },
    {
        $match : {
            'tomatoes.viewer.rating': { 
                 $gte: 5
             },
            countries: "USA",
            // SUPER COOL!!!
            cast: {
                $in: favorites
              }
        }
    },
    {
        $project: {
          _id: 0,
          title: 1,
          "tomatoes.viewer.rating": 1,
          num_favs: {
            $size: {
              $setIntersection: [
                "$cast",
                favorites
              ]
            }
          }
        }
      },
    // { 
    //     $addFields: {
    //         num_favs: '42'
    //     }
    // },
    {
        $sort: {
            num_favs: -1,
            'tomatoes.viewer.rating': -1,
            title: -1 
        }
    },
    {
        $skip: 24
    },
    // TAKE 1 !!!
    {
      $limit: 1
    }
];

var pipeline = [
    {
      $sample: {
          size: 5
        }
    }
  ]

db.getSiblingDB("aggregations").movies.aggregate(pipeline, {
    allowDiskUse: true
}).toArray()