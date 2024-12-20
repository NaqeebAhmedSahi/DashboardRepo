const Course = require("../models/courseModel");
const Product = require('../models/product');
const User = require("../models/User");

const getCounter = async (req, res) => {
  try {
    // Fetch the count for each model
    const courseCount = await Course.countDocuments({});
    console.log(`Course count: ${courseCount}`);

    const productCount = await Product.countDocuments({});
    console.log(`Product count: ${productCount}`);

    const userCount = await User.countDocuments({});
    console.log(`User count: ${userCount}`);

    // Return the counts in the response
    res.status(200).json({
      success: true,
      data: {
        courses: courseCount,
        products: productCount,
        users: userCount
      }
    });
  } catch (error) {
    console.error('Error fetching counts:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error 1',
      error: error.message
    });
  }
};

module.exports = {
  getCounter,
};
