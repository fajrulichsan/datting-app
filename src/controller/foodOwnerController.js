const supabase = require("./supabase");

const getAllFoodOwners = async (req, res) => {
    try {
      // Fetch all food owners
      const { data, error } = await supabase
        .from('foodOwner')
        .select('userId', 'foodId'); // Adjust columns as per your schema
  
      if (error) {
        console.error('Error fetching all food owners:', error.message);
        res.status(500).send(error.message);
      } else {
        res.status(200).send(data);
      }
    } catch (error) {
      console.error('Error fetching all food owners:', error.message);
      res.status(500).send(error.message);
    }
  };

  

module.exports = {
    getAllFoodOwners
}