const { request } = require("express");
const RestaurantModel = require("../model/RestaurantModel");
const MenuItemModel = require("../model/MenuItemModel");

const RestaurantController = {
    getRestaurantListByLocation: async (request, response) => {
        let { loc_id } = request.params;
        let result = await RestaurantModel.find(
            { location_id: loc_id }, 
            {
             name: 1,
             locality: 1,
             image: 1,
             city: 1 
            });

        response.send({
            call: true,
            result,
        })
    },
    getSingleRestaurantDetails: async (request, response) => {
        let { rest_id } = request.params;
        let result = await RestaurantModel.findOne({ _id: rest_id });
        response.send({
            call: true,
            result,
        });
    },
    getMenuItems : async(request,response)=>{
        let {r_id} = request.params;
        let result = await MenuItemModel.find({ restaurantId: r_id});
        response.send({
            call: true,
            result,
                });
    },

    filter: async (request, response) => {
        let { meal_type, sort, location, cuisine,lcost,hcost,page,itemsPerPage} = request.body;
            
        sort = sort ? sort : 1;
        page = page ? page : 1;
        itemsPerPage = itemsPerPage ? itemsPerPage :2;

        let startingIndex = page * itemsPerPage - itemsPerPage;
        let lastIndex = page * itemsPerPage;
        
        let filterData = {};
    
        if (meal_type !== undefined) filterData["mealtype_id"] = meal_type;
        if (location !== undefined) filterData["location_id"] = location;
        if (cuisine.length !== 0) filterData["cuisine_id"] = { $in: cuisine };
       if(lcost && hcost) filterData["min_price"] = {$lte: hcost, $gte: lcost};
      
       try{

       

         let result = await RestaurantModel.find(filterData).sort({
      min_price: sort,
    });



//     response.send({
//       call: true,
//       result,
//     });
//   },
// };

const filterResult = result.slice(startingIndex, lastIndex);
response.status(200).send({
  status: true,
  result: filterResult,
  pageCount: Math.ceil(result.length / 2), //gives a round number
});
} catch (error) {
response.status(500).send({
  status: false,
  message: "server error",
  error,
});
}
},
};
    



    module.exports = RestaurantController;