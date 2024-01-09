const supabase = require("./supabase");

const getAllFurniture = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('furniture')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFurniture = async (req, res) => {
  try {
    const timestamp = new Date().getTime();
    const id = timestamp.toString();

    const currentTime = new Date();
    const options = { timeZone: 'Asia/Jakarta', hour12: false };

    const furnitureData = {
        id: id,
        userId: req.body.userId,
        name: req.body.name,
        level: req.body.level,
        room: req.body.room,
        create: currentTime.toLocaleString('en-ID', options),
        update: currentTime.toLocaleString('en-ID', options),
      };

    const { data, error } = await supabase
      .from('furniture')
      .insert([furnitureData]);
   
    if (error) {
        res.status(500).send(error);
    } else {
        res.status(201).send({ status: "Success", message: "Furniture created!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFurnitureById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, name, level, room } = req.body;
    const { data, error } = await supabase
      .from('furniture')
      .update({ userId, name, level, room })
      .eq('id', id);
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFurnitureByUserIdAndRoom = async (req, res) => {
    try {
      const { userId, room } = req.params;
      const { data, error } = await supabase
        .from('furniture')
        .select('id, userId, name, level') 
        .eq('userId', userId)
        .eq('room', room);  

      if (error) {
        res.status(500).send(error);
    } else {
        res.status(201).send({ status: "Success", userId: userId, room: room, data: data });
    }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const updateFurnitureByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, level, room } = req.body;
    const { data, error } = await supabase
      .from('furniture')
      .update({ name, level, room })
      .eq('userId', userId);
    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFurniture,
  createFurniture,
  updateFurnitureById,
  getFurnitureByUserIdAndRoom,
  updateFurnitureByUserId
};
