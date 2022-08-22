import { getAllCountries, getRegion, getCountry } from '../controllers/countryControllers.js'
import express from 'express'

export const router = express.Router()

// GET all countries  (EXTERNAL)
router.get("/all", getAllCountries)

// GET all countries within a region (EXTERNAL)
router.get("/region/:region", getRegion)

// GET specific country (EXTERNAL)
router.get("/country/:country", getCountry)
