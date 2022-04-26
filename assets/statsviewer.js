import React from 'react'
import { loadVoc, loadTypeStats } from './statstore.js'

function StatsViewer () {
  const words = loadVoc()
  const typeStats = loadTypeStats()
  return <><p>Stats</p>
    {words.toString()}
    </>
}

export { StatsViewer }
