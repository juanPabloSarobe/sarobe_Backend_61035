import { Router } from "express";
const router = Router();

import { ChartsManager } from "../manager/charts.manager.js";

const chartManager = new ChartsManager("./src/data/charts.json");
router.get("/", async (req, res) => {
  try {
    const charts = await chartManager.getCharts();
    res.status(200).json(charts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const chart = await chartManager.getChartById(cid);
    res.status(200).json(chart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const chart = await chartManager.addChart(req.body);
    if (!chart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(chart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const chart = await chartManager.addProduct(cid, pid);
    if (!chart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(chart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default router;
