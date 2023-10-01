const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
} = require("../controllers/usersController");
const { protect } = require("../middleware/accessControl");

// Include farm router
const farmsRouter = require("./farms");

const router = express.Router({ mergeParams: true });

const cors = require("cors");
router.use(cors());

const advancedResults = require("../middleware/advancedResults");

// Re-route into farms routes
router.use("/:userId/farms", farmsRouter);

router
  .route("/")
  .get(advancedResults("Users"), getAllUsers)
  .post(protect, createUser);
router.route("/:id").get(getUser).delete(protect, deleteUser);

module.exports = router;
