const express = require("express");
const router = express.Router();

const { csvReq, pdfReq, billPdf } = require("../controllers/downloadCtrl");

router.get("/csv", csvReq);
router.get("/pdf", pdfReq);
router.get("/bill", billPdf);

module.exports = router;
