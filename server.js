import express from "express";
import OpenGeocoder from "node-open-geocoder";
import cors from "cors";

const app = express();
const port = 3007;

app.use(cors());
app.use(express.json());

app.post("/geocode", (req, res) => {
  const address = req.body.address;
  OpenGeocoder()
    .geocode(address)
    .end((err, geoRes) => {
      if (err) {
        return res.status(500).json({ error: "Geocoding failed" });
      }
      res.json(geoRes);
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
