"use client"
import React, { useState, useCallback, useRef } from "react"
import { produce } from "immer"
import { Button } from "./ui/button"

const numRows = 50
const numCols = 50

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]

const generateEmptyGrid = () => {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }

  return rows
}

const generateGosperGliderGun = () => {
  const rows: number[][] = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }

  // Coordinates of the Gosper's Glider Gun
  //prettier-ignore
  const gunCoordinates = [
    [5, 1], [5, 2], [6, 1], [6, 2], [5, 11], [6, 11], [7, 11], [4, 12],
    [8, 12], [3, 13], [9, 13], [3, 14], [9, 14], [6, 15], [4, 16], [8, 16],
    [5, 17], [6, 17], [7, 17], [6, 18], [3, 21], [4, 21], [5, 21], [3, 22],
    [4, 22], [5, 22], [2, 23], [6, 23], [1, 25], [2, 25], [6, 25], [7, 25],
    [3, 35], [4, 35], [3, 36], [4, 36]
  ];

  // Set the cells for the glider gun
  gunCoordinates.forEach(([x, y]) => {
    if (x < numRows && y < numCols) {
      rows[x][y] = 1
    }
  })

  return rows
}

export const GameOfLife: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  })

  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0
            operations.forEach(([x, y]) => {
              const newI = i + x
              const newK = k + y
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK]
              }
            })

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1
            }
          }
        }
      })
    })

    setTimeout(runSimulation, 100)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2 font-sans">
        <Button
          variant="outline"
          onClick={() => {
            setRunning(!running)
            if (!running) {
              runningRef.current = true
              runSimulation()
            }
          }}
        >
          {running ? "stop" : "start"}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const rows = []
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              )
            }

            setGrid(rows)
          }}
        >
          random
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setGrid(generateGosperGliderGun())
          }}
        >
          glider gun
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setGrid(generateEmptyGrid())
          }}
        >
          clear
        </Button>
      </div>
      <div
        className="grid-cols-50 grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1
                })
                setGrid(newGrid)
              }}
              style={{
                backgroundColor: grid[i][k] ? "#fff" : undefined,
                border: "solid 1px #222",
              }}
              className="size-2 sm:size-3 md:size-4 "
            />
          ))
        )}
      </div>
    </div>
  )
}
